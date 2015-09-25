import React from 'react';
import Gutter from './Gutter.jsx';
import Constants from './Constants';
import DimensionMixin from './mixins/Dimension';
import PersistentStateMixin from './mixins/PersistentState';
import {LayoutManagerMixinFactory} from './mixins/LayoutManager';

let Grid = React.createClass({
    mixins: [LayoutManagerMixinFactory(), DimensionMixin, PersistentStateMixin],

    getDefaultProps() {
        return {
            colGutterWidth: 5,
            rowGutterWidth: 5
        };
    },

    componentDidUpdate() {
    },

    renderGutters() {
        var gutters = [];
        // NOTE: somewhere has to calc col and row size
        var rows = parseInt(this.props.rows);
        var cols = parseInt(this.props.cols);
        var idx = 0;

        // vertical gutters
        var x = 0;
        for (var i = 0; i < this.colsize.length - 1; i++) {
            x += this.colsize[i];
            let style = {
                position: 'absolute',
                left: x,
                top: 0,
                width: this.props.colGutterWidth,
                height: '100%'
            };
            gutters.push(<Gutter key={'gutter-' + idx} style={style} className="we" getLayoutManager={this.getLayoutManager} idx={idx++}></Gutter>);
            x += this.props.colGutterWidth;
        }

        // horizontal gutters
        var y = 0;
        for (var i = 0; i < this.rowsize.length - 1; i++) {
            y += this.rowsize[i];
            let style = {
                position: 'absolute',
                left: 0,
                top: y,
                width: '100%',
                height: this.props.rowGutterWidth
            };
            gutters.push(<Gutter key={'gutter-' + idx} style={style} className="ns" getLayoutManager={this.getLayoutManager} idx={idx++}></Gutter>);
            y += this.props.colGutterWidth;
        }

        // corner gutters
        return gutters;
    },

    render() {
        this.colsize = [100, 300, 100];
        this.rowsize = [100, 100, 100];

        var d = 0;
        this.colpos = this.colsize.map((size, i)=> {
            var p = d;
            d = p + size + this.props.colGutterWidth;
            return p;
        });
        var d = 0;
        this.rowpos = this.rowsize.map((size, i)=> {
            var p = d;
            d = p + size + this.props.rowGutterWidth;
            return p;
        });

        var className = 'Grid',
            children = this.props.children,
            mutant = [];

        // create gutters
        if (this.props.resizable) {
            mutant = mutant.concat(this.renderGutters());
        }

        // create panels
        React.Children.forEach(children, (c, i)=> {
            var key = 'child-' + i,
                x = parseInt(c.props.col),
                y = parseInt(c.props.row);

            mutant.push(React.addons.cloneWithProps(c, {
                key: key,
                ref: key,
                parent: this,
                style: {
                    position: 'absolute',
                    left: this.colpos[x],
                    top: this.rowpos[y],
                    width: this.colsize[x],
                    height: this.rowsize[y]
                }
            }));
        });
        return (
            <div id={this.props.id} className={className}>{mutant}</div>
        );
    }
});

export default Grid;
