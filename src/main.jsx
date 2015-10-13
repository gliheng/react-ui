import HGroup from './HGroup.jsx';
import VGroup from './VGroup.jsx';
import View from './View.jsx';
import Grid from './Grid.jsx';
import Tabs from './Tabs.jsx';
import {setReader, setWriter} from './mixins/PersistentState';

require('./styles/style.scss');

var defaults = {
    persistState: true,
    persistFunc: function () {
        return [
            (id)=> JSON.parse(localStorage[`Layout-Dimension:${id}`] || '{}'),
            (id, data)=> localStorage[`Layout-Dimension:${id}`] = JSON.stringify(data)
        ];
    }
};

function config(_config) {
    Object.assign(defaults, _config);

    if (defaults.persistState) {
        let [reader, writer] = defaults.persistFunc();
        setReader(reader);
        setWriter(writer);
    } else {
        setReader(null);
        setWriter(null);
    }
}

config();

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

export {HGroup, VGroup, Grid, View, Tabs, bootstrap, config};
