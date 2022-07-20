const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, './');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          {
            test: /\.(tsx?)$/,
            loader: 'ts-loader',
            exclude: [
              [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, '.serverless'),
                path.resolve(__dirname, '.webpack'),
              ],
            ],
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ], 
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            "@functions": path.resolve(rootDir,"src/functions/"),
            "@libs": path.resolve(rootDir,"src/libs/"),
            "@mocks": path.resolve(rootDir,"src/mocks/"),
        },
    },
    plugins: [
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
    ]
}