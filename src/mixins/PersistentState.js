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
    /* get the state dict recursively from the component
     **/
    getState(full) {
        var s = clone(this.state),
            children = this.props.children;
        // console.log(this.getDOMNode());
        if (full && Array.isArray(children)) {
            s.children = children.map((c, i)=> {
                var child = this.refs['child-' + i];
                if (child === undefined) return null;
                return child.getState(full);
            });
        }
        return s;
    },

    /* apply state to the component
     **/
    putState(state) {
        var children = this.props.children,
            childrenState = state.children;
        if (childrenState && Array.isArray(children)) {
            children.forEach((c, i)=> {
                var child = this.refs['child-' + i];
                if (child === undefined) {
                    // this case may happen, if the component's children is not rendered
                    // since it does not have a width or height in Grid component
                    
                    // console.error('Can\' find component to apply state');
                    return;
                }
                return child.putState(childrenState[i]);
            });
        }
        // console.log(this.getDOMNode(), exclude(state, 'children'));
        this.setState(exclude(state, 'children'));
    },

    /* get state from component then persist the state info
     **/
    saveState() {
        var id = this.props.id;
        // only component with id attribute can save state
        if (!id) {
            throw new Error('Only component with id attribute can save state');
        }
        var s = this.getState(true);
        writer(id, s);
    },

    /* get state from store the apply it the component
     **/
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
