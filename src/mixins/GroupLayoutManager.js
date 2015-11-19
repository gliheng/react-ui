import Constants from '../Constants';
import {getRootComponent} from '../Utils';


class GroupLayoutManager {

    constructor(parent, type, gutter) {
        this.type = type;
        this.gutter = gutter;
        this.parent = parent;
    }

    /** Calc position of gutters */
    calcPos(size) {
        var d = 0;
        var pos = size.map((size, i)=> {
            var p = d;
            d = p + size + this.gutter;
            return p;
        });

        return pos;
    }

    /** Convert all scale to absolute px unit */
    calcSize(total, size, precise) {
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

        remain -= (size.length - 1) * this.gutter;

        for (var i = 0; i < size.length; i++) {
            if (pxSize[i] === undefined) {
                pxSize[i] = (size[i] / totalRatio) * remain;
            }
        }
        return pxSize;
    }

    layout(size, precise, length) {
        if (!length) return null;

        var pxSize = this.calcSize(length, size, precise);
        var pos = this.calcPos(pxSize);

        // these are size in pixels
        this.pxSize = pxSize;

        return [pxSize, pos];
    }

    startResize(idx) {
        this.moveIdx = idx;
        this.sizeSnapshot = this.parent.state.size.concat();
        this.pxSnapshot = this.pxSize.concat();
    }

    moveResize(x, y) {
        var size = this.sizeSnapshot.concat(),
            precise = this.parent.state.precise,
            pxSnapshot = this.pxSnapshot,
            delta = this.type == Constants.Types.HGROUP ? x : y;

        this.modifySize(size, precise, pxSnapshot, this.moveIdx, delta);
        this.parent.setState({
            'size': size
        });
    }

    doneResize(idx) {
        delete this.sizeSnapshot;
        delete this.pxSnapshot;

        // root component has an id
        var root = getRootComponent(this.parent);
        if (root) root.saveState();
    }

    modifySize(size, precise, pxSnapshot, idx, delta) {
        var firstPrecise = precise[idx],
            secondPrecise = precise[idx+1];

        if (firstPrecise || secondPrecise) {
            // if either side is px unit, change only that value
            idx = firstPrecise? idx : idx + 1;
            delta = firstPrecise? delta : -delta;
            size[idx] = size[idx] + delta;
        } else {
            let ratio = (pxSnapshot[idx] + delta)/(pxSnapshot[idx+1] + pxSnapshot[idx]);
            let a = (size[idx] + size[idx+1]) * ratio,
                b = (size[idx] + size[idx+1]) * (1 - ratio);
            size[idx] = a;
            size[idx+1] = b;
        }
    }
}

export default GroupLayoutManager;
