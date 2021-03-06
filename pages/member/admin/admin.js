// pages/admin/admin.js
import {goRouter, toast} from "../../../utils/macutils";
import {AdminAppointmentList, ReceivingOrders, UpdateOrderStatus} from "../../../api/order";

var that;
var aData={
    token: "",
    type: "all",
    Page: 1,
    PageSize: 10
};
var listData=[];
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
        list: [
            {
            cate_name: "全部",
            name: "all"
        }, {
            cate_name: "待服务",
            name: "0"
        }, {
            cate_name: "服务中",
            name: "1"
        }, {
            cate_name: "已完成",
            name: "2"
        }, {
            cate_name: "已取消",
            name: "3"
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
        that=this;
        aData.token=wx.getStorageSync("atoken");
        // this.initData();
        this.HttpAdminAppointmentList(aData);
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
        aData.Page=1;
        this.HttpAdminAppointmentList(aData);
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
  },
    onTabChange(event) {
        let a=event.detail.name;
        aData.type=a;
        aData.Page=1;
        this.HttpAdminAppointmentList(aData);
    },
    // 列表
    HttpAdminAppointmentList:function(params){
        AdminAppointmentList(params).then(res=>{
            console.log(res);
            let a={
                id: "",
                order_sn:"", //编号
                now_time:"", //日期
                now_date:"", // 时间
                order_amount:"",
                total_weight:"",
                admin_status:"",// 1可接单 , 0不可接单
                status:"", //订单状态
                admin_name:"", // 回首员名称
                province:"", // 省
                city:"", //市
                district:"", // 区
                street:"", // 街
                address:"", // 详细地址
                contacts:"", // 客户名称
                mobile:"", //手机
                avatar:"", // 头像
            }
            if(res.code===1){
                for(let i=0;i< res.data.List.length;i++){
                    a=res.data.List[i];
                    listData.push(a);
                }
                that.setData({
                    orderlist: listData
                });
                aData.Page+=1;
            }

        });
    },
    onUnload() {
        aData.Page=1;
        listData=[];
    },
    // 接单
    HttpRecivingOrder:function (params) {
        ReceivingOrders(params).then(res=>{

        });
    },
    // 更改预约订单状态
    HttpUpdateOrderStatus:function (params) {
        UpdateOrderStatus(params).then(res=>{

        });
    },


})
