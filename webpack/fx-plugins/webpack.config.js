const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DonePlugin = require("./plugins/donePlugin");
const AsyncPlugin = require("./plugins/AsyncPlugin");
const FileListPlugin = require("./plugins/fileListPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineSourcePlugin = require("./plugins/inlineSourcePlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        // new DonePlugin(),
        // new AsyncPlugin(),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new FileListPlugin({
            filename: "list.md"
        }),
        new InlineSourcePlugin({
            match: /\.(js|css)$/
        })
    ]
}