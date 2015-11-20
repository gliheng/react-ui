export default {
    getInitialState() {
        return {};
    },

    /** notify children when resized */
    resize(width, height) {
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
                c.resize();
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
