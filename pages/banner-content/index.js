var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {},
    onLoad: function (options) {


        var that = this;
        var article =
            "<p>"+
            "<img src='../../../static/images/recycle1.png'>"+
            "<img src='../../../static/images/recycle2.png'>" +
            "<img src='../../../static/images/recycle3.png'>" +
            "<img src='../../../static/images/recycle4.png'>" +
            "<img src='../../../static/images/recycle5.png'>" +
            "<img src='../../../static/images/recycle6.png'>" +
            "<img src='../../../static/images/recycle7.png'>" +
            "<img src='../../../static/images/recycle8.png' data-filename=\"filename\" style=\"width: 1063px;\"><br>" +
            "<\/p>"
        article=options.content;
        WxParse.wxParse('article', 'html', article, that,5);
    }
});
