import React from 'react';
import DimensionMixin from './mixins/Dimension';
import PersistentStateMixin from './mixins/PersistentState';
import ResponsiveMixin from './mixins/Responsive';

let View = React.createClass({
    mixins: [DimensionMixin, PersistentStateMixin, ResponsiveMixin],

    render() {
        var className = "View";
        if (this.props.className) className += ' ' + this.props.className;

        var style = this.props.style;
        if (!style) {
            style = {
                flexGrow: this.state.flex,
                minWidth: this.state.width,
                minHeight: this.state.height,
                maxWidth: this.state.width,
                maxHeight: this.state.height
            };
        }

        var children = [];
        React.Children.forEach(this.props.children, (c, i)=> {
            if (typeof c == 'object') {
                var key = 'child-' + i;
                c = React.addons.cloneWithProps(c, {
                    key: key,
                    ref: key,
                    parent: this
                });
            }
            children.push(c);
        });
        return (
            <div id={this.props.id} className={className} style={style}>{children}</div>
        );
    }
});

export default View;
