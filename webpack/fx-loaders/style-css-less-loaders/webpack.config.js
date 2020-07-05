const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devtool: "source-map",
    resolveLoader: {
        modules: ["node_modules", path.resolve(__dirname, "loaders")]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    }
}