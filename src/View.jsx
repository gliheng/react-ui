import React from 'react';
import PersistentStateMixin from './mixins/PersistentState';
import ResponsiveMixin from './mixins/Responsive';

let View = React.createClass({
    mixins: [PersistentStateMixin, ResponsiveMixin],

    componentDidUpdate() {
        this.resize();
    },

    render() {
        var className = "View";
        if (this.props.className) className += ' ' + this.props.className;

        var {position, left, top, width, height} = this.props;
        var style = {position, left, top, width, height};

        var children = [];
        React.Children.forEach(this.props.children, (c, i)=> {
            if (c && typeof c == 'object') {
                var key = `child-${i}`;
                c = React.addons.cloneWithProps(c, {
                    key: c.key || key,
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
