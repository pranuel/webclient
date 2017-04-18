module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            // load images inline with the url-loader plugin for webpack (https://survivejs.com/webpack/loading/images/).
            {
                test: /\.(png|jpg|svg)$/,
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
            { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // You might be wondering about that externals field.
    // We want to avoid bundling all of React into the same file,
    // since this increases compilation time and browsers will typically be able to cache a library if it doesn’t change.

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};