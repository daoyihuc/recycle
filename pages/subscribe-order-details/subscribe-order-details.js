// pages/subscribe-order-details/subscribe-order-details.js
import {AppintmentDetail} from "../../api/order";


var aData={
  token:"",
  id: ""
}
var that;
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
    that=this;
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
  },


})
