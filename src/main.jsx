import Constants from './Constants';
import HGroup from './HGroup.jsx';
import VGroup from './VGroup.jsx';
import View from './View.jsx';
import Grid from './Grid.jsx';
import Tabs from './Tabs.jsx';
import Popup from './Popup.jsx';
import * as Utils from './Utils';
import {setReader, setWriter} from './mixins/PersistentState';

require('./styles/style.scss');

function config(_config) {
    Utils.extend(Constants.config, _config);

    if (Constants.config.persistState) {
        let [reader, writer] = Constants.config.persistFunc();
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
        var $node = app.getDOMNode();
        app.resize($node.clientWidth, $node.clientHeight);
    }

    window.addEventListener('resize', function() {
        resize();
        app.saveState();
    });

    app.restoreState();
    resize();
    return app;
}

export {HGroup, VGroup, Grid, View, Tabs, Popup, bootstrap, config, Utils};
