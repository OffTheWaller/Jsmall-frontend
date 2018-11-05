/**
 * @author: js
 */
'use strict'
require('./index.css')

var _myUtil = require('util/myutil.js')


//通用页面头部
var header = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        // 搜索信息的回填
        var keyword = _myUtil.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword)
        };
    },
    bindEvent: function () {
        //提交
        var _this = this;
        //点击搜索按钮提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //输入回车后提交
        $('#search-input').keyup(function (e) {
            // 13是回车键的keyCode
            if (e.keyCode == 13) {
                _this.searchSubmit();
            }
        })
    },
    //搜索提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _myUtil.goHome();
        }
    }

}

header.init();
