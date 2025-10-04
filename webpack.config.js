const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")

const { rootPage } = require("./src/page/root-page")

const pages = ["index.html", "404.html"]
/**
 * @param {string} basePath
 * @param {import("./src/page/page-info").IPageInfo} page
 */
function addPage(basePath, page) {
    pages.push(path.join(basePath, page.slagName, "index.html"))
    for (const subPage of page.subPages ?? []) {
        addPage(path.join(basePath, page.slagName), subPage)
    }
}
for (const subPage of rootPage.subPages ?? []) {
    addPage("", subPage)
}

/** @type {webpack.Configuration} */
const config = {
    mode: "production",
    stats: "minimal",
    entry: path.resolve(__dirname, "src/app/index.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "scripts/[name].[contenthash].js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                },
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }, {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
                generator: {
                    filename: "assets/[hash][ext][query]"
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    optimization: {
        minimizer: [
            "...",
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin()
        ],
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CopyPlugin({ patterns: [{ from: "public" }] }),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash].css"
        }),
        new VueLoaderPlugin(),
        ...pages.map(page => new HtmlWebpackPlugin({
            template: "index.webpack.html",
            filename: page,
            inject: "body"
        }))
    ]
}

module.exports = config
