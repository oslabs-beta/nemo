import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './client/src/index.js',
  output: {
    path: path.resolve('/dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './client/src/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|tif)$/i,
        use: {
          loader: 'file-loader',
          options: {},
        },
      },
    ],
  },
  resolve: { modules: ['node_modules'] },
};
