const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const config = {
    context: __dirname,
    entry: {
     index:   './js/CoverIndex.jsx',
     authorize:  './js/CoverAuthorize.jsx'

    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
        {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: "common"}),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences     : true,
            booleans      : true,
            loops         : true,
            unused      : true,
            warnings    : false,
            drop_console: true,
            unsafe      : true
        }
    }),
    new HardSourceWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
     minimize: true
     })
    ]

};
module.exports = config;