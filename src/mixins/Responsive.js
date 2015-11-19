export default {
    resize(width, height) {
        var {width: _width, height: _height} = 'width' in this.state ? this.state : this.props.style;
        if (typeof this.onResized == 'function') {
            this.onResized(_width, _height);
        }
        // cascade resize call down the chain
        for (var key in this.refs) {
            var c = this.refs[key];
            if (typeof c.resize == 'function') {
                c.resize(_width, _height);
            }
        }
    }
};
