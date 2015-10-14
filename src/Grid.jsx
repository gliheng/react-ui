import React from 'react';
import Gutter from './Gutter.jsx';
import Constants from './Constants';
import DimensionMixin from './mixins/Dimension';
import ResponsiveMixin from './mixins/Responsive';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutManagerMixinFactory} from './mixins/LayoutManager';

let Grid = React.createClass({
    mixins: [LayoutManagerMixinFactory(Constants.Types.GRID), ResponsiveMixin, DimensionMixin, PersistentStateMixin],

    getDefaultProps() {
        return {
            gutterWidth: Constants.config.gutterWidth,
        };
    },

    renderGutters(colpos, rowpos) {
        var gutters = [];
        // NOTE: somewhere has to calc col and row size
        var rows = parseInt(this.props.rows),
            cols = parseInt(this.props.cols),
            idx = 0;

        // vertical gutters
        for (var i = 0; i < cols - 1; i++) {
            let key = 'gutter-' + idx;
            let style = {
                position: 'absolute',
                left: colpos[i+1] - this.props.gutterWidth,
                top: 0,
                width: this.props.gutterWidth,
                height: '100%'
            };
            gutters.push(<Gutter className="we" key={key} ref={key} style={style} getLayoutManager={this.getLayoutManager} idx={idx++}></Gutter>);
        }

        // horizontal gutters
        for (var i = 0; i < rows - 1; i++) {
            let key = 'gutter-' + idx;
            let style = {
                position: 'absolute',
                left: 0,
                top: rowpos[i+1] - this.props.gutterWidth,
                width: '100%',
                height: this.props.gutterWidth
            };
            gutters.push(<Gutter className="ns" key={key} ref={key} style={style} getLayoutManager={this.getLayoutManager} idx={idx++}></Gutter>);
        }

        // corner gutters?
        return gutters;
    },

    componentWillMount() {
        // parse colsize property
        var [colsize, colprecise] = this.parseSizeSpec(this.props.colsize);
        var [rowsize, rowprecise] = this.parseSizeSpec(this.props.rowsize);

        this.state.colsize = colsize;
        this.state.colprecise = colprecise;
        this.state.rowsize = rowsize;
        this.state.rowprecise = rowprecise;
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
    },

    render() {
        var className = 'Grid',
            mutant = [],
            props = this.props,
            state = this.state;

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        var size = this.getLayoutManager().layout(
            this.state.colsize,
            this.state.rowsize,
            this.state.colprecise,
            this.state.rowprecise, {
                gutterWidth: props.gutterWidth,
                gutterWidth: props.gutterWidth,
                cols: parseInt(props.cols),
                rows: parseInt(props.rows)
            },
            state.width,
            state.height);

        if (size) {
            var [colsize, rowsize, colpos, rowpos] = size;

            // create gutters
            if (props.resizable) {
                mutant = mutant.concat(this.renderGutters(colpos, rowpos));
            }

            // create panels
            React.Children.forEach(props.children, (c, i)=> {
                var x = parseInt(c.props.col),
                    y = parseInt(c.props.row),
                    key = `child-${i}`;
                    // key = `child-${x}-${y}`;

                mutant.push(React.addons.cloneWithProps(c, {
                    key: key,
                    ref: key,
                    parent: this,
                    style: {
                        position: 'absolute',
                        left: colpos[x],
                        top: rowpos[y],
                        width: colsize[x],
                        height: rowsize[y]
                    }
                }));
            });
        }

        // var style = {
        //     width: state.width,
        //     height: state.height
        // };
        return (
            <div id={props.id} className={className}>{mutant}</div>
        );
    }
});

export default Grid;
