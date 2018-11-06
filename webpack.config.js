
//使用plugins时要使用webpack变量
var webpack = require('webpack');
//独立打包css插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//html插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置  dev || online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
//获取html插件配置对象
var getHtmlConfig = function (name, title) {
    //这里return出去的是HtmlWebpackPlugin的options对象
    return {
        //html模板
        template: './src/view/'+name+'.html',
        //生成的html页面
        filename: 'view/'+name+'.html',
        //inject为true表示script标签位于html文件body的底部
        inject: true,
        //增加title字段，里面存每个页面的title
        title: title,
        hash: true,
        //chunks用于多入口文件时确定引入的js文件
        //chunks是一个数组，里面的名字就是入口js文件的名字
        chunks: ['common',name]
    }
}

var config = {
    entry: {
        //common后面是webpack-dev-server的配置
        'common': ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
        'result' : ['./src/page/result/index.js']
    },
    output: {
        //output里的path是所有输出文件的根目录
        path: './dist',
        //访问地址
        publicPath: '/dist',
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
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader')},
            //加载图片和字体文件的loader，需要同时npm i file-loader 和 url-loader
            { test: /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)\??.*$/, loader: 'file-loader?limit=8192&name=resource/[name].[ext]' },
            //加载.string文件
            { test: /\.string$/, loader:'html-loader'}
        ]
    },
    //配置相关目录路径
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
        }
    },
    plugins: [
        //自动抽取公共模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            //这里name和entry里的common相对应，可以实现把公共模块打包到base.js
            name: 'common',
            //如果公共文件在页面中不引用，会报错
            filename: 'js/base.js'
        }),
        //这个插件把css打包成独立的css文件，并不是在js中的css
        //[name]是个变量，对应于entry里的name
        new ExtractTextPlugin('css/[name].css'),
        //html模板的处理
        //如果要生成多个html页面，就要new多个这个对象，传对应参数即可
        //这个插件也支持ejs语法，可以在html中引入局部模块的html，但要安装html-loader，使用ejs语法即可
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果提示页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息'))
    ]
}

//判断是开发还是线上环境
//使用webpack-dev-server时的指令是：WEBPACK_ENV=dev webpack-dev-server --inline --port 8080
if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}
module.exports = config;