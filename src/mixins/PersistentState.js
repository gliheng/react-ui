/*
 * State are automaticly saved, unless noPersist props is passed.
 */

import React from 'react';
import {noop, clone, exclude, empty} from '../Utils';

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
        var s = clone(this.state || {}, ['curTab', 'size', 'colsize', 'rowsize']),
            children = this.props.children;
        if (full) {
            var childrenState = {};
            for (var key in this.refs) {
                let c = this.refs[key];
                if (typeof c.getState === 'function') {
                    childrenState[key] = c.getState(full);
                }
            }
            let cEmpty = empty(childrenState);
            if (empty(s) && cEmpty) {
                return null;
            }
            if (!cEmpty) {
                s.children = childrenState;
            }
        }
        return s;
    },

    /** apply state to the component
     */
    putState(state) {
        if (!state) return;
        var children = this.props.children,
            childrenState = state.children;

        this.setState(exclude(state, 'children'), ()=>{
            if (typeof this.stateRestored == 'function') {
                this.stateRestored();
            }

            if (childrenState) {
                for (var key in childrenState) {
                    let c = this.refs[key];
                    if (c !== undefined && typeof c.putState == 'function') {
                        c.putState(childrenState[key]);
                    }
                }
            }
        });
    },

    /** get state from component then persist the state info
     */
    saveState() {
        var id = this.props.id;
        // only component with id attribute can save state
        if (!id || this.props.noPersist) {
            // console.warn('Only component with id attribute can save state');
            return;
        }
        var s = this.getState(true);
        writer(id, s);
    },

    /** get state from store the apply it the component
     */
    restoreState() {
        var id = this.props.id;
        if (!id || this.props.noPersist) {
            // console.warn('Only component with id attribute can save state');
            return;
        }
        var state = reader(id);
        if (state) {
            this.putState(state);
        }
    }

};
