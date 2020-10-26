
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {},
    onLoad: function (options) {
        var that = this;
        var article = "<p style='text-align: center'>回收指南<img src=\"https:\/\/cs17.appios.cn\/uploads\/20200731\/500ec6273fa3b82a41a9b8889da2c491.jpg\" style=\"width: 470px;\"><\/p>";
        WxParse.wxParse('article', 'html', article, that,5);
    }
});
