import Constants from '../Constants';
import {getRootComponent} from '../Utils';


class GroupLayoutManager {
    constructor(parent, type) {
        this.parent = parent;
        this.type = type;
    }

    startResize(idx) {
        var first = this.parent.refs['child-' + idx],
            second = this.parent.refs['child-' + (idx+1)],
            $first = first.getDOMNode(),
            $second = second.getDOMNode();
        this.firstComp = first;
        this.secondComp = second;
        this.firstDimension = {width: $first.clientWidth, height: $first.clientHeight};
        this.secondDimension = {width: $second.clientWidth, height: $second.clientHeight};
    }

    moveResize(x, y) {
        if (this.type == Constants.HGROUP) {
            var p = 'width';
            var v = x;
        } else if (this.type == Constants.VGROUP) {
            var p = 'height';
            var v = y;
        } else {
            throw "Not implemented";
        }

        var firstPrecise = 'width' in this.firstComp.props || 'height' in this.firstComp.props,
            secondPrecise = 'width' in this.secondComp.props || 'height' in this.secondComp.props;
        if (firstPrecise && secondPrecise) {
            throw new Error('Both intermediate elements have dimensions set. Can\'t resize');
        } else if (firstPrecise || secondPrecise) {
            // one side have dimension set
            var preciseComp = firstPrecise? this.firstComp : this.secondComp,
                dimension = firstPrecise? this.firstDimension : this.secondDimension;
            preciseComp.setState({
                [p]: dimension[p] + (firstPrecise ? v : -v)
            });
        } else {
            // both use flex
            var flexTotal = this.firstComp.state.flex + this.secondComp.state.flex,
                ratio = (this.firstDimension[p] + v) / (this.firstDimension[p] + this.secondDimension[p]);
            ratio = Math.max(ratio, 0);
            ratio = Math.min(ratio, 1);
            this.firstComp.setState({
                flex: flexTotal * ratio
            });
            this.secondComp.setState({
                flex: flexTotal * (1-ratio)
            });
        }
    }

    doneResize(idx) {
        delete this.firstComp;
        delete this.secondComp;
        delete this.firstDimension;
        delete this.secondDimension;

        // root component has an id
        var root = getRootComponent(this.parent);
        if (root) root.saveState();
    }
}

export default GroupLayoutManager;
