import React from 'react';
import jsScrollbar from '../lib/Scrollbar';

export default {
    componentDidMount() {
        var $root = this.getDOMNode();
		this.scrollbar = new jsScrollbar($root);
        this.resizeScrollbar();
    },

    resizeScrollbar() {
        var $root = this.getDOMNode();
		this.scrollbar.setDimension($root.clientHeight, $root.scrollHeight);
    },

    componentWillUnmount() {
        this.scrollbar.destroy();
    }
};
