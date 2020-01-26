const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const pages = glob.sync('**/*.pug', {
  cwd: path.resolve(__dirname, 'src/pages')
})

const pagePlugins = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${page}`,
    filename: page.replace('.pug', '.html')
  })
})

const filePlugins = new CopyPlugin([
  { from: './src/assets/images/', to: './assets/images/' },
  { from: './src/robots.txt', to: './robots.txt' },
  { from: './src/site.webmanifest', to: './site.webmanifest' },
  { from: './src/favicon.ico', to: './favicon.ico' },
  { from: './src/favicon-32x32.png', to: './favicon-32x32.png' },
  { from: './src/favicon-16x16.png', to: './favicon-16x16.png' },
  { from: './src/apple-touch-icon.png', to: './apple-touch-icon.png' },
  { from: './src/android-chrome-512x512.png', to: './android-chrome-512x512.png' },
  { from: './src/android-chrome-192x192.png', to: './android-chrome-192x192.png' }
])

const config = {
  entry: {
    app: './src/assets/scripts/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /^(?!.*\.(js|css|png|jpg|svg|webp)|$).*$/,
          to: context => {
            let { pathname } = context.parsedUrl
            if (pathname.charAt(pathname.length - 1) === '/') {
              pathname = pathname.substring(0, pathname.length - 1)
            }
            return `${pathname}.html`
          }
        }
      ]
    }
  },
  plugins: [].concat(pagePlugins, filePlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader?attrs=false', 'pug-html-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  }
}

module.exports = config
