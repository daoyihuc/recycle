// pages/goods-category/goods-category.js
import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    scrollTop: 0,
    oldScrollTop: 0,
    con: [],
    current: 0,
    menuHeight: 0,
    menuItemHeight: 0,
    itemId: "",
    menuItemPos: [],
    arr: [],
    scrollRightTop: 0,
    timer: null,
    tabbar: [{
        'cate_name': 1,
        'child':[
          {'cate_name':1,'pic':1}
        ]
      },
      {
        'cate_name': 1,
        'child':[
          {'cate_name':1,'pic':1}
        ]
      }
    ],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    Toast('搜索' + this.data.value);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
