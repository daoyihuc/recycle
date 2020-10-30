// pages/subscribe-order-details/subscribe-order-details.js
import {AppintmentDetail} from "../../api/order";


var aData={
  token:"",
  id: ""
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    attr: [],
    cantext: "",
    mode: !1,
    id: "",
    show: false,
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let id=options.id;
    aData.id=id;
    aData.token=wx.getStorageSync("token");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.HttpDetails(aData);
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
  HttpDetails:function (params) {
    AppintmentDetail(params).then(res=>{
      console.log(res)
    });
  },


})
