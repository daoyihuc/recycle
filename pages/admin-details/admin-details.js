// pages/admin-details/admin-details.js
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
    var a = this;
    wx.showLoading({
      title: ""
    }), this.$api.admin.getorderdetail({
      sn: n.sn
    }).then(function (n) {
      wx.hideLoading(), 1 === n.data.pay_type && (n.data._status = "环保金"), 2 === n.data.pay_type && (n.data._status = "线下支付"),
        0 === n.data.pay_status && (n.data._status = "未支付"), a.info = n.data, console.log(a.info);
    });
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