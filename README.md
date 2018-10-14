## mymall-frontend
### webpack配置
- 多入口
- loader
- plugin
- webpack-dev-server
  - 启动项目：执行`npm run dev_win`

### 使用Fiddler做请求代理
- 配置接口时需要设置传入参数

### 通用工具类模块
```javascript
var _myUtil = {
    //这里面封装工具方法
}
module.exports = _myUtil;

```

### 开发一个新页面的步骤

- 在`views`目录下新建该页面的html模板
- 在`page`目录下新建文件夹，里面存放该页面的`js`和`css`文件
- 修改`webpack.config.js`文件
  - 增加`entry`下面的入口文件: `'xxx' : ['./src/page/xxx/index.js']`
  - new 一个新的HtmlWebpackPlugin() : `new HtmlWebpackPlugin(getHtmlConfig('xxx', 'title'))`
  - 只要修改了`webpack.config.js`文件，就要重启项目