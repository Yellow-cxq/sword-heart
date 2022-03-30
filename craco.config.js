/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const { when, whenDev, whenProd, whenCI, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    reactScriptsVersion: "react-scripts",/* (default value) */
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
        configure: {
            // output: {
            //     path: path.resolve(__dirname, "dist")
            // },
            //这段代码在2020-08-06的时候仅仅修改public文件的打包目录
        },
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.output.path = path.resolve(__dirname, "dist")//ts和less编译后的文件
            paths.appBuild = path.resolve(__dirname, "dist");//public中的文件
            return webpackConfig;
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        }
    ],
};