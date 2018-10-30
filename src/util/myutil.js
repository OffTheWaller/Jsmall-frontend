/**
 * @author: js
 */
'use strict';

var hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
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
     * 渲染html模板
     * 使用hogan组件
     */
    renderHtml: function (htmlTemplate, data) {
        var template = hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },

    /**
     * 跳转到登录页的方法
     * encodeURIComponent全局方法，将当前地址进行编码，防止特殊字符被截取掉
     * 当前地址当做参数传入，使得登录后跳转回之前的页面
     */
    doLogin: function () {
        
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },

    /**
     * 跳转到主页方法
     */
    goHome: function () {
        window.location.href = './index.html';
    },

    /**
     * 成功提示和失败提示
     */
    successTips: function (msg) {
        alert(msg || '操作成功！');
    },
    errorTips: function (msg) {
        alert(msg || '操作失败！');
    },

    /**
     * 手机，邮箱信息验证
     * 支持非空，手机，邮箱的判断
     */
    validate: function (value, type) {
        var value = $.trim(value);
        if ('require' === type) { //require表示必填，非空验证
            return !!value;  //!!是把value强转为Boolean型
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
    }



}

module.exports = _myUtil;