const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const config = {
    entry: './src/index.js',//打包入口地址
    output: {
        filename: 'bundle.js',//打包后的文件名
        path: path.resolve(__dirname, 'dist')//打包后的文件存放地址
    },
    module: {
        rules: [//转换规则
            {
                test: /\.css$/,//匹配所有的 css 文件
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)/i,//匹配图片文件
                type: 'asset',//资源文件
                generator: {
                    filename: 'img/[name][hash:4][ext]',//生成的文件名
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024,//图片大小大于50kb不转为base64
                    }
                }
            },
            {
                test: /\.html$/,
                //处理html文件中img图片
                loader: "html-withimg-loader"
            }
        ]
    },
    plugins: [//插件
        new HtmlWebpackPlugin({
            template: './src/index.html'//模板文件
        }),
        new CleanWebpackPlugin(),//清除打包文件
        new MiniCssExtractPlugin({
            filename: '[name].[hash:4].css'//打包后的css文件名
        })
    ],
    devServer: {
        static: "./",//静态文件目录
        compress: true,//服务器压缩
        port: 8000,//服务器端口
        open: true//自动打开浏览器
    },
    experiments: {
        topLevelAwait: true
    },
}
module.exports = (env, argv) => {
    console.log('argv.mode=', argv.mode);//打印mode模式
    return config;
}