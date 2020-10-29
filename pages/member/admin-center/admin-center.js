// pages/admin-center/admin-center.js
import {goRouter} from "../../../utils/macutils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: "",
    moeny: "",
    tabbarIndex: 1,
    listout: [],
    listin: [],
    showout: !1,
    showin: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList(this.tabbarIndex);
  },

  all: function () {
    wx.redirectTo({
      url: "../admin/admin"
    });
  },
  goDes: function () {
    wx.navigateTo({
      url: "../subscribe/index?type=" + this.info.id
    });
  },
  getMoney: function () {
    var t = this;
    console.log("请求"), this.$api.admin.getmoney({}).then(function (n) {
      console.log(n), t.moeny = n.data.admin_recycle_money;
    });
  },
  change: function (t) {
    this.tabbarIndex = t, this.getList(this.tabbarIndex);
  },
  getList: function (t) {
    var n = this;
    this.$api.admin.moneyLog({
      status: t
    }).then(function (e) {
      console.log("流水列表", e), e.data.data.forEach(function (t) {
        1 === t.money_type && (t.tip = "用户提现"), 2 === t.money_type && (t.tip = "商城消费"),
          3 === t.money_type && (t.tip = "管理层支出"), 4 === t.money_type && (t.tip = "业务员支出"),
          5 === t.money_type && (t.tip = "管理层收入"), 6 === t.money_type && (t.tip = "预约下单收入"),
          7 === t.money_type && (t.tip = "邀请有礼"), 8 === t.money_type && (t.tip = "平台操作"),
          9 === t.money_type && (t.tip = "商城退款");
      }), 2 === t ? (n.listout = e.data.data, 0 === e.data.data.length && (n.showout = !0)) : (n.listin = e.data.data,
        0 === e.data.data.length && (n.showin = !0));
    }).catch(function (t) {
      console.log(t);
    });
  },
  // 界面跳转
  onclick:function (e) {
    let number = e.currentTarget.dataset.number;
    let url="";
    switch (number) {
      case 0:
        url="/pages/member/admin/admin";
        break;
      case 1:
        url="/pages/member/admin-center/admin-center";
        break;
    }
    goRouter(url);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
