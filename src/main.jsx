import HGroup from './HGroup.jsx';
import VGroup from './VGroup.jsx';
import View from './View.jsx';
import Grid from './Grid.jsx';

require('./styles/style.scss');

function bootstrap(app) {
    function resize() {
        var $node = app.getDOMNode().parentNode;
        app.setState({
            width: $node.clientWidth,
            height: $node.clientHeight
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

export {HGroup, VGroup, Grid, View, bootstrap, persistFunc};
