import React from 'react';
import Constants from './Constants';
import Gutter from './Gutter';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutMaster} from './mixins/LayoutMaster';

let Grid = React.createClass({

    mixins: [LayoutMaster, ResponsiveMixin, PersistentStateMixin],

    getDefaultProps() {
        return {
            type: Constants.Types.GRID,
            resizable: true
        };
    },

    componentWillMount() {
        // parse colsize property
        this.props.colsize
        var [colsize, colprecise] = this.parseSizeSpec(this.props.colsize || this.getDefaultSpec(this.props.cols));
        var [rowsize, rowprecise] = this.parseSizeSpec(this.props.rowsize || this.getDefaultSpec(this.props.rows));

        this.state.colsize = colsize;
        this.state.colprecise = colprecise;
        this.state.rowsize = rowsize;
        this.state.rowprecise = rowprecise;
    },

    render() {
        var className = 'Grid',
            props = this.props,
            state = this.state,
            width = props.width || state.width,
            height = props.height || state.height,
            children = [];

        if (props.className) {
            className += ' ' + props.className;
        }

        var dimension = this.getLayoutManager().layout(
            state.colsize,
            state.rowsize,
            state.colprecise,
            state.rowprecise,
            width,
            height);

        if (dimension) {
            var [colsize, rowsize, colpos, rowpos] = dimension;

            // create gutters
            if (props.resizable) {
                children = children.concat(this.renderGutters(false, colpos));
                children = children.concat(this.renderGutters(true, rowpos));
            }

            // create panels
            React.Children.forEach(props.children, (c, i)=> {
                var x = parseInt(c.props.col),
                    y = parseInt(c.props.row),
                    key = `child-${i}`;

                var g = {
                    key: c.key || key,
                    ref: key,
                    parent: this,
                    position: 'absolute',
                    left: colpos[x],
                    top: rowpos[y],
                    width: colsize[x],
                    height: rowsize[y]
                };
                children.push(React.addons.cloneWithProps(c, g));
            });
        }

        if ('width' in props && 'height' in props) {
            var style = {
                position: 'absolute',
                left: props.left,
                top: props.top,
                width: props.width,
                height: props.height
            };
        }

        return (
            <div id={props.id}
                className={className}
                style={style}>{children}</div>
        );
    }
});

export default Grid;
