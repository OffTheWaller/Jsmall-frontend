/**
 * @author: js
 */
'use strict';
require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
require('util/slider/index.js')

var templateBanner = require('./banner.string')
var _myUtil = require('util/myutil.js')

$(function () {
    //渲染banner的html
    var bannerHtml = _myUtil.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化slider
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
})



