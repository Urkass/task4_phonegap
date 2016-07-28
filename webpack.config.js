var webpack = require('webpack');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({}),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
        }],
    },
};
