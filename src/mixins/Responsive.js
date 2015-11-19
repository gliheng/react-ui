export default {
    /** notify children when resized */
    resize() {
        if (this.state && 'width' in this.state && 'height' in this.state) {
            var {width, height} = this.state;
        } else {
            var {width, height} = this.props;
        }
        if (typeof this.onResized == 'function') {
            this.onResized(width, height);
        }
        // cascade resize call down the chain
        for (var key in this.refs) {
            var c = this.refs[key];
            if (typeof c.resize == 'function') {
                c.resize();
            }
        }
    }
};
