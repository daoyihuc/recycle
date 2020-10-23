// pages/subsidiary/subsidiary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbarIndex: 1,
    listout: [
      { 'tip': 1, 'createtime': 1, 'memo': 1,'money':1},
      { 'tip': 1, 'createtime': 1, 'memo': 1, 'money': 1 },
      { 'tip': 1, 'createtime': 1, 'memo': 1, 'money': 1 },
      { 'tip': 1, 'createtime': 1, 'memo': 1,'money':1}
    ],
    listin: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getList(this.tabbarIndex);
  },

  getList: function (t) {
    var n = this;
    this.$api.basics.professional({
      status: t
    }).then(function (e) {
      console.log(e), e.data.data.forEach(function (t) {
        1 === t.money_type && (t.tip = "用户提现"), 2 === t.money_type && (t.tip = "商城消费"),
          3 === t.money_type && (t.tip = "管理层支出"), 4 === t.money_type && (t.tip = "业务员支出"),
          5 === t.money_type && (t.tip = "管理层收入"), 6 === t.money_type && (t.tip = "预约下单收入"),
          7 === t.money_type && (t.tip = "邀请有礼"), 8 === t.money_type && (t.tip = "平台操作"),
          9 === t.money_type && (t.tip = "商城退款");
      }), 2 === t ? n.listout = e.data.data : n.listin = e.data.data;
    }).catch(function (t) {
      console.log(t);
    });
  },
  change: function (t) {
    this.tabbarIndex = t, this.getList(this.tabbarIndex);
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