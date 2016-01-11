import React from 'react';
import Gutter from './Gutter';
import Constants from './Constants';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';
import Menu from './Menu';

let Tabs = React.createClass({
    mixins: [ResponsiveMixin, PersistentStateMixin],

    getInitialState: function () {
        return {
            curTab: this.props.curTab,
            showMore: false
        };
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

    // when tab is resized check if tabs can fix into screen
    // otherwise show more button
    onResized() {
        this.checkShowMore();
    },

    checkShowMore() {
        var $tabContainer = this.refs.tabContainer.getDOMNode(),
            // showMore = $tabContainer.clientWidth < $tabContainer.scrollWidth;
            showMore = this.outofViewTabs().length > 0;
        if (showMore != this.state.showMore) {
            this.setState({
                showMore: showMore
            }, ()=> {
                this.fitTabBarScroll(this.state.curTab);
            });
        } else {
            this.fitTabBarScroll(this.state.curTab);
        }
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
            {createTab, tabClicked} = this.props;
        if (id == '__add__') {
            createTab();
        } else if (id == '__more__') {
            this.showMoreMenu(evt);
        } else {
            if (typeof tabClicked == 'function') {
                id = tabClicked(id, this._items[idx]) || id;
            }
            if (typeof id == 'string') {
                this.setTab(id);
            }
        }
    },

    showMoreMenu(evt) {
        evt.nativeEvent.stopImmediatePropagation();

        var options = this.outofViewTabs();
        Menu.show(evt.nativeEvent, {
            options: options
        }, (item, path, data)=> {
            this.setTab(item.id);
        });
    },

    getTabContainerRange() {
        var rect = this.refs.tabContainer.getDOMNode().getBoundingClientRect(),
           left = rect.left,
           right = left + rect.width;
          return [left, right];
    },

    getTabItemNode(id) {
        var ref = this.refs['tabItem-' + id];
        if (!ref) return null;
        return ref.getDOMNode();
    },

    outofViewTabs() {
        // tabItems's parent node's rect
        var [left, right] = this.getTabContainerRange();
        return this._items.map(function (item) {
            return {
                id: item.id,
                title: item.label
            };
        }).filter((item, i)=> {
            return this.tabOutofView(item.id, left, right);
        });
    },

    tabOutofView(id, left, right) {
        if (left === undefined || right === undefined) {
            [left, right] = this.getTabContainerRange();
        }

        var $node = this.getTabItemNode(id),
            rect = $node.getBoundingClientRect(),
            l = rect.left,
            r = l + rect.width;
        return r <= left || l > right;
    },

    componentDidUpdate() {
        this.checkShowMore();
    },

    /* move scrollleft of tabs parent, so that items are visible */
    fitTabBarScroll(id) {
        if (!this.getTabItemNode(id) || !this.tabOutofView(id)) {
            return;
        }

        var $tabContainer = this.refs.tabContainer.getDOMNode(),
            rect = $tabContainer.getBoundingClientRect(),
            left = rect.left;

        var $node = this.getTabItemNode(id);
        if (!$node) return;
        var rect = $node.getBoundingClientRect(),
            l = rect.left - parseInt(window.getComputedStyle($node).getPropertyValue('margin-left'));

        $tabContainer.scrollLeft += l - left;
    },

    /* set current active tab */
    setTab(id, cbk) {
        this.fitTabBarScroll(id);

        this.setState({
            curTab: id
        }, ()=> {
            if (typeof this.props.tabChanged == 'function') {
                this.props.tabChanged(id);
            }
            cbk && cbk();
            this.saveState();
        });
    },

    /* get current tab */
    getTab() {
        return this.state.curTab;
    },

    extractChildren(curTab) {
        var element, firstElement, items = [];
        React.Children.forEach(this.props.children, (c, i)=> {
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
            if (i == 0) {
                firstElement = c;
            }
        });
        this._items = items;

        // If curTab is not set or the tab does not exist, default to the first tab
        if (!element && items.length > 0) {
            let id = items[0].id;
            this.state.curTab = curTab = id;
            element = firstElement;
        }

        return [element, items];
    },

    renderTabbar: function () {
        // if too many tabs are shown, this group them into menu
        var moreTab;
        if (this.state.showMore) {
            moreTab = this.renderTabbarItem({label: '⋮', id: '__more__'});
        }

        // optional add button to create more tabs
        var addTab;
        if (this.props.createTab) {
            addTab = this.renderTabbarItem({label: '╋', id: '__add__'});
        }

        var barItems = (
            <div ref="tabContainer" className="Tabs-Bar-Item-Container">
                {this._items.map((tab, i)=> {
                    return this.renderTabbarItem(tab, i);
                })}
            </div>
        );
        var toolBtns = <div className="Tabs-Bar-ToolBtns">{this.props.toolBtns}</div>;

        return (
            <div ref="tabBar" className="Tabs-Bar">
                <div className={'Tabs-Bar-Outer' + (this.state.showMore? ' showMore' : '')}>
                    {barItems}
                    {addTab}
                    {moreTab}
                </div>
                {toolBtns}
            </div>
        );
    },

    renderTabbarItem(tab, i) {
        var isActive = tab.id == this.state.curTab;
        var className = 'Tabs-Bar-Item';
        if (isActive) {
            className += ' active';
        }

        var itemConfig = this._items[i];
        if (itemConfig) {
            var {id} = itemConfig;
            if (id) {
                className += ` Tab-${id}`;
            }

            var closeBtn;
            if (tab.closable) {
                closeBtn = (
                    <a className="Close"
                        href="javascript:;"
                        onClick={this.closeTab.bind(null, i, tab.id, this._items[i])}>&times;</a>
                );
            }
        }

        return (
            <div className={className} ref={'tabItem-' + tab.id} data-id={tab.id} data-idx={i} key={i} onClick={this.onTabClick}>
                <span>{tab.label}</span>{closeBtn}
            </div>
        );
    },

    render() {
        var className = 'Tabs',
            {props, state} = this;

        if (props.className) {
            className += ' ' + props.className;
        }

        // extract item from tabs
        var curTab = state.curTab;
        var [contentElement, items] = this.extractChildren(curTab);

        var tabbar = this.renderTabbar();
        // cloneWithProps does not transfer key or ref to the cloned element.
        var content;
        if (contentElement) {
            content = React.addons.cloneWithProps(contentElement, {
                ref: 'activeContent',
                key: curTab,
                parent: this
            });
        }

        return (
            <div id={this.props.id} className={className}>
                {tabbar}
                <div ref="tabContent" className="Tabs-Content">{content}</div>
            </div>
        );
    }
});

export default Tabs;
