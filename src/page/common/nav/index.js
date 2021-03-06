/**
 * @author: js
 */
'use strict'
require('./index.css')

var _myUtil = require('util/myutil.js')
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')

//导航
var nav = {
    init: function () {
        
        this.bindEvent();
        this.loadUserInfo();
        // this.loadCartCount();
        //这里的this指向的就是这个nav对象
        return this;
    },
    bindEvent: function () {
        //登录点击事件
        
        $('.js-login').click(function () {
            // window.location.href = './user-login.html'  不能跳到死页面，要执行doLogin方法
            // alert('登录啦！')
            _myUtil.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html'
        });
        //退出点击事件
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                _myUtil.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo: function () {
        
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function (errMsg) {
            
        });
    },
    //加载购物车数量
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        })
    }
}

module.exports = nav.init();
