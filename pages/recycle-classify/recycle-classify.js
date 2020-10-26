var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {},
    onLoad: function (options) {

        var that = this;
        var article = "<div style='color: red;text-align: center'>你好啊,我的世界</div>";
        WxParse.wxParse('article', 'html', article, that,5);
    }
});
