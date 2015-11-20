import React from 'react';
import Constants from './Constants';
import {getTMPDOMRoot} from './Utils';


let Toast = React.createClass({
    statics: {
        show: function (args) {
            var $root = getTMPDOMRoot();
            var toast = (
                <Toast
                    id={args.id}
                    className={args.className}
                    duration={args.duration}
                    animated={args.animated}>
                    {args.content}
                </Toast>
            );
            return React.render(toast, $root);
        }
    },

    getDefaultProps() {
        return {
            duration: null,
            animated: true
        };
    },

    getInitialState() {
        return {
            hide: false
        };
    },

    close() {
        if (this.state.hide) return;

        if (this.props.animated) {
            this.setState({
                hide: true
            });
            setTimeout(()=> {
                this.destroy();
            }, Constants.config.transitionDuration);
        } else {
            this.destroy();
        }
    },

    componentDidMount() {
        var t = this.props.duration;
        if (t) {
            setTimeout(()=> {
                this.close();
            }, t);
        }
    },

    destroy() {
        var $root = this.getDOMNode().parentNode;
        React.unmountComponentAtNode($root);
        $root.parentNode.removeChild($root);
    },

    render() {
        var className = 'Toast',
            props = this.props,
            state = this.state;
        if (props.className) {
            className += ' ' + props.className;
        }
        if (props.animated) {
            className += state.hide ? ' hide' : ' show';
        }

        var content = React.addons.cloneWithProps(props.children, {
            ref: 'content'
        });
        return (
            <div id={props.id} className={className} onClick={this.close}>
                <div className="Content">{content}</div>
            </div>
        );
    }
});

export default Toast;
