const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.join(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        // compress: true,
        port: 9000,
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
    ],
    
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: [
                    ['@babel/preset-env', { targets: 'defaults' }]
                ]
                }
            }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders:1,
                        },
                    }, 
                    'postcss-loader',
                ],
              },
              {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[contenthash][ext]',
                }
              },
        ]
    }
};