// pages/goods-details/goods-details.js
// import Toast from '@vant/weapp/dist/toast/toast';
import {goRouter} from "../../utils/macutils";
import {GoodsDetail} from "../../api/order";

var WxParse = require('../../wxParse/wxParse.js');
var that;
var aData = {
    Id: ""
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],// banner
        info: {
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
        console.log(options.id);
        let id = options.id;
        aData.Id = id;
        that = this;
        // this.addBanner();
        this.HttpGoodDetails(aData);
    },
    addBanner: function (list) {
        let banner = [];
        for(let i=0;i<list.length;i++){
          banner.push(list[i].img);
        }
        // banner.push("../../static/images/testbanner.png");
        this.setData({
            bannerList: banner
        });
    },
    onChange(event) {
        console.log(event.detail);

    },
    // 购物车
    onShopList: function () {

    },
    // 加入购物车
    onJoinShop: function () {
        this.setData({
            show: true
        });
    },
    // 立即购买
    onbuy: function () {
        // this.setData({
        //     show: true
        // });
      let id=this.data.info.id;
      goRouter("/pages/confirm-order/index?type=1&id=" + id);
    },
    okEvent: function (e) {
        this.setData({
            show: false
        });
        let id = e.currentTarget.dataset.id;
        goRouter("/pages/confirm-order/index?type=1&id=" + id);
    },


    onUnload() {

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
    // 商情详情
    HttpGoodDetails: function (params) {
        GoodsDetail(params).then(res => {
            console.log(res);
            if (res.code === 1) {
                let a = {
                    "id": 1,
                    "goods_name": "231231",
                    "img": "https://fg.996sh.com/2312312",
                    "goods_price": "12.30",
                    "gallery": [
                        {
                            "img": "https://fg.996sh.com/2312312"
                        },
                        {
                            "img": "https://fg.996sh.com/2312312"
                        },
                        {
                            "img": "https://fg.996sh.com/2312312"
                        }
                    ],
                    "desc": "123123123",
                    "detail": "1231231",
                    "sale_number": 0
                };
                a=res.data;
                that.addBanner(a.gallery);
                that.setData({
                  info:a
                });

                var article = a.detail;
                WxParse.wxParse('article', 'html', article, that, 5);
            }
        })
    }

})
