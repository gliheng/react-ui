import React from 'react';

let ProgressBar = React.createClass({
    getDefaultProps() {
        return {
            showLabel: true
        };
    },
    getInitialState() {
        return {
            progress: 0
        };
    },
    setProgress(percent) {
        this.setState({
            progress: Math.min(Math.max(Math.round(percent), 0), 100)
        });
    },
    render() {
        let p = this.state.progress + '%',
            style = {
                width: p
            };

        if (this.props.showLabel) {
            var label = <p className="Label">{p}</p>;
        }
        return (
            <div className="ProgressBar">
                {label}
                <div className="Bar" style={style}></div>
            </div>
        );
    }
});

export default ProgressBar;
