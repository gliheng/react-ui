import Constants from './Constants';
import HGroup from './HGroup';
import VGroup from './VGroup';
import View from './View';
import Grid from './Grid';
import Tabs from './Tabs';
import Toast from './Toast';
import Popup from './Popup';
import Menu from './Menu';
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
        app.saveState && app.saveState();
    });

    resize();
    return app;
}

export {HGroup, VGroup, Grid, View, Tabs, Popup, Toast, Menu, bootstrap, config, Utils};
