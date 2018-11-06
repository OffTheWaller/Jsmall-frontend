'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _myUtil = require(('util/myutil.js'))
var _user = require(('service/user-service.js'))

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click','.btn-submit', function () {
            var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                //更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res,msg) {
                    _myUtil.successTips(msg);
                }, function (errMsg) {
                    _myUtil.errorTips(validateResult.msg)
                });
            } else {
                _myUtil.errorTips(validateResult.msg)
            }
        })
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'pass-update'
        });
        
    },
    
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        //验证原密码是否为空
        if (!_myUtil.validate(formData.password,'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        //验证新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6 ) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        //判断两次输入密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
       
        //通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
    
};
$(function () {
    page.init();
})
