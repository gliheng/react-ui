export default {
    getInitialState() {
        // this is here to ensure state is not null
        return {};
    },

    /** notify children when resized */
    resize(width, height) {
        // if the caller specify width and height, we just apply that size
        // otherwise we take the size from cache(state or props) and propagate the event down
        if (width === undefined && height === undefined) {
            if (this.state && 'width' in this.state && 'height' in this.state) {
                ({width, height} = this.state);
            } else {
                ({width, height} = this.props);
            }
        } else {
            this.setState({
                width: width,
                height: height
            });
        }
        if (typeof this.onResized == 'function') {
            this.onResized(width, height);
        }
        // cascade resize call down the chain
        for (var key in this.refs) {
            var c = this.refs[key];
            if (typeof c.resize == 'function') {
                var $node = c.getDOMNode();
                var w = $node.clientWidth,
                    h = $node.clientHeight;
                if (w != 0 && h != 0) {
                    // use DOM size if we can get it
                    c.resize(w, h);
                } else {
                    c.resize();
                }
            }
        }
    },

    componentDidMount() {
        // To render child components, this one needs to know DOM size
        var $node = this.getDOMNode();
        if (!('width' in this.props || 'height' in this.props) && !('width' in this.state || 'height' in this.state)) {
            this.setState({
                width: $node.clientWidth,
                height: $node.clientHeight
            }, ()=> {
                this.restoreState();
            });
        }
    }
};
