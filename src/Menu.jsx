import React from 'react';

import Constants from './Constants';
import {getTMPDOMRoot, extend} from './Utils';

let Menu = React.createClass({
    getInitialState() {
        return {
            show: false
        };
    },

    showAt(pos, config) {
        var left = pos.left,
            top = pos.top,
            docLeft = 0,
            docTop = 0;
        if (!config) {
            // relative position of the menu's parent menu item
            var rect = this.getDOMNode().parentNode.getBoundingClientRect();
            var {left: docLeft, top: docTop} = rect;
        }

        if (docLeft + left + Constants.config.menuItemWidth > document.documentElement.clientWidth) {
            // can't fit right, invert direction
            left -= Constants.config.menuItemWidth;
        } else {
            left += 2;
        }

        var options = config ? config.options : this.props.options,
            menuHeight = options.length * Constants.config.menuItemHeight;
        if (docTop + top + menuHeight > document.documentElement.clientHeight) {
            // can't fit bottom, invert direction
            top -= (options.length - 1) * Constants.config.menuItemHeight;
        }

        this.setState(extend({
            show: true,
            position: {
                top: top,
                left: left
            }
        }, config));
    },

    show() {
        this.setState({
            show: true
        });
    },

    hide(all) {
        this.setState({
            show: false
        });

        if (all) {
            var parent = this.props.parent;
            while (parent) {
                parent.hide(all);
                parent = parent.props.parent;
            }
        }
    },

    onClick(evt) {
        evt.stopPropagation();

        // iteratively get click path
        var idx = parseInt(evt.currentTarget.dataset['idx']),
            curr = this,
            parent = this.props.parent,
            path = [idx];
        while (parent) {
            path.push(curr.props.idx);
            curr = parent;
            parent = parent.props.parent;
        }
        path.reverse();

        // call callback
        // after iteration, curr is the root menu
        var cbk = curr.state.cbk;
        cbk(this.getItem(idx), path, curr.state.data);

        this.hide(true);
    },

    getItem(idx) {
        var options = this.state.options || this.props.options;
        return options[idx];
        // return typeof label == 'object'? label.title : label;
    },

    onMaskClick() {
        this.hide();
    },

    onHoverMenuItem(evt) {
        var idx = evt.currentTarget.dataset['idx'],
            com = this.refs[`child-${idx}`],
            $node = this.getDOMNode();

        if (com) com.showAt({
            left: $node.clientWidth - 4,
            top: 0
        });
    },

    onLeaveMenuItem(evt) {
        var idx = evt.currentTarget.dataset['idx'],
            com = this.refs[`child-${idx}`];
        if (com) com.hide();
    },

    renderMenuItem(option, idx) {
        var label = option,
            style,
            subMenu;

        if (label == '__seperator__') {
            return <li className="sep" />;
        }

        if (typeof option == 'object') {
            // generate children
            label = [option.title];
            if (Array.isArray(option.children)) {
                label.push(<i className="ico">&gt;</i>);
                subMenu = <Menu ref={`child-${idx}`} idx={idx} options={option.children} parent={this}/>;
            }
            style = option.style;
        }

        var item = <li
            key={idx}
            style={style}
            data-idx={idx}
            onMouseEnter={this.onHoverMenuItem}
            onMouseLeave={this.onLeaveMenuItem}
            onClick={this.onClick}>{label}{subMenu}</li>

        return item;
    },

    render() {
        var className = 'Menu ' + (this.state.show ? 'Show' : 'Hide'),
            options = this.state.options || this.props.options,
            position = this.state.position || this.props.position,
            contents;
        if (this.state.show) {
            var items = options.map(this.renderMenuItem);

            contents = (
                <div className="list">
                    <ul>{items}</ul>
                </div>
            );
        }
        return (
            <div className={className} style={position}>
                {contents}
            </div>
        );
    }
});


export default {
    init: function () {
        var $root = getTMPDOMRoot();
        var menu = <Menu />;
        this.menu = React.render(menu, $root);
        this.hide = this.hide.bind(this);
    },

    show: function (evt, config, cbk) {
        if (!this.menu) {
            // singleton, lazy initialization
            this.init();
        }

        var position;
        if (config.position) {
            position = config.position;
        } else {
            var x = evt.clientX,
                y = evt.clientY;

            position = {
                top: y,
                left: x
            };
        }

        this.menu.showAt(position, {
            options: config.options,
            data: config.data,
            cbk: (...args)=> {
                // this is triggered when menu item is clicked
                cbk.apply(null, args);
                document.removeEventListener('click', this.hide);
            }
        });
        document.addEventListener('click', this.hide);
    },

    hide() {
        if (!this.menu) return;
        this.menu.hide();

        var $root = this.menu.getDOMNode().parentNode;
        React.unmountComponentAtNode($root);
        $root.parentNode.removeChild($root);
        this.menu = null;
    }
};
