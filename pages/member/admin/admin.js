// pages/admin/admin.js
import {goRouter} from "../../../utils/macutils";

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
      this.initData();
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    //
    initData:function () {
      const a= {
        address_detail: "湖南省长沙市天心区湘府路马王堆万家丽路光明小区c6栋7单元",
        mobile: "17673850003",
        name: 'daoyi',
        createtime: '2020-10-09',
        order_status: '1',
        _status: "test"
      };
      const b=[];
      for(let i=0;i<3;i++){
        b.push(a);
      }
      this.setData({
        orderlist: b
      });
    },
  // 拨打手机号
    callPhone:function (e) {
      console.log(e);
      let number = e.currentTarget.dataset.number;
      wx.makePhoneCall({
        phoneNumber: number
      })
    },
  // 界面跳转
  onclick:function (e) {
    let number = e.currentTarget.dataset.number;
    let url="";
    switch (number) {
      case 0:
        url="/pages/member/admin/admin";
        break;
      case 1:
        url="/pages/member/admin-center/admin-center";
        break;
    }
    goRouter(url);
  }


})
