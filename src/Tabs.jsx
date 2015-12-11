import React from 'react';
import Gutter from './Gutter';
import Constants from './Constants';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';

let Tabs = React.createClass({
    mixins: [ResponsiveMixin, PersistentStateMixin],

    getInitialState: function () {
        return {
            curTab: this.props.curTab
        };
    },

    renderTabbar: function (items) {
        return items.map((tab, i)=> {
            var isActive = tab.id == this.state.curTab;
            var className = 'Tabs-Bar-Item';
            if (isActive) {
                className += ' active';
            }
            var id = this._items[i].id;
            if (id) {
                className += ` ${id}-Tab`;
            }

            var closeBtn;
            if (tab.closable) {
                closeBtn = (
                    <a className="Close"
                        href="javascript:;"
                        onClick={this.closeTab.bind(null, i, tab.id, this._items[i])}>&times;</a>
                );
            }
            return (
                <div className={className} data-id={tab.id} data-idx={i} key={i} onClick={this.onTabClick}>
                    <span>{tab.label}</span>{closeBtn}
                </div>
            );
        });
    },

	closeTab(idx, id, tab, evt) {
		evt && evt.stopPropagation();
        if (id == this.state.curTab) {
            // the current tab is closed
            var tabs = this._items;
            // jump to nearest tab
            var nextC = tabs[idx-1] || tabs[idx+1];
            if (nextC) {
                this.setState({
                    curTab: nextC.id
                });
            }
        }
		this.props.closeTab.apply(null, arguments);
	},

    componentWillReceiveProps(nextProps) {
        var curTab = nextProps.curTab;
        if (typeof curTab !== 'undefined') {
            // curTab changed from outside
            this.setState({
                curTab: curTab
            });
        }
    },

    onTabClick(evt) {
        var idx = parseInt(evt.currentTarget.dataset.idx),
            id = evt.currentTarget.dataset.id,
            {tabClicked} = this.props;
        if (typeof tabClicked == 'function') {
            id = tabClicked(id, this._items[idx]) || id;
        }
        if (typeof id == 'string') {
            this.setTab(id);
        }
    },

    setTab(id, cbk) {
        this.setState({
            curTab: id
        }, ()=> {
            if (typeof this.props.indexChanged == 'function') {
                this.props.indexChanged(id);
            }
            cbk && cbk();
            this.saveState();
        });
    },

    render() {
        var className = 'Tabs',
            {props, state} = this;

        if (props.className) {
            className += ' ' + props.className;
        }

        var items = [],
            curTab = state.curTab,
            element;
        React.Children.forEach(props.children, (c, i)=> {
            // key always exist, id my not
            let id = c.props.id || (''+i);
            if (id == curTab) {
                element = c;
            }
            items[i] = {
                id: id,
                label: c.props.label,
                icon: c.props.icon,
                closable: c.props.closable
            };
        });
        this._items = items;

        // If curTab is not set or the tab does not exist, default to the first tab
        if (!element && items.length > 0) {
            let id = items[0].id;
            this.state.curTab = curTab = id;
        }

        // cloneWithProps does not transfer key or ref to the cloned element.
        var barItems = this.renderTabbar(items),
            content;
        if (element) {
            content = React.addons.cloneWithProps(element, {
                ref: 'activeContent',
                key: curTab,
                parent: this
            });
        }

        var toolBtns = <div className="Tabs-Bar-ToolBtns">{this.props.toolBtns}</div>;
        return (
            <div id={this.props.id} className={className}>
                <div className="Tabs-Bar">
                    {barItems}
                    {toolBtns}
                </div>
                <div className="Tabs-Content">{content}</div>
            </div>
        );
    }
});

export default Tabs;
