import Constants from '../Constants';
import {getRootComponent} from '../Utils';
import GroupLayoutManager from './GroupLayoutManager';


class GridLayoutManager extends GroupLayoutManager {

    layout(colsize, rowsize, colprecise, rowprecise, width, height) {
        if (!width || ! height) {
            return null;
        }

        var pxColsize = this.calcSize(width, colsize, colprecise);
        var pxRowsize = this.calcSize(height, rowsize, rowprecise);
        var colpos = this.calcPos(pxColsize);
        var rowpos = this.calcPos(pxRowsize);

        // these are col and row size in pixels
        this.pxColsize = pxColsize;
        this.pxRowsize = pxRowsize;

        return [pxColsize, pxRowsize, colpos, rowpos];
    }

    startResize(idx, h) {
        this.moveIdx = idx;
        this.horizontal = h;

        this.colsizeSnapshot = this.parent.state.colsize.concat();
        this.rowsizeSnapshot = this.parent.state.rowsize.concat();
        this.pxColsizeSnapshot = this.pxColsize.concat();
        this.pxRowsizeSnapshot = this.pxRowsize.concat();
    }

    moveResize(x, y) {
        var key,
            size,
            precise,
            pxSnapshot,
            delta;

        if (this.horizontal) {
            key = 'rowsize';
            size = this.rowsizeSnapshot.concat();
            precise = this.parent.state.rowprecise;
            pxSnapshot = this.pxRowsizeSnapshot;
            delta = y;
        } else {
            key = 'colsize';
            size = this.colsizeSnapshot.concat();
            precise = this.parent.state.colprecise;
            pxSnapshot = this.pxColsizeSnapshot;
            delta = x;
        }

        this.modifySize(size, precise, pxSnapshot, this.moveIdx, delta);

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
