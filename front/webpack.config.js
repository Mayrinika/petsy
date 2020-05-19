const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    devtool: "eval-cheap-module-source-map",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js",
        publicPath: "/",
    },
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "https://us-central1-petsy-405d6.cloudfunctions.net/api",
                pathRewrite: {"^/api": ""},
                changeOrigin: true,
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./src/index.html"
        })
    ]
};
