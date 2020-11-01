// pages/subsidiary/subsidiary.js

import {AmountDetails} from "../../api/order";

var aData={
  token: "",
  type: 0,
  Page: 1,
  PageSize: 10
};
var that;
var ListData=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarIndex: 1,
    listout: [
      { 'tip': '平台交易', 'createtime': '2020-09-24', 'memo': "da", 'money': 10.00 },
      { 'tip': '平台交易', 'createtime': '2020-09-24', 'memo': "da", 'money': 10.00 },
      { 'tip': '平台交易', 'createtime': '2020-09-24', 'memo': "da", 'money': 10.00 },
      { 'tip': '平台交易', 'createtime': '2020-09-24', 'memo': "da", 'money': 10.00 }

    ],
    listin: [
      { 'tip': '平台交易', 'createtime': '2020-09-24', 'memo': "da",'money':10.00}
    ],
    income:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    that=this;
    aData.token=wx.getStorageSync("token");
    this.HttpAmountDetails(aData);
  },
  // tabChange
  liclick:function(e){
    let z = e.currentTarget.dataset.index;
    console.log(z);
    this.setData({
      tabbarIndex:z
    });
    switch (z) {
      case "1":
        aData.type=0;
        break
      case "2":
        aData.type=1;
        break
    }
    aData.Page=1;
    ListData=[];
    this.HttpAmountDetails(aData);

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 明细
  HttpAmountDetails:function (params) {
    AmountDetails(params).then(res=>{
      console.log(res);
      let a={
        id: "2",
        change_money: "30.00",
        remark: "不知道不知道",
        dateline: "2020-36-65",
        title: "回收"
      }
      if(res.code===1){
        for(let i=0;i<res.data.List.length;i++){
          ListData.push(res.data.List[i]);
        }
        // ListData.push(a);
        that.setData({
          income: ListData
        });
      }



    });
  }

})
