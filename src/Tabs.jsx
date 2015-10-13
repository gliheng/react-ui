import React from 'react';
import Gutter from './Gutter.jsx';
import Constants from './Constants';
import DimensionMixin from './mixins/Dimension';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutManagerMixinFactory} from './mixins/LayoutManager';

let Tabs = React.createClass({
    mixins: [PersistentStateMixin],

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
        this.setState({
            curTab: evt.currentTarget.dataset.idx
        });
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
            content = props.children[state.curTab];
        return (
            <div id={this.props.id} className={className}>
                <div className="Tabs-Bar">{barItems}</div>
                <div className="Tabs-Content">{content}</div>
            </div>
        );
    }
});

export default Tabs;
