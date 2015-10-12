import HGroup from './HGroup.jsx';
import VGroup from './VGroup.jsx';
import View from './View.jsx';
import Grid from './Grid.jsx';

require('./styles/style.scss');

function render(element, $container) {
    var app = React.render.apply(React, arguments);
    function resize() {
        app.setState({
            width: $container.clientWidth,
            height: $container.clientHeight
        });
    }
    window.addEventListener('resize', function() {
        resize();
        app.saveState();
    });

    app.restoreState();
    resize();
    return app;
}

import {setReader, setWriter} from './mixins/PersistentState';
function persistFunc(reader, writer) {
    setReader(reader);
    setWriter(writer);
}

export {HGroup, VGroup, Grid, View, render, persistFunc};
