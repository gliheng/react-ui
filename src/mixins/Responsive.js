export default {
    resize(width, height) {
        if (typeof this.onResized == 'function') {
            this.onResized();
        }
        for (var key in this.refs) {
            var c = this.refs[key];
            if (typeof c.resize == 'function')
            c.resize(width, height);
        }
    }
};
