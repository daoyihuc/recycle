//index.js
//获取应用实例
import {getUserinfo, goRouter, toast,authorize} from "../../utils/macutils";
import {Index, NewList} from "../../api/app";

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
var that='';
var aNew={
    Page: 1,
    PageSize: 5,
    type: "0"

};
var aIndex={

}
Page({
    data: {
        bannerList: [],// banner
        menuList: [],//菜单
        listItem: [],
        isLogin: false,
        avatarUrl: "",
        address: ''

    },
    onLoad: function () {
        that=this;
        this.addBanner();
        this.addMenu();
        this.listItem();
        this.isLogin();
        console.log('daoyi',"onload")
        qqmapsdk = new QQMapWX({
            key: 'ORNBZ-U2M3U-VGLV2-2DLG2-SUH7V-5IFPD'
        });
        this.http(aNew);
        this.httpIndex();
    },
    onReady() {
        console.log('daoyi',"onready")
        this.isLogin();
    },
    onShow() {
        this.isLogin();
        console.log('daoyi',"onshow")
    },
    addBanner: function () {
        let banner = [];
        banner.push("../../static/images/testbanner.png");
        that.setData({
            bannerList: banner
        });
    },
    addMenu: function () {
        const menuLists = [];
        const a = [
            "../../static/images/yaoqing_daoyi.png",
            "../../static/images/dingdanyuyue_daoyi.png",
            "../../static/images/huanbaodaoyi.png",
            "../../static/images/huishoudaoyi.png"
        ];
        const b = [
            "邀请有礼",
            "预约订单",
            "环保商城",
            "回收指南"
        ];
        const c=[0,1,2,3]
        for (let i = 0; i < a.length; i++) {
            const menu = {}
            menu.logo = a[i];
            menu.name = b[i];
            menu.id = c[i];
            menuLists.push(menu);
        }


        this.setData({
            menuList: menuLists
        })
    },
    // 测试
    listItem: function () {
        const test = {
            image: "https://cs17.appios.cn/uploads/20200731/3d5cf83e0deee46995454e0976d845df.jpg",
            name: "端午节|“粽”于等到你",
            desc: "端午安康！来康康粽叶垃圾分类小科普吧",
            read: "222",
            comment: "54",
            createtime: "2020/07/14",
            id: 1
        }
        const list = [];
        list.push(test);
        this.setData({
            listItem: list
        })
        console.log(list);
    },

    // 登录
    goLogin: function () {
        goRouter("/pages/login/login")
    },
    // 判断当前是否已经登录
    isLogin:function () {
        let storageSync = wx.getStorageSync('islogin');
        console.log("是否登录",storageSync===null);

        if(storageSync){
            this.getUserinfos();
            this.getLocationName();
            this.setData({
                isLogin:storageSync
            });
        }
    },
    // 获取用户信息
    getUserinfos(){

        let pic=wx.getStorageSync("pic",pic);
        let name=wx.getStorageSync("name",name);
        this.setData({
            avatarUrl: pic,

        });
    },
    // click
    onclick:function (e) {
        console.log(e);
        let index = e.currentTarget.dataset.index;
        let url="";
        switch (index) {
            case 0: // 邀请有礼物
                url="/pages/member/invite/invite"
                goRouter(url);
                break;
            case 1: // 我的预约订单
                url="/pages/subscribe-order/subscribe-order?tabarIndex=all";
                goRouter(url);
                break;
            case 2: // 商城
                url="../shop/shop";
                wx.switchTab({
                    url: url,
                })
                break;
            case 3: // 回收指南
                url="/pages/member/recycle-guide/recycle-guide";
                goRouter(url);
                break;
            case 4: // 回收分类
                url="/pages/member/recycle-classify/recycle-classify";
                goRouter(url);
                break;
            case 5: // 我的榜单
                url="/pages/member/rank/rank";
                goRouter(url);
                break;
            case 6: // 上门回首
                url="/pages/subscribe/index";
                wx.switchTab({
                    url: url
                })
                break;
        }

    },
    // 获取位置
    getLocationName:function () {
        wx.getLocation({
            success: function(res) {
                console.log(res)

                // 调用sdk接口
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (res) {
                        //获取当前地址成功
                        console.log(res.result.address);
                        that.setData({
                            address: res.result.address
                        })
                    },
                    fail: function (res) {
                        console.log(res);
                        toast("地址获取成功");
                    }
                });
            },
        })
    },
    // 查看更多资讯
    goMore:function () {
        wx.switchTab({
            url: "/pages/consult/index"
        })
    },
    // 资讯列表
    http:function (params) {
        let dataArr=[];
        NewList(params).then(res=>{
            console.log(res);
            const list=res.List;
            for(let i=0;i<list.length;i++){
                let data={
                    id: '',
                    title: '',
                    desc: '',
                    logo: '',
                    read_num: '',
                    dateline: ''
                };
                data.id=list[i].id; // id
                data.title=list[i].title;// 标题
                data.desc=list[i].desc;// 说明
                data.read_num=list[i].read_num; // 阅读数量
                data.dateline=list[i].dateline;// 创建时间
                dataArr.push(data);
            }
        });
    },
    httpIndex:function (params) {
        Index(params).then(res=>{
            console.log(res);
        })
    }



})
