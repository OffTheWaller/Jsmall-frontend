/**
 * @author:js
 */
'use strict'
var _myUtil = require('util/myutil.js')

var _cart =  {
    //获取购物车数量
    getCartCount: function (resolve, reject) {
        _myUtil.request({
            url: _myUtil.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    }
}

module.exports = _cart;