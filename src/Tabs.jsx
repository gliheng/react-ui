import React from 'react';
import Gutter from './Gutter.jsx';
import Constants from './Constants';
import DimensionMixin from './mixins/Dimension';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutManagerMixinFactory} from './mixins/LayoutManager';

let Tabs = React.createClass({
    mixins: [PersistentStateMixin, ResponsiveMixin],

    getInitialState: function () {
        return {
            curTab: 0
        }
    },

    renderTabbar: function (items) {
        return items.map((tab, i)=> {
            var isActive = i == this.state.curTab;
            var className = 'Tabs-Bar-Item';
            if (isActive) {
                className += ' active';
            }
            return <div className={className} data-idx={i} key={i} onClick={this.onTabClick}><span>{tab.label}</span></div>;
        });
    },

    onTabClick(evt) {
        var idx = parseInt(evt.currentTarget.dataset.idx);
        this.setState({
            curTab: idx
        }, ()=> {
            this.saveState();
            if (typeof this.props.indexChanged == 'function') {
                this.props.indexChanged(idx);
            }

            this.restoreContentState();
        });
    },

    restoreContentState() {
        // restore grid or group state
        var content = this.refs.activeContent;
        if (typeof content.restoreState == 'function') {
            content.restoreState(()=>{
                if (typeof content.resize == 'function') {
                    content.resize()
                }
            });
        }
    },

    // PersistentState mixin hook
    stateRestored() {
        this.restoreContentState();
    },

    componentDidMount() {
        this.restoreContentState();
    },

    render() {
        var className = 'Tabs',
            props = this.props,
            state = this.state;

        if (this.props.className) {
            className += ' ' + props.className;
        }

        var items = [];
        React.Children.forEach(props.children, (c, i)=> {
            items[i] = {label: c.props.label, icon: c.props.icon};
        });

        var barItems = this.renderTabbar(items),
            content = React.addons.cloneWithProps(props.children[state.curTab], {
                ref: 'activeContent'
            });
        return (
            <div id={this.props.id} className={className}>
                <div className="Tabs-Bar">{barItems}
                    <div className="Tabs-Bar-ToolBtns">{this.props.toolBtns}</div>
                </div>
                <div className="Tabs-Content">{content}</div>
            </div>
        );
    }
});

export default Tabs;
