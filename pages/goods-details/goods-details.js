// pages/goods-details/goods-details.js
// import Toast from '@vant/weapp/dist/toast/toast';
import {goRouter} from "../../utils/macutils";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],// banner
    info:{
      price: "10.00",
      name: "云南白药牙膏",
      image: "../../static/images/testbanner.png"
    },
    number: 1,
    show: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addBanner();
  },
  addBanner: function () {
    let banner = [];
    banner.push("../../static/images/testbanner.png");
    this.setData({
      bannerList: banner
    });
  },
  onChange(event) {
    console.log(event.detail);

  },
  // 购物车
  onShopList:function(){

  },
  // 加入购物车
  onJoinShop:function(){
    this.setData({
      show: true
    });
  },
  // 立即购买
  onbuy:function(){
    this.setData({
      show: true
    });
  },
  okEvent:function(e){
    this.setData({
      show: false
    });
    let id = e.currentTarget.dataset.id;
    goRouter("/pages/confirm-order/index?id="+id);
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
