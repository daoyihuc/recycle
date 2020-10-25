// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    showDel: !1,
    listTab: [{
      iconPath: "../../static/images/home861.png",
      selectedIconPath: "../../static/images/home861.png",
      text: "全部"
    }, {
      iconPath: "home",
      selectedIconPath: "home-fill",
      text: "预约中心"
    }],
    list: [{
      cate_name: "全部"
    }, {
      cate_name: "待服务"
    }, {
      cate_name: "服务中"
    }, {
      cate_name: "已完成"
    }, {
      cate_name: "已取消"
    }],
    currOrder: {},
    current: 0,
    orderlist: [],
    current_page: 1,
    modeType: 0,
    modeCon: ["你确认取消此订单吗", "你确认接受此订单吗", "确定线下支付完成"],
    mode: !1,
    name: "",
    cantext: "",
    height: "",
    h: "",
    active: 1,
    toggle: !0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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