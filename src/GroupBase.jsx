import React from 'react';
import Constants from './Constants';
import Gutter from './Gutter.jsx';
import DimensionMixin from './mixins/Dimension';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutManagerMixinFactory} from './mixins/LayoutManager';

let groupFactory = function (mode, elementName) {
    return React.createClass({
        mixins: [LayoutManagerMixinFactory(mode), DimensionMixin, PersistentStateMixin],

        render() {
            var className = elementName,
                children = this.props.children,
                mutant = [];

            if (this.props.className) {
                className += ' ' + this.props.className;
            }

            React.Children.forEach(children, (c, i)=> {
                var key = 'child-' + i;
                mutant.push(React.addons.cloneWithProps(c, {
                    key: key,
                    ref: key,
                    parent: this
                }));
                if (this.props.resizable) {
                    if (i != children.length - 1) {
                        var className;
                        if (mode == Constants.HORIZONTAL) {
                            className = 'we';
                        } else if (mode == Constants.VERTICAL) {
                            className = 'ns';
                        }
                        mutant.push(<Gutter className={className} key={'gutter-' + i} getLayoutManager={this.getLayoutManager} idx={i}></Gutter>);
                    }
                }
            });

            // undefined value is skipped by react
            // just set them all
            var style = {
                flexGrow: this.state.flex,
                width: this.state.width,
                height: this.state.height,
                minWidth: this.state.width,
                minHeight: this.state.height,
                maxWidth: this.state.width,
                maxHeight: this.state.height
            };

            return (
                <div id={this.props.id} className={className} style={style}>{mutant}</div>
            );
        }
    });

};

export {groupFactory};
