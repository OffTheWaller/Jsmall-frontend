

require('./index.css')
require('page/common/nav-simple/index.js')
var _myUtil = require(('util/myutil.js'))
var _user = require(('service/user-service.js'))

//表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide();
    }
}

//登录页面js代码，搭架子
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //点击登录按钮
        $('#submit').click(function () {
            _this.submit();
        });
        //按下回车也进行提交
        $('.user-content').keyup(function (e) {
            if (e.keyCode == 13) {
                _this.submit();
            }
        })
    },
    //提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            //提交
            _user.login(formData, function (res) {
                window.location.href = _myUtil.getUrlParam('redirect') || './index.html';
                // console.log(res)
            }, function (errMsg) {
                formError.show(errMsg)
            });
        } else {
            //验证失败错误提示
            formError.show(validateResult.msg)
        }
    },
    //表单验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_myUtil.validate(formData.username,'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_myUtil.validate(formData.password,'require')) {
            result.msg = '密码不能为空';
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
