import React from 'react';
import Constants from './Constants';
import Gutter from './Gutter';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutMaster} from './mixins/LayoutMaster';
import {extend} from './Utils';

let layoutFactory = function (type, elementName) {
    return React.createClass({
        displayName: elementName,

        mixins: [LayoutMaster, ResponsiveMixin, PersistentStateMixin],

        getDefaultProps() {
            return {
                type: type,
                resizable: true
            };
        },

        componentWillMount() {
            var size = [], precise = [];
            React.Children.forEach(this.props.children, (c, i)=> {
                if (type == Constants.Types.HGROUP && 'width' in c.props || type == Constants.Types.VGROUP && 'height' in c.props) {
                    size[i] = type == Constants.Types.HGROUP? c.props.width : c.props.height;
                    precise[i] = true;
                } else {
                    size[i] = c.props.flex || 1;
                    precise[i] = false;
                }
            });

            this.state.size = size;
            this.state.precise = precise;
        },

        render() {
            var className = elementName,
                props = this.props,
                state = this.state,
                width = props.width || state.width,
                height = props.height || state.height,
                children = [];

            if (props.className) {
                className += ' ' + props.className;
            }

            var dimension = this.getLayoutManager().layout(
                state.size,
                state.precise,
                type == Constants.Types.HGROUP? width : height);

            if (dimension) {
                var [size, pos] = dimension;

                // create gutters
                if (props.resizable) {
                    children = children.concat(this.renderGutters(type != Constants.Types.HGROUP, pos));
                }

                // create panels
                React.Children.forEach(props.children, (c, i)=> {
                    let key = `child-${i}`,
                        style;

                    if (type == Constants.Types.HGROUP) {
                        style = {
                            position: 'absolute',
                            left: pos[i],
                            top: 0,
                            width: size[i],
                            height: height
                        }
                    } else if (type == Constants.Types.VGROUP) {
                        style = {
                            position: 'absolute',
                            left: 0,
                            top: pos[i],
                            width: width,
                            height: size[i]
                        }
                    }

                    children.push(React.addons.cloneWithProps(c, extend({
                        key: c.key || key,
                        ref: key,
                        parent: this
                    }, style)));
                });

            }

            if ('width' in props && 'height' in props) {
                var style = {
                    position: 'absolute',
                    left: props.left,
                    top: props.top,
                    width: props.width,
                    height: props.height
                };
            }

            return (
                <div id={props.id}
                    className={className}
                    style={style}>{children}</div>
            );
        }
    });
};

export {layoutFactory};
