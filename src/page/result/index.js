/**
 * @author: js
 */
'use strict'
require('./index.css')
require('page/common/nav-simple/index.js')
var _myUtil = require(('util/myutil.js'))

//result页面的逻辑是通过url传递过来的不同type渲染不同的成功提示
$(function () {
    var type = _myUtil.getUrlParam('type') || 'default';
    $('.'+type+'-success').show();
})
