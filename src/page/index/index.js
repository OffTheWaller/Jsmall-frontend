/**
 * @author: js
 */
'use strict';
var _myUtil = require('util/myutil.js')
var html = '<h1>{{msg}}</h1>';
var data = {
    msg: 'hello'
};
console.log(_myUtil.renderHtml(html, data))

