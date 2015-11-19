import React from 'react';
import {noop, clone, exclude} from '../Utils';

var reader = noop;
export function setReader(_reader) {
    reader = _reader || noop;
}

var writer = noop;
export function setWriter(_writer) {
    writer = _writer || noop;
}

export default {
    /** get the state dict recursively from the component
     */
    getState(full) {
        var s = clone(this.state || {}, ['size', 'colsize', 'rowsize']),
            children = this.props.children;
        if (full) {
            var childrenState = [];
            for (var key in this.refs) {
                if (key.startsWith('child-') && typeof this.refs[key].getState === 'function') {
                    var idx = parseInt(key.substring(6));
                    if (!isNaN(idx)) {
                        childrenState[idx] = this.refs[key].getState(full);
                    }
                }
            }
            if (childrenState.length != 0) {
                s.children = childrenState;
            }
        }
        return s;
    },

    /** apply state to the component
     */
    putState(state) {
        var children = this.props.children,
            childrenState = state.children;

        if (childrenState) {
            React.Children.forEach(children, (c, i)=> {
                var child = this.refs['child-' + i];
                if (!child || !childrenState[i] || typeof child.putState != 'function') {
                    // this case may happen, if the component's children is not rendered
                    // console.error('Can\' find component to apply state');
                    return;
                }
                return child.putState(childrenState[i]);
            });
        }
        // console.log(this.getDOMNode(), exclude(state, 'children'));
        this.setState(exclude(state, 'children'), ()=>{
            if (typeof this.stateRestored == 'function') {
                this.stateRestored();
            }
        });
    },

    /** get state from component then persist the state info
     */
    saveState() {
        var id = this.props.id;
        // only component with id attribute can save state
        if (!id) {
            console.warn('Only component with id attribute can save state');
            return;
        }
        var s = this.getState(true);
        writer(id, s);
    },

    /** get state from store the apply it the component
     */
    restoreState() {
        var id = this.props.id;
        if (!id) {
            console.warn('Only component with id attribute can save state');
            return;
        }
        var state = reader(id);
        if (state) {
            this.putState(state);
        }
    }

};
