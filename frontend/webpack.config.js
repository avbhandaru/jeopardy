const path = require('path');

module.exports = {
  entry: './src/index.jsx', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'public'), // Serve static files from the 'public' directory
    },
    historyApiFallback: true,
    port: 4000, // You can specify the port you want your frontend to run on
    open: true, // Automatically opens the browser
    hot: true, // Enable hot reloading
  },
};
