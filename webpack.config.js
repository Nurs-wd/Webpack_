const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { dirname } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeAssetsCssPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('id dev: ', isDev)
const optimization = () => {
    let config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    
    if (isProd) {
        config.minimizer = [
        new TerserWebpackPlugin(),
        new OptimizeAssetsCssPlugin()
        ]
    }

    return config
}

module.exports = {
    context:path.resolve(__dirname, 'src'),
    mode:'development',
    entry: {
        main: './index.js',
        analytics:'./analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve (__dirname, 'dist')
    },
    resolve:{
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@' : path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new TerserWebpackPlugin(),
        new OptimizeAssetsCssPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                    loader: MiniCssExtractPlugin.loader,
                    },
                'css-loader'
                ]
            },
            // 'style-loader'
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader'
            //         // {
            //         //     loader: 'babel-loader',
            //         //     options: {
            //         //         presets: [
            //         //             '@babel/preset-env'
            //         //         ]
            //         //     }
            //         // }, // for babel presets but error 
            //     }
            //}
        ]
    }
}