/**
 * @author:js
 */
'use strict'
var _myUtil = require('util/myutil.js')

var _user = {
    //用户登录
    login: function (userInfo, resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查用户名
    checkUsername: function (username, resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //用户注册
    register: function (userInfo, resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查登录状态
    checkLogin: function (resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 获取修改密码提示问题
    getQuestion: function (username, resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    checkAnswer: function (userInfo, resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 重置密码
    resetPassword: function (userInfo, resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户信息
    getUserInfo: function (resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //登出
    logout: function (resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
        
    }
}

module.exports = _user;