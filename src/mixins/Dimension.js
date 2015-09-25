export default {
    getDefaultProps() {
        return {
            flex: 1
        }
    },

    getInitialState() {
        // convert type in case value is taken from jsx declaratioin
        var state = {};
        if ('position' in this.props) {

        } else {
            if ('width' in this.props) state.width = this.props.width;
            if ('height' in this.props) state.height = this.props.height;
            if ('flex' in this.props) state.flex = this.props.flex;
        }
        return state;
    }
}
