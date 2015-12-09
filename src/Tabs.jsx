import React from 'react';
import Gutter from './Gutter';
import Constants from './Constants';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';

let Tabs = React.createClass({
    mixins: [ResponsiveMixin, PersistentStateMixin],

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
            return (
                <div className={className} data-idx={i} key={i} onClick={this.onTabClick}>
                    <span>{tab.label}</span>
                </div>
            );
        });
    },

    componentWillReceiveProps(nextProps) {
        var curTab = nextProps.curTab;
        if (typeof curTab == 'number') {
            // curTab changed from outside
            this.setState({
                curTab: curTab
            });
        }
    },

    onTabClick(evt) {
        var idx = parseInt(evt.currentTarget.dataset.idx),
            {tabClicked} = this.props,
            preventJump = false;
        if (typeof tabClicked == 'function') {
            preventJump = tabClicked(idx, this.props.children[idx].props);
        }

        if (preventJump) return;

        this.setState({
            curTab: idx
        }, ()=> {
            this.saveState();
            if (typeof this.props.indexChanged == 'function') {
                this.props.indexChanged(idx);
            }
        });
    },

    setTab(idx, cbk) {
        this.setState({
            curTab: idx
        }, cbk);
    },

    prevTab(cbk) {
        this.setState({
            curTab: Math.max(this.state.curTab-1, 0)
        }, cbk);
    },

    nextTab(cbk) {
        this.setState({
            curTab: Math.min(this.state.curTab+1, )
        }, cbk);
    },

    render() {
        var className = 'Tabs',
            {props, state} = this;

        if (props.className) {
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
                key: element.key || `child-${curTab}`,
                parent: this
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
