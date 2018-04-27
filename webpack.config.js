const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distDir = path.resolve(__dirname, "/dist/");
const baseUrl = '/';

module.exports = (env, { p } = argv) => ({
    // `p` gets destructed from the arguments vector and is `true` for production builds
    mode: p ? 'production' : 'development',
    entry: "./src/index.tsx",
    output: {
        path: distDir,
        publicPath: baseUrl,
        filename: '[name].[hash].js',
        sourceMapFilename: '[file].map',
        hashDigestLength: 8,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: p ? false : 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // embed small images as Data Urls
            {
                test: /\.(png|gif|jpg|cur)$/i,
                loader: 'url-loader',
                options: { limit: 8192 },
            },
            {
                test: /\.(ttf|eot|svg|otf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'file-loader',
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: distDir,
        port: 8888
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            minify: p
                ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    ignoreCustomFragments: [/\${.*?}/g],
                }
                : undefined,
            metadata: {
                // available in index.ejs //
                baseUrl
            },
        })
    ]
});