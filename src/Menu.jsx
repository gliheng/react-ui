import $ from 'jquery';
import _ from 'underscore';
import React from 'react';

import {getIcon} from '../utils/';
import Mask from './Mask';

const MENU_ITEM_WIDTH = 87,
    MENU_ITEM_HEIGHT = 28;
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
            var {left: docLeft, top: docTop} = $(this.getDOMNode().parentNode).offset();
        }

        if (docLeft + left + MENU_ITEM_WIDTH > document.documentElement.clientWidth) {
            left -= MENU_ITEM_WIDTH;
        } else {
            left += 2;
        }

        var options = config ? config.options : this.props.options,
            menuHeight = options.length * MENU_ITEM_HEIGHT
        if (docTop + top + menuHeight > document.documentElement.clientHeight) {
            top -= (options.length - 1) * MENU_ITEM_HEIGHT;
        }

        this.setState(_.extend({
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
                parent.hide();
                parent = parent.props.parent;
            }
        }
    },

    onClick(evt) {
        evt.stopPropagation();

        // iteratively get click path
        var idx = parseInt($(evt.currentTarget).data('idx')),
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
        cbk(this.getLabel(idx), path, curr.state.data);

        this.hide(true);
    },

    getLabel(idx) {
        var options = this.state.options || this.props.options,
            label = options[idx];
        return typeof label == 'object'? label.title : label;
    },

    onMaskClick() {
        this.hide();
    },

    onHoverMenuItem(evt) {
        var idx = $(evt.currentTarget).data('idx'),
            com = this.refs[`child-${idx}`],
            $node = this.getDOMNode();

        if (com) com.showAt({
            left: $node.clientWidth - 4,
            top: 0
        });
    },

    onLeaveMenuItem(evt) {
        var idx = $(evt.currentTarget).data('idx');
            com = this.refs[`child-${idx}`];
        if (com) com.hide();
    },

    render() {
        var className = 'Menu ' + (this.state.show ? 'Show' : 'Hide'),
            options = this.state.options || this.props.options,
            position = this.state.position || this.props.position,
            contents;
        if (this.state.show) {
            var idx = 0;
            var items = options.map((option)=> {
                var label = option,
                    className = idx == this.state.current? 'on' : '',
                    style,
                    subMenu;

                if (label == '__seperator__') {
                    return <li className="sep" />;
                }

                if (typeof option == 'object') {
                    // generate children
                    label = [option.title];
                    if (_.isArray(option.children)) {
                        label.push(<i className="ico">{getIcon('svg:./images/svg/sprite.symbol.svg#arrow_r')}</i>);
                        subMenu = <Menu ref={`child-${idx}`} idx={idx} options={option.children} parent={this}/>;
                    }
                    style = option.style;
                }

                var item = <li
                    key={idx}
                    style={style}
                    className={className}
                    data-idx={idx}
                    onMouseEnter={this.onHoverMenuItem}
                    onMouseLeave={this.onLeaveMenuItem}
                    onClick={this.onClick}>{label}{subMenu}</li>

                idx += 1;
                return item;
            });

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
        var menu = <Menu />;
        var $root = document.createElement('div');
        document.body.appendChild($root);

        this.menu = React.render(menu, $root);
        this.mask = new Mask({
            backgroundColor: 'rgba(0,0,0,0)'
        });
    },

    show: function (evt, config, cbk) {
        if (!this.menu) {
            this.init();
        }

        var $tar = $(evt.target),
            position;

        if (config.position) {
            position = config.position;
        } else {
            var x = evt.clientX,
                y = evt.clientY;
            // var height = $tar.height(),
            //     pos = $tar.position(),
            //     x = pos.top + height,
            //     y = pos.left;

            position = {
                top: y,
                left: x
            };
        }

        this.menu.showAt(position, {
            current: config.current,
            options: config.options,
            data: config.data,
            cbk: (...args)=> {
                // this is triggered when menu item is clicked
                cbk.apply(null, args);
                this.mask.hide();
            }
        });

        this.mask.show(()=> {
            this.menu.hide();
        });
    }
};
