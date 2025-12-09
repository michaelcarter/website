const { generateSitemapConfig } = require('./scripts/sitemap')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { glob } = require('glob')

const pages = glob.sync('**/*.pug', {
  cwd: path.resolve(__dirname, 'src/pages'),
})

const pagePlugins = pages.map((page) => {
  return new HtmlWebpackPlugin({
    inject: false,
    template: `./src/pages/${page}`,
    filename: page.replace('.pug', '.html'),
  })
})

const filePlugins = new CopyPlugin({
  patterns: [
    { from: './src/assets/images/', to: './assets/images/' },
    { from: './src/assets/fonts/', to: './assets/fonts' },
    { from: './src/robots.txt', to: './robots.txt' },
    { from: './src/pages/rss.xml', to: './rss.xml' },
    { from: './src/site.webmanifest', to: './site.webmanifest' },
    { from: './src/favicon.ico', to: './favicon.ico' },
    { from: './src/favicon-32x32.png', to: './favicon-32x32.png' },
    { from: './src/favicon-16x16.png', to: './favicon-16x16.png' },
    { from: './src/apple-touch-icon.png', to: './apple-touch-icon.png' },
    {
      from: './src/android-chrome-512x512.png',
      to: './android-chrome-512x512.png',
    },
    {
      from: './src/android-chrome-192x192.png',
      to: './android-chrome-192x192.png',
    },
  ],
})

const sitemapPlugin = new SitemapPlugin({
  base: 'https://mcarter.me',
  paths: generateSitemapConfig(),
  options: {
    filename: 'sitemap.xml',
  },
})

const cssPlugin = new MiniCssExtractPlugin({
  filename: 'assets/styles/[name].css',
})

const statsConfig = {
  children: false,
  chunks: false,
  assets: false,
  builtAt: false,
  hash: false,
  // timings: false,
  entrypoints: false,
  modules: false,
  version: false,
  warnings: false,
}

const config = {
  stats: statsConfig,
  performance: {
    hints: false,
  },
  entry: {
    main: './src/assets/styles/main.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /^(?!.*\.(js|css|png|jpg|svg|webp)|$).*$/,
          to: (context) => {
            let { pathname } = context.parsedUrl
            if (pathname.charAt(pathname.length - 1) === '/') {
              pathname = pathname.substring(0, pathname.length - 1)
            }
            return `${pathname}.html`
          },
        },
      ],
    },
    devMiddleware: { stats: statsConfig },
  },
  plugins: [].concat(pagePlugins, filePlugins, sitemapPlugin, cssPlugin),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: false,
            },
          },
          'pug-html-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler',
              sassOptions: {
                silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
              },
            },
          },
        ],
      },
    ],
  },
}

module.exports = config
