import Constants from '../Constants';
import {getRootComponent} from '../Utils';


class GridLayoutManager {
    constructor(parent) {
        this.parent = parent;
    }

    layout(colsize, rowsize, colprecise, rowprecise, config, width, height) {
        if (!width || ! height) {
            return null;
        }

        this.config = config;

        var pxColsize = this.calcSize(width, config.gutterWidth, config.cols, colsize, colprecise);
        var pxRowsize = this.calcSize(height, config.gutterWidth, config.rows, rowsize, rowprecise);
        var [colpos, rowpos] = this.calcPos(pxColsize, pxRowsize);
        // these are col and row size in pixels
        this.pxColsize = pxColsize;
        this.pxRowsize = pxRowsize;

        return [pxColsize, pxRowsize, colpos, rowpos];
    }

    calcPos(colsize, rowsize) {
        var d;
        d = 0;
        var colpos = colsize.map((size, i)=> {
            var p = d;
            d = p + size + this.config.gutterWidth;
            return p;
        });

        d = 0;
        var rowpos = rowsize.map((size, i)=> {
            var p = d;
            d = p + size + this.config.gutterWidth;
            return p;
        });
        return [colpos, rowpos];
    }

    calcSize(total, gutter, n, size, precise) {
        var pxSize = [],
            remain = total,
            totalRatio = 0;

        for (var i = 0; i < size.length; i++) {
            var v = size[i];
            if (precise[i]) {
                remain -= v;
                pxSize[i] = v;
            } else {
                totalRatio += v;
            }
        }

        remain -= (n - 1) * gutter;

        for (var i = 0; i < size.length; i++) {
            if (pxSize[i] === undefined) {
                pxSize[i] = (size[i] / totalRatio) * remain;
            }
        }
        return pxSize;
    }

    startResize(idx) {
        this.moveIdx = idx; // am I resizing a vertical one or horizontal one?
        this.horizontalMove = true;
        if (idx > this.config.cols - 2) {
            // vertical move
            this.moveIdx -= this.config.cols - 1;
            this.horizontalMove = false;
        }

        this.colsizeSnapshot = this.parent.state.colsize.concat();
        this.rowsizeSnapshot = this.parent.state.rowsize.concat();
        this.pxColsizeSnapshot = this.pxColsize.concat();
        this.pxRowsizeSnapshot = this.pxRowsize.concat();
    }

    moveResize(x, y) {
        var key,
            size,
            firstPrecise,
            secondPrecise,
            pxSnapshot,
            v;
        if (this.horizontalMove) {
            key = 'colsize';
            size = this.colsizeSnapshot.concat();
            firstPrecise = this.parent.state.colprecise[this.moveIdx];
            secondPrecise = this.parent.state.colprecise[this.moveIdx+1];
            pxSnapshot = this.pxColsizeSnapshot;
            v = x;
        } else {
            key = 'rowsize';
            size = this.rowsizeSnapshot.concat();
            firstPrecise = this.parent.state.rowprecise[this.moveIdx];
            secondPrecise = this.parent.state.rowprecise[this.moveIdx+1];
            pxSnapshot = this.pxRowsizeSnapshot;
            v = y;
        }
        // move left and right
        // this.parent.colsize,
        if (firstPrecise || secondPrecise) {
            let idx = firstPrecise? this.moveIdx : this.moveIdx + 1;
            size[idx] = size[idx] + v;
        } else {
            var ratio = (pxSnapshot[this.moveIdx] + v)/(pxSnapshot[this.moveIdx+1] + pxSnapshot[this.moveIdx]);

            var a = (size[this.moveIdx] + size[this.moveIdx+1]) * ratio,
                b = (size[this.moveIdx] + size[this.moveIdx+1]) * (1 - ratio);
            size[this.moveIdx] = a;
            size[this.moveIdx + 1] = b;
        }
        this.parent.setState({
            [key]: size
        });
    }

    doneResize(idx) {
        delete this.colsizeSnapshot;
        delete this.rowsizeSnapshot;
        delete this.pxColsizeSnapshot;
        delete this.pxRowsizeSnapshot;

        // root component has an id
        var root = getRootComponent(this.parent);
        if (root) root.saveState();
    }
}

export default GridLayoutManager;
