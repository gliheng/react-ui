import React from 'react';
import DimensionMixin from './mixins/Dimension';
import PersistentStateMixin from './mixins/PersistentState';

let View = React.createClass({
    mixins: [DimensionMixin, PersistentStateMixin],

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
        return (
            <div id={this.props.id} className={className} style={style}>{this.props.children}</div>
        );
    }
});

export default View;
