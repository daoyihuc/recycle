// pages/consult-details/consult-details.js
import {NewDetail} from "../../api/app";

var WxParse = require('../../wxParse/wxParse.js');

var id=""; // 详情id
var that;//上下文对象
var aData={
  id: 1,
  title: "1",
  logo: "https://fg.996sh.com/1",
  content: "1",
  dateline: "2009/01/06",
  read_num: 1
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingText: "加载中...",
        article_id: "",
        info: "",
        conment: [],
        goods: 0,
        is_goods: !1,
        data: [],
        page: 1,
        content: "",
        access_token: "",
        message: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that = this;
        console.log("daoyiOptions",options);
        const a={
          id: options.id
        };
        this.HttpDetails(a);


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

  // 详情获取
  HttpDetails:function (params) {
      NewDetail(params).then(res=>{
        console.log("Newdetails",res);
        const datas=res.data;
        aData.id=datas.id;
        aData.content=datas.content;
        aData.title=datas.title;
        aData.read_num=datas.read_num;
        aData.dateline=datas.dateline;
        that.setData({
          info: aData
        });
        var article = aData.content;
        WxParse.wxParse('article', 'html', article, that, 5);
      });
  }
})
