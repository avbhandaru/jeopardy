const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // Matches .js, .jsx, .ts, .tsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // Transpile ES6+ to ES5
              '@babel/preset-react', // Transpile JSX
              '@babel/preset-typescript', // Transpile TypeScript
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
