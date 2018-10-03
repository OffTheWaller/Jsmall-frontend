/**
 * @author: js
 */
'use strict';
var _myUtil = require('util/myutil.js')
_myUtil.request({
    url: '/product/list.do?keyword=1',
    success: function (res) {
        console.log(res.list)
    },
    error: function (errMsg) {
        console.log(errMsg)
    }
})