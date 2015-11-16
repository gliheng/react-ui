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
            curTab: this.props.defaultTab || 0
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

    setTab(idx, cbk) {
        this.setState({
            curTab: idx
        }, cbk);
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

        var items = [],
            children = [];
        React.Children.forEach(props.children, (c, i)=> {
            children.push(c);
            items[i] = {label: c.props.label, icon: c.props.icon};
        });

        // this remove invalid state before rendder
        // Is this good?
        var curTab = state.curTab;
        if (curTab >= children.length) {
            curTab = children.length - 1;
        }

        // cloneWithProps does not transfer key or ref to the cloned element.
        var barItems = this.renderTabbar(items),
            element = children[curTab],
            content = React.addons.cloneWithProps(element, {
                ref: 'activeContent',
                key: element.key || `child-${curTab}`
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