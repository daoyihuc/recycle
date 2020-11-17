//index.js
//获取应用实例
import {getUserinfo, goRouter, toast,authorize} from "../../utils/macutils";
import {Index, NewList} from "../../api/app";

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
var that;
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
        address: '',
        money: "",
        appointments_num: ""

    },
    onLoad: function (options) {
        console.log(options);

        if(options.scene){
            let scene1= options.scene;
            let scene = decodeURIComponent(options.scene);
            wx.setStorageSync("scene",scene);
            setTimeout(()=>{
                toast("daoyi"+scene);
            },2000);
        }else{
            toast("无参数捕捉")
        }

        that=this;
        // this.addBanner();
        this.addMenu();
        // this.listItem();
        this.isLogin();
        console.log('daoyi',"onload")
        qqmapsdk = new QQMapWX({
            key: 'ORNBZ-U2M3U-VGLV2-2DLG2-SUH7V-5IFPD'
        });
    },
    onReady() {
        console.log('daoyi',"onready")
        this.isLogin();
    },
    onShow(options) {
        this.isLogin();
        console.log('daoyi',"onshow");
        this.http(aNew);
        this.httpIndex();
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
            "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/first18.png",
            "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/first20.png",
            "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/first14.png",
            "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/first1.png"
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

        let pic=wx.getStorageSync("pic");
        let name=wx.getStorageSync("name");
        let money=wx.getStorageSync("money");
        let appointments_num=wx.getStorageSync("appointments_num");
        this.setData({
            avatarUrl: pic,
            appointments_num: appointments_num,
            money: money
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
                url="/pages/subscribe-order/subscribe-order?id=0";
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
                        });
                    },
                    fail: function (res) {
                        console.log(res);
                        // toast("地址获取成功");
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
            console.log('daoyi',res);
            const banners=[];
            const bann=res.data.SlideList;
            // banner 数据清洗
            for(let i=0;i<bann.length;i++){
                const a={
                    content: "",
                    img: "http://fgadmin.996sh.com/uploads/20201109/55a5410c29f3792cb246323fa5b8392c.png",
                    url: "",
                }
                a.content=bann[i].content;
                a.img=bann[i].img;
                a.url=bann[i].url;
                banners.push(a);
            }
            that.setData({
                bannerList: banners
            });
            console.log(banners);
            // 资讯数据清洗
            const newL=[]; // 容器
            const newLists=res.data.NewsList;
            for(let i=0;i<newLists.length;i++){
                const test = {
                    image: "https://cs17.appios.cn/uploads/20200731/3d5cf83e0deee46995454e0976d845df.jpg",
                    name: "端午节|“粽”于等到你",
                    desc: "端午安康！来康康粽叶垃圾分类小科普吧",
                    read: "222",
                    comment: "54",
                    createtime: "2020/07/14",
                    id: 1
                };
                test.id=newLists[i].id;
                test.name=newLists[i].title;
                test.read=newLists[i].read_num;
                test.desc=newLists[i].desc;
                test.image=newLists[i].logo;
                test.createtime=newLists[i].dateline;
                // id: 1
                // title: "1"
                // logo: "https://fg.996sh.com/1"
                // desc: "打完大无大无大无大无大无打完大无大无大无..."
                // read_num: 1
                // dateline: "2009/01/06"
                newL.push(test);
                that.setData({
                    listItem: newL,
                })
            }
            console.log("daoyi",newL);
        })
    }



})
