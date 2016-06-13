import React from 'react';

let ProgressBar = React.createClass({
    getDefaultProps() {
        return {
            showLabel: true,
            progress: 0
        };
    },
    render() {
        var progress = this.props.progress;

        progress = Math.min(Math.max(Math.round(progress), 0), 100);
        
        let p = progress + '%',
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
