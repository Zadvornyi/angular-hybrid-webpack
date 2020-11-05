var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, './app/index.ts')
    },

    output: {
        path: path.join(__dirname, './build'),
        publicPath: "/",
        filename: '[name].bundle.js' //adding [name], fixed bug with multi-loading
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: "./build",
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /\/user\//,
                    to: function () {
                        return '/index.html';
                    }
                },
                {
                    from: /\/search\//,
                    to: function () {
                        return '/index.html';
                    }
                }
            ]
        }
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,

                use: [
                    'ts-loader',
                    'angular2-template-loader',
                ],
                exclude: /node_modules/
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(autotrack|dom-utils|bufferutil|utf-8-validate))/, //this need for ie11
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false
                                }
                            ]
                        ],
                        plugins: ["@babel/plugin-proposal-object-rest-spread"]
                    }
                }]
            },
            {
                test: /\.(scss|css)$/,
                use: ['to-string-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname, './node_modules/bootstrap/sass'),
                                    path.resolve(__dirname, './node_modules/compass-mixins/lib'),
                                ],
                                sourceMap: true
                            }
                        }
                    }
                ]
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'hash=sha512&digest=hex&name=[hash].[ext]',
                            esModule: false,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(otf|eot|svg|ttf|woff2|woff)/,
                use: 'url-loader?limit=8192',
                exclude: /img/
            }
        ]

    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({ template: './app/index.html' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            moment: "moment",
            Popper: ['popper.js', 'default']
        }),
        new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, path.resolve(__dirname, './app')),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
            HASH: JSON.stringify(new Date().getTime().toString('16'))
        })
    ]
}
