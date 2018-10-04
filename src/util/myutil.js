/**
 * @author: js
 */
'use strict';

var conf = {
    serverHost: ''
}
var _myUtil = {

    /**
     * 获取数据请求方法
     */
    request: function (param) {
        //获取当前的this对象，供回调使用
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                } 
                //没有登录状态，需要登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //请求成功，但请求的数据出错
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },

    /**
     * 获取后端地址方法
     * 后期万一修改了host地址，这里方便维护，所以要写此方法
     */
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },

    /**
     * 获取URL的参数方法
     * 先window.location.search.substr(1)截取?号后面的部分
     */
    getUrlParam: function (name) {
        //提取出key=value的正则
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)' );
        //window.location.search返回带有?号的URL参数部分,用substr截掉?号
        var result = window.location.search.substr(1).match(reg);
        
        return result ? decodeURIComponent(result[2]) : null;
    },

    /**
     * 跳转到登录页的方法
     * encodeURIComponent全局方法，将当前地址进行编码，防止特殊字符被截取掉
     * 当前地址当做参数传入，使得登录后跳转回之前的页面
     */
    doLogin: function () {
        window.location.href = './login.html?redirect' + encodeURIComponent(window.location.href);
    }
}

module.exports = _myUtil;