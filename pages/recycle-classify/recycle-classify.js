var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {},
    onLoad: function (options) {

        var that = this;
        var article =
         "<p>"+
        "<img src='../../static/images/recycle1.jpg'>"+
        "<img src='../../static/images/recycle2.jpg'>" +
        "<img src='../../static/images/recycle3.jpg'>" +
        "<img src='../../static/images/recycle4.jpg'>" +
        "<img src='../../static/images/recycle5.jpg'>" +
        "<img src='../../static/images/recycle6.jpg'>" +
        "<img src='../../static/images/recycle7.jpg'>" +
        "<img src='../../static/images/recycle8.jpg' data-filename=\"filename\" style=\"width: 1063px;\"><br>" +
        "<\/p>"
        WxParse.wxParse('article', 'html', article, that,5);
    }
});
