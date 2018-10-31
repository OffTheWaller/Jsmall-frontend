'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _myUtil = require(('util/myutil.js'))
var _user = require(('service/user-service.js'))
var templateIndex   = require('./index.string');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click','.btn-submit', function () {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res,msg) {
                    _myUtil.successTips(msg);
                    window.location.href = './user-center.html';
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
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _myUtil.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _myUtil.errorTips(errMsg);
        });
    },
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        
        if (!_myUtil.validate(formData.phone,'phone')) {
            result.msg = '手机号格式有误';
            return result;
        }
        if (!_myUtil.validate(formData.email,'email')) {
            result.msg = '邮箱格式有误';
            return result;
        }
        if (!_myUtil.validate(formData.question,'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_myUtil.validate(formData.password,'require')) {
            result.msg = '密码提示问题答案不能为空';
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
