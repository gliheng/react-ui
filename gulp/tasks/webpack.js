var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
// var WebpackDevServer = require("webpack-dev-server");
var config = require('../config').webpack;

gulp.task("webpack", function(callback) {
    webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
