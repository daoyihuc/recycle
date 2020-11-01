// pages/admin-details/admin-details.js

import {AdminAppointmentDetail} from "../../../api/order";

var aData={
  token: "",
  id: ''
};
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    attr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    that=this;
    aData.token=wx.getStorageSync("atoken");
    aData.id=id;
    this.HttpAdminAppointmentDetail(aData);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 获取订单详情
  HttpAdminAppointmentDetail:function (params) {
    AdminAppointmentDetail(params).then(res=>{
      console.log(res);
      let a={
        AdminInfo: "yanwen",
        Detail: [{
          goods_weight: "2.00",
          name: "微信公众号",
          price: "1.00",
          total_price: "2.00",
        }],
        address: "湖南省长沙市芙蓉区远大一路721号58",
        dateline: "2020-11-01 11:24:44",
        mobile: "18673497779",
        order_amount: "0.00",
        order_sn: "JB010108441002382",
        pay_id: 0,
        total_weight: "0.00",
      };
      if(res.code===1){
        a=res.data;
        that.setData({
          info: a
        })
      }
    });
  }

})
