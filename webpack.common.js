var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: [
            "./src/index.tsx",
        ]
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    plugins: [
    ],

    module: {
        rules: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            // load images inline with the url-loader plugin for webpack (https://survivejs.com/webpack/loading/images/).
            {
                test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 15000,
                        name: '[name].[ext]',
                    }
                }
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" },
        ]
    }
};