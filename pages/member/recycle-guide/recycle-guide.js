import {RecyclingList} from "../../../api/order";

var WxParse = require('../../../wxParse/wxParse.js');

var article;
var that;
Page({
    data: {},
    onLoad: function (options) {
        that = this;
        article = "";
        WxParse.wxParse('article', 'html', article, that,5);
        this.http();
    },
    http:function (params) {
        RecyclingList(params).then(res=>{
            if(res.code===1){
                article=res.data;
                WxParse.wxParse('article', 'html', article, that,5);
            }
            
        });
    }
});
