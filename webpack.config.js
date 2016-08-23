module.exports = {
    entry: ['babel-polyfill', "./src/main.js"],

    output: {
        path: __dirname,
        filename: "./dist/snake-game.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }]
    }
};
