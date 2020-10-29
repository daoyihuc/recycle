// pages/edit-address/edit-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editID: "",
    edittoggle: "",
    t: !1,
    e: !1,
    shows: {
      a: !1,
      b: !1,
      c: !1
    },
    pcaRanges: {
      province: !0,
      city: !0,
      area: !0
    },
    streetRanges: [],
    commityRanges: [],
    currentData: {
      curPca: {},
      curStr: {},
      curCom: {},
      _curStr: {},
      location: {},
      editItem: {}
    },
    showData: {
      adName: "",
      pca: "",
      street: "",
      commity: "",
      details: "aa",
      user: "bb",
      mobile: "17381586222",
      is_default: !1
    },
    formShow: {},
    formCode: {}
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