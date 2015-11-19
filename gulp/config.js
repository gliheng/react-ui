var dest = './dist';
var src = './src';
var webpack = require('webpack');
var path = require('path');
var pwd = process.cwd();
var packageJson = require(path.join(pwd, 'package.json'));

module.exports = {
    webpack: {
        entry: {
            'react-ui': src + '/main.jsx'
        },
        output: {
            path: dest,
            filename: '[name].js',
            library: 'ReactUI',
            libraryTarget: 'umd'
        },
        module: {
            loaders: [
                {test: /\.jsx?$/, exclude: [/node_modules/], loader: 'babel-loader'},
                {test: /\.scss$/, loader: 'style!css!sass'}
            ]
        },
        resolve: {
            root: pwd,
            extensions: ['', '.js', '.jsx']
        },
        externals: {react: "React"}
    },
    sass: {
        src: src + '/styles/**/*.{sass,scss,css}',
        dest: dest + '/styles',
        settings: {
            indentedSyntax: false, // Enable .sass syntax?
            imagePath: '/images' // Used by the image-url helper
        }
    },
    watch: {
        src: 'src/**/*.*',
        tasks: ['build']
    },
    server: {
        settings: {
            root: ['./examples/', '.'],
            host: 'localhost',
            port: 8081,
            livereload: {
                port: 35930
            }
        }
    }
};
