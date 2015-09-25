import {noop, clone, exclude} from '../Utils';

var reader = noop;
export function setReader(_reader) {
    reader = _reader;
}

var writer = noop;
export function setWriter(_writer) {
    writer = _writer;
}

export default {
    getState(full) {
        var s = clone(this.state),
            children = this.props.children;
        // console.log(this.getDOMNode());
        if (full && Array.isArray(children)) {
            s.children = children.map((c, i)=> {
                return this.refs['child-' + i].getState(full);
            });
        }
        return s;
    },

    putState(state) {
        var children = this.props.children,
            childrenState = state.children;
        if (childrenState && Array.isArray(children)) {
            children.forEach((c, i)=> {
                return this.refs['child-' + i].putState(childrenState[i]);
            });
        }
        // console.log(this.getDOMNode(), exclude(state, 'children'));
        this.setState(exclude(state, 'children'));
    },

    saveState() {
        var id = this.props.id;
        // only component with id attribute can save state
        if (!id) {
            throw new Error('Only component with id attribute can save state');
        }
        var s = this.getState(true);
        writer(id, s);
    },

    restoreState() {
        var id = this.props.id;
        if (!id) {
            throw new Error('Only component with id attribute can save state');
        }
        var state = reader(id);
        if (state) {
            this.putState(state);
        }
    }

};
