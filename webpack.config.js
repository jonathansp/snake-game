module.exports = {
  entry: ['babel-polyfill', "./src/main.js"],

  output: {
    path: __dirname,
    filename: "./dist/snake-game.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
      }
    ]
  }
};
