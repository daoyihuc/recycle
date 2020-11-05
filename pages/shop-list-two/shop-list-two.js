// pages/shop-list-two/shop-list-two.js
import {GoodsList} from "../../api/order";

var aData = {
    CatId: '',
    Page: '1',
    PageSize: '10',
    OrderBy: "default"
};
var c=[];
var that;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: "",
        goodlist: [{
          image: "",
          price: '',
          name: ""
        }],
        attr: {
            type: ""
        },
        active: 'default'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("daoyi",options.id);
        that=this;
        aData.CatId=options.id;
        aData.OrderBy=this.data.active;
        this.HttpGoodList(aData);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      c=[];
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
      this.HttpGoodList(aData);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onChange(event) {
      this.setData({
        active: event.detail.name
      });
      aData.OrderBy=event.detail.name;
        // wx.showToast({
        //     title: `切换到标签 ${event.detail.name}`,
        //     icon: 'none',
        // });
      aData.Page=1;
      c=[];
      this.HttpGoodList(aData);
    },
  // http
  HttpGoodList:function (params) {
      GoodsList(params).then(res=>{
        console.log(res);
       if(res.code===1){
         for(let i=0;i<res.data.List.length;i++){
           const  a={
             id: '',
             image: "",
             price: '',
             name: ""
           }
           a.id=res.data.List[i].id;
           a.name=res.data.List[i].goods_name;
           a.image=res.data.List[i].img;
           a.price=res.data.List[i].goods_price;
           c.push(a);
         }
         that.setData({
           goodlist: c
         });
         aData.Page+=1;
       }
      });
  }
})
