const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        home:'./src/assets/js/entry/home_entry.js',
        search:'./src/assets/js/entry/search_entry.js',
        map:'./src/assets/js/entry/map_entry.js',
        details:'./src/assets/js/entry/details_entry.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'src/dist'),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            title:'Home',
            filename: 'html/home.html',
            template: 'src/assets/template/home.html'
        }),
        new HtmlWebpackPlugin({
            title:'Search',
            filename: 'html/search.html',
            template: 'src/assets/template/search.html'
        }),
        new HtmlWebpackPlugin({
            title:'Map',
            filename: 'html/map.html',
            template: 'src/assets/template/map.html'
        }),
        new HtmlWebpackPlugin({
            title:'Station',
            filename: 'html/details.html',
            template: 'src/assets/template/details.html'
        }),

        new Dotenv(),
    ],

    module: {
        rules: [

            //Sass Loaders
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },

            //Css Loaders
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            //Image Loader
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[base]'
                }
            },

            //Font Loader
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[base]'
                }
            },
        ],
    },
};