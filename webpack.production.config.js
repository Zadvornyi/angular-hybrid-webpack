var webpack = require('webpack');
var path = require('path');
var ngw  = require('@ngtools/webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: path.join(__dirname, './app/index.aot.ts')
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: "/",
        filename: '[id].[hash].bundle.js',
        chunkFilename: "[id].[hash].bundle.js"
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: {
                        reserved: ['$scope', '$state', '$rootScope']
                    },
                    // Compression specific options
                    compress: {
                        // Drop console statements
                        drop_console: true
                    },
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
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
                use: [
                    'style-loader',
                    'css-loader',
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
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: {
                            caseSensitive: true,
                            collapseWhitespace: true,
                            conservativeCollapse: true,
                            keepClosingSlash: true,
                            minifyCSS: false,
                            minifyJS: true,
                            removeAttributeQuotes: false,
                            removeComments: true,
                            removeScriptTypeAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            useShortDoctype: true
                        }
                    }
                }],
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
        new HtmlWebpackPlugin({
            template: './app/index.html',
            hash: true
        }),
        new ngw.AngularCompilerPlugin({
            tsConfigPath: path.join(__dirname, './tsconfig.aot.json'),
            entryModule:  path.join(__dirname, '../app/index.aot.ts#AhwAngularModule')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            moment: "moment",
            Popper: ['popper.js', 'default']
        }),
        new webpack.ContextReplacementPlugin( /angular(\\|\/)core(\\|\/)/, path.resolve(__dirname, './app') ),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
            HASH: JSON.stringify(new Date().getTime().toString('16'))
        })
    ]
}

