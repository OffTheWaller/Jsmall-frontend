
//使用plugins时要使用webpack变量
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output: {
        //output里的path是所有输出文件的根目录
        path: './dist',
        //执行webpack指令后，打包好的文件在dist/js/下
        //[name]的作用是生成对应的多个js文件
        filename: 'js/[name].js'
    },
    //为了直接在页面中加载jquery CDN时的配置，自己规定了一个外部的模块
    //在使用jquery，当做模块直接require进来就行了
    externals: {
        'jquery': 'window.jQuery'
    },
    //加载css
    module: {
        loaders: [
            //cssloader，中间的!表示两个loader串联，使用loader时要先用npm安装到--save-dev
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader')}
        ]
    },
    plugins: [
        //自动抽取公共模块到base.js
        new webpack.optimize.CommonsChunkPlugin({
            //这里name和entry里的common相对应，可以实现把公共模块打包到base.js
            name: 'common',
            //如果公共文件在页面中不引用，会报错
            filename: 'js/base.js'
        }),
        //这个插件把css打包成独立的css文件，并不是在js中的css
        //[name]是个变量，对应于entry里的name
        new ExtractTextPlugin('css/[name].css')
    ]
}
module.exports = config;