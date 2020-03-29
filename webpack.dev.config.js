const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: {
        index: path.join(__dirname, "test.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "http://localhost:8181/"
    },
    devServer: {
        port: 8282
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html")
        })
    ]
}
