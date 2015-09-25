import React from 'react';

let Gutter = React.createClass({
    onMouseDown(evt) {
        evt.preventDefault();

        this.startPos = {
            x: evt.clientX,
            y: evt.clientY
        };
        this.props.getLayoutManager().startResize(this.props.idx);

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    },

    onMouseMove(evt) {
        evt.preventDefault();

        this.props.getLayoutManager().moveResize(evt.clientX - this.startPos.x, evt.clientY - this.startPos.y);
    },

    onMouseUp() {
        this.props.getLayoutManager().doneResize(this.props.idx);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    },

    render() {
        var className = 'Gutter';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (
            <div className={className} style={this.props.style}
                onMouseDown={this.onMouseDown}></div>
        );
    }
});

export default Gutter;
