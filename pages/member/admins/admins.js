// pages/admin/admin.js
import {goRouter, toast} from "../../../utils/macutils";
import {AdminAppointmentList, AdminCategoryList, ReceivingOrders, UpdateOrderStatus} from "../../../api/order";


// 引入SDK核心类
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var that;
var aData1={
    token: "",
    type: "all",
    Page: 1,
    PageSize: 10
};
var count;
var listData=[];
var aData2={
    token: "",
    id: ''
};
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
                cate_name: "抢单大厅",
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
        activeB: 0,
        toggle: !0,
        latitude: '',
        longitude: '',
        icon: {
            normal: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-81@2x.png',
            active: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-82@2x.png',
        },
        icon1: {
            normal: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-84@2x.png',
            active: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-83@2x.png',
        },
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        that=this;
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
        listData=[];
        console.log(wx.getStorageSync("atoken"));
        aData1.token=wx.getStorageSync("atoken");
        aData2.token=wx.getStorageSync("atoken");
        console.log(aData1);
        // this.initData();
        this.HttpAdminAppointmentList(aData1);
    },
    onHide() {
        aData1.Page=1;
        listData=[];
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (aData1.Page <= count) {
            this.HttpAdminAppointmentList(aData1);
        } else {
            toast("没有更多数据了",1);
        }
    }
    ,
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
        let number = e.detail;
        let url="";
        switch (number) {
            case 0:
                url="/pages/member/admins/admins";
                break;
            case 1:
                url="/pages/member/admin-center/admin-center";
                break;
        }
        goRouter(url);
    },
    onTabChange(event) {
        let a=event.detail.name;
        aData1.type=a;
        aData1.Page=1;
        listData=[];
        this.HttpAdminAppointmentList(aData1);
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
                aData1.Page+=1;
                count=res.data.Pageinate.Pages;
            }

        });
    },
    onUnload() {
        aData1.Page=1;
        listData=[];
    },
    // 接单事件
    ReceveEvent:function(e){
        let id=e.currentTarget.dataset.id;
        aData2.id=id;
        this.HttpRecivingOrder(aData2);
    },
    // 接单
    HttpRecivingOrder:function (params) {
        ReceivingOrders(params).then(res=>{
            console.log(res);
            if(res.code===1){
                toast(res.msg,1);
                aData1.Page=1;
                listData=[];
                toast(res.msg,0);
                this.HttpAdminAppointmentList(aData1);
            }
        });
    },
    // 前往回收
    goEvent:function(e){
        let id=e.currentTarget.dataset.id;
        aData2.id=id;
        this.HttpUpdateOrderStatus(aData2);
    },
    // 更改预约订单状态
    HttpUpdateOrderStatus:function (params) {
        UpdateOrderStatus(params).then(res=>{
            if(res.code===1){
                toast(res.msg,1);
                aData1.Page=1;
                listData=[];
                this.HttpAdminAppointmentList(aData1);
            }
        });
    },
    // 查看详情
    goDetails:function (e) {
        let id=e.currentTarget.dataset.id;
        goRouter("/pages/member/admin-details/admin-details?id="+id);
    },
    // 称重
    WeighingEvent:function (e) {
        let id=e.currentTarget.dataset.id;
        goRouter("/pages/member/pay/pay?id="+id);
    },
    mapNavigation(e) {
        // console.log(e)
        console.log(e.target.dataset.addr);
        var addr = e.target.dataset.addr;

        // 使用 JavaScript SDK 获取目的地经纬度
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'ORNBZ-U2M3U-VGLV2-2DLG2-SUH7V-5IFPD'
        });
        qqmapsdk.geocoder({
            address: addr,
            success: function (res) {
                console.log(res);
                var local = res.result.location;
                that.setData({
                    latitude: local.lat,
                    longitude: local.lng
                })
            }
        });
        // 使用微信内置地图查看位置
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                wx.openLocation({
                    latitude: that.data.latitude,
                    longitude: that.data.longitude,
                    scale: 28,
                    name: addr, //打开后显示的地址名称
                })
            }
        });
    }
})
