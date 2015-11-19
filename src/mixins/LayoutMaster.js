import React from 'react';
import Constants from '../Constants';
import GroupLayoutManager from './GroupLayoutManager';
import GridLayoutManager from './GridLayoutManager';
import Gutter from '../Gutter';

export var LayoutMaster = {
    getInitialState() {
        return {};
    },

    getLayoutManager() {
        if (!this.layoutManager) {
            var type = this.props.type,
                gutter = this.getGutter();
            if (type === Constants.Types.GRID) {
                this.layoutManager = new GridLayoutManager(this, type, gutter);
            } else if (type === Constants.Types.VGROUP || type === Constants.Types.HGROUP) {
                this.layoutManager = new GroupLayoutManager(this, type, gutter);
            }
        }
        return this.layoutManager;
    },

    getGutter() {
        return this.props.resizable ? this.props.gutter || Constants.config.gutterWidth : 0;
    },

    renderGutters(h, pos) {
        var gutters = [],
            gutter = this.getGutter();
        var idx = 0;
        for (var i = 0; i < pos.length - 1; i++) {
            let key, style;
            if (h) {
                key = 'gutter-h-' + i;
                style = {
                    position: 'absolute',
                    left: 0,
                    top: pos[i+1] - gutter,
                    width: '100%',
                    height: gutter};
            } else {
                key = 'gutter-v-' + i;
                style = {
                    position: 'absolute',
                    left: pos[i+1] - gutter,
                    top: 0,
                    width: gutter,
                    height: '100%'
                };
            }
            gutters.push(<Gutter
                className={h?"ns":"we"}
                key={key}
                ref={key}
                style={style}
                getLayoutManager={this.getLayoutManager}
                h={h}
                idx={i} />);
        }

        return gutters;
    },

    getDefaultSpec(count) {
        var spec = [];
        for (var i = 0; i < parseInt(count); i++) {
            spec.push('1');
        }
        return spec.join(',');
    },

    componentDidMount() {
        // To render child components, this one needs to know DOM size
        var $node = this.getDOMNode();
        if (!('width' in this.state || 'height' in this.state)) {
            this.setState({
                width: $node.clientWidth,
                height: $node.clientHeight
            });
        }
    },

    onResized() {
        var $node = this.getDOMNode();
        this.setState({
            width: $node.clientWidth,
            height: $node.clientHeight
        });
    },

    stateRestored() {
        this.resize();
    },

    /** return size configuration array on an element
     *  size is the number corresponding to that row or col
     *  precise is whether it's absolute px value, otherwise it's a scale
     */
    parseSizeSpec(spec) {
        var size = [],
            precise = [];
        spec.split(',').forEach(function (v, i) {
            if (v.endsWith('px')) {
                size[i] = parseInt(v.substr(0, v.length - 2));
                precise[i] = true;
            } else {
                size[i] = parseInt(v);
                precise[i] = false;
            }
        });
        return [size, precise];
    }
};
