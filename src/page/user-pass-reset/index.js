

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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.bindEvent();
        this.onLoad();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        //通过用户名获取提示问题的下一步按钮
        $('#submit-username').click(function () {
            var username =$.trim( $('#username').val());
            // 用户名存在
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();

                }, function (errMsg) {
                    formError.show(errMsg);
                })
            // 用户名不存在
            } else {
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题后的下一步
        $('#submit-question').click(function () {
            var answer =$.trim( $('#answer').val());
            if (answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();

                }, function (errMsg) {
                    formError.show(errMsg);
                })
            // answer不存在
            } else {
                formError.show('请输入密码提示问题答案');
            }
        });
        // 输入新密码后的下一步点击
        $('#submit-password').click(function () {
            var password =$.trim( $('#password').val());
            if (password && password.length >=6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset'

                }, function (errMsg) {
                    formError.show(errMsg);
                })
            // 密码为空
            } else {
                formError.show('请输入不少于6位的新密码');
            }
        });
        
    },
    //加载输入用户名的第一步
    loadStepUsername: function () {
        $('.step-username').show();
    },
    //输入提示问题
    loadStepQuestion: function () {
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show()
        .find('.question').text(this.data.question);
    },
    // 输入新密码
    loadStepPassword: function () {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
        
    }
    
};
$(function () {
    page.init();
})
