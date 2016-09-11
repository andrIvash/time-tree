var webpack = require("webpack");

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        path: './app/assets/js',
        filename: 'app.bundle.js',
        sourceMapFilename: 'app.map'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};
