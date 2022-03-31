const path = require('path');
const { whenDev, whenProd, when, POSTCSS_MODES } = require('@craco/craco');
const CracoVtkPlugin = require('craco-vtk');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 打包时压缩代码成gz，如果服务器开启了gzip可以大大压缩大小
const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require('craco-antd');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const WebpackBar = require('webpackbar'); // 显示打包进度条用的
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

const isBuildAnalyzer = false; //是否打开打包分析
const resolve = (dir) => path.resolve(__dirname, dir);
const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';

// 打包取消sourceMap
process.env.GENERATE_SOURCEMAP = 'false';

module.exports = ({ env: webpackEnv }) => {
  const isEnvProduction = webpackEnv === 'production';

  return {
    style: {
      modules: {
        localIdentName: CSS_MODULE_LOCAL_IDENT_NAME,
      },
      postcss: {
        mode: POSTCSS_MODES.file,
        env: {
          autoprefixer: {
            cascade: true,
          },
          stage: 3,
          features: {
            'nesting-rules': true,
          },
        },
        plugins: [
          // CSS 压缩
          require('cssnano')({
            preset: 'default',
          }),
        ],
      },
    },
    /**
     * 新增 craco 提供的 plugin
     */
    plugins: [
      {
        plugin: CracoVtkPlugin(),
      },
      /* antd组件按需加载&样式覆盖等 */
      {
        plugin: CracoAntDesignPlugin,
        options: {
          customizeThemeLessPath: path.join(
            __dirname,
            'src/assets/style/antd.theme.less',
          ),
        },
      },
      /* 支持less module */
      {
        plugin: CracoLessPlugin,
        options: {
          noIeCompat: true,
          cssLoaderOptions: {
            modules: true,
            modules: { localIdentName: CSS_MODULE_LOCAL_IDENT_NAME },
          },
          modifyLessRule: function (lessRule, _context) {
            lessRule.test = /\.(module)\.(less)$/;
            lessRule.exclude = path.join(__dirname, 'node_modules');
            return lessRule;
          },
          lessLoaderOptions: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
    /**
     * 扩展 webpack 相关配置
     */
    webpack: {
      alias: {
        src: resolve('src'),
        assets: resolve('src/assets'),
        components: resolve('src/components'),
        router: resolve('src/router'),
        hooks: resolve('src/hooks'),
        store: resolve('src/store'),
        server: resolve('src/server'),
        utils: resolve('src/utils'),
        share: resolve('src/share'),
      },
      /**
       * 新增 webpack plugin
       */
      plugins: [
        /**
         * 模块间循环依赖检测插件
         *  - https://juejin.im/post/6844904017848434702
         */
        ...whenDev(
          () => [
            new CircularDependencyPlugin({
              exclude: /node_modules/,
              include: /src/,
              failOnError: true,
              allowAsyncCycles: false,
              cwd: process.cwd(),
            }),
          ],
          [],
        ),
        new WebpackBar({
          name: isEnvProduction ? '正在打包' : '正在启动',
          color: '#ffc0cb',
        }),
        /**
         * 编译产物分析
         *  - https://www.npmjs.com/package/webpack-bundle-analyzer
         */
        ...when(isBuildAnalyzer, () => [new BundleAnalyzerPlugin()], []),
      ],

      optimization: {
        minimize: isEnvProduction,
        minimizer: [
          // This is only used in production mode
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_debugger: true,
                drop_console: true,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            sourceMap: false,
          }),
          // This is only used in production mode
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              parser: safePostCssParser,
              map: false,
            },
            cssProcessorPluginOptions: {
              preset: [
                'default',
                { minifyFontValues: { removeQuotes: false } },
              ],
            },
          }),
        ],
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
          chunks: 'all',
          name: false,
        },
        // Keep the runtime chunk separated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        // https://github.com/facebook/create-react-app/issues/5358
        runtimeChunk: {
          name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
      },
    },
  };
};
