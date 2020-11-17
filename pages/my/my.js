import {
    getUserinfo,
    goRouter
} from '../../utils/macutils'
import {Mine} from "../../api/order";
import {PHONE} from "../../config/constans";

var that;
var aData={
  token: ""
};
Page({
    data: {
        subscribeList: [{
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home23.png",
            text: "全部预约",
            menuId: 1.1,
            num:""
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home38.png",
            text: "待上门",
            menuId: 1.2,
            num:""
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home42.png",
            text: "已完成",
            menuId: 1.3,
            num:""
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home40.png",
            text: "已取消",
            menuId: 1.4,
            num:""
        }],
        orderList: [
            {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home19.png",
            text: "全部订单",
            menuId: 2.1,
                num:""
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home17.png",
            text: "已发货",
            menuId: 2.2,
                num:""
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home25.png",
            text: "已完成",
            menuId: 2.3,
                num:""
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home22.png",
            text: "已取消",
            menuId: 2.4,
                num:""
        }],
        toolList: [
            {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home4.png",
            text: "回收榜单",
            menuId: 3
        },
        //     {
        //     imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home36.png",
        //     text: "回收分类",
        //     menuId: 4
        // },
            {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home44.png",
            text: "回收指南",
            menuId: 5
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home8.png",
            text: "邀请有礼",
            menuId: 6
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home1.png",
            text: "我的邀请",
            menuId: 7
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home29.png",
            text: "意见反馈",
            menuId: 8
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home14.png",
            text: "扫一扫",
            menuId: 9
        }, //, {
        //     imgUrl: "../../static/images/my_icon_gouwuche@2x.png",
        //     text: "购物车",
        //     menuId: 10
        // },
            {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home6.png",
            text: "客服",
            menuId: 11
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home28.png",
            text: "回收地址",
            menuId: 12
        }, {
            imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home14.png",
            text: "管理员端",
            menuId: 14
        },
            {
                imgUrl: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.2/home9.png",
                text: "门店推广",
                menuId: 17
            }

        ],
        isLogin: false,
        avatar: "",
        nickname: "",
        id: "",
        money: "", //环保金额
        appointments_num: "", // 回收次数
        ranking:"",
        integral: '',// 积分
        AllAppointmentOrder:"",
        WaitServerOrder:"",
        FinishedAppointmentOrder:"",
        CancelAppointmentOrder:"",
        AllOrder:"",
        WaitGetOrder:"",
        FinishedOrder:"",
        CancelOrder:"",

    },
    onLoad: function (options) {

        that=this;
        // this.HttpMine(aData);
    },
    onShow() {
        aData.token=wx.getStorageSync("token");
        this.isLogin();
        this.HttpMine(aData);
    },
    onClick: function (event) {
        console.log(event.target.dataset.menuid);
        let url;
        switch (event.target.dataset.menuid) {
            case 1.1: // yuyeu all
                url = "/pages/subscribe-order/subscribe-order?id=0"; // 全部
                break;
            case 1.2:
                url = "/pages/subscribe-order/subscribe-order?id=1";// 待服務
                break;
            case 1.3:
                url = "/pages/subscribe-order/subscribe-order?id=3";// 已完成
                break;
            case 1.4:
                url = "/pages/subscribe-order/subscribe-order?id=4";// 已取消
                break;
            case 2.1: // 我的订单
                url = "/pages/member/my-order/my-order?type=all"; //全部
                break;
            case 2.2:
                url = "/pages/member/my-order/my-order?type=1"; // 发货
                break;
            case 2.3:
                url = "/pages/member/my-order/my-order?type=2"; //完层
                break;
            case 2.4:
                url = "/pages/member/my-order/my-order?type=3"; // 取消
                break
            case 3: // 回收榜单
                url = "/pages/member/rank/rank";
                break;
            case 4: // 回收分类
                url = "/pages/member/recycle-classify/recycle-classify"
                break
            case 5: // 回收指南
                url = "/pages/member/recycle-guide/recycle-guide"
                break
            case 6: // 邀请有礼
                url = "/pages/member/invite/invite";
                break
            case 7: // 我的邀请
                url = "/pages/member/my-invite/my-invite";
                break
            case 8: // 意见反馈
                url = "/pages/member/options/options";
                break
            case 9: // 扫一扫
                wx.scanCode({
                    success(res) {
                        console.log("scancode:"+JSON.stringify(res));
                    }
                });
                break
            case 11: // 客服
                // 拨打手机号
                    let number = PHONE;
                    wx.makePhoneCall({
                        phoneNumber: number
                    })
                break;
            case 12: // 回收地址
                url = "/pages/member/address/address";
                break
            case 14: // 管理员端
                if(!wx.getStorageSync("atoken")){
                    url = "/pages/member/admin-login/admin-login";
                }else{
                    url= "/pages/member/admins/admins";
                }

                break
            case 15: // 提现
                url = "/pages/withdrawal/withdrawal";
                break;
            case 16: // 明细
                url = "/pages/subsidiary/subsidiary";
                break;

        }
        goRouter(url);
    },
    // 判断当前是否已经登录
    isLogin:function () {
        let storageSync = wx.getStorageSync('islogin');
        console.log("是否登录",storageSync===null);
        if(storageSync){
            this.getUserinfo();
            this.setData({
                isLogin:storageSync
            })
        }
    },
    // 获取用户信息
    getUserinfo(){
        let pic=wx.getStorageSync("pic");
        let name=wx.getStorageSync("name");
        let ranking=wx.getStorageSync("ranking");
        let integral=wx.getStorageSync("integral"); // 积分
        this.setData({
            avatar: pic,
            nickname: name,
            ranking:ranking,
            integral:integral
        });
    },
    // 我的
    HttpMine:function (params) {
        Mine(params).then(res=>{
            console.log(res);
            if(res.code===1){
                let a={
                    id: "",
                    nickname: "",
                    avatar: "",
                    money: "",
                    appointments_num: "",
                    ranking:"",
                    integral:"",
                    AppointmentOrder:{
                        AllAppointmentOrder:"",
                        WaitServerOrder:"",
                        FinishedAppointmentOrder:"",
                        CancelAppointmentOrder:"",
                    },
                    ShopOrder:{
                        AllOrder:"",
                        WaitGetOrder:"",
                        FinishedOrder:"",
                        CancelOrder:"",
                    },

                };
                a=res.data;
                wx.setStorageSync("id",a.id);
                wx.setStorageSync("pic",a.avatar);
                wx.setStorageSync("name",a.nickname);
                wx.setStorageSync("money",a.money);
                wx.setStorageSync("appointments_num",a.appointments_num);
                wx.setStorageSync("ranking",a.ranking);
                wx.setStorageSync("integral",a.integral); // 积分

                var b=that.data.subscribeList;
                b[0].num=a.AppointmentOrder.AllAppointmentOrder;
                b[1].num=a.AppointmentOrder.WaitServerOrder;
                b[2].num=a.AppointmentOrder.FinishedAppointmentOrder;
                b[3].num=a.AppointmentOrder.CancelAppointmentOrder;

                var d=that.data.orderList;
                d[0].num=a.ShopOrder.AllOrder;
                d[1].num=a.ShopOrder.WaitGetOrder;
                d[2].num=a.ShopOrder.FinishedOrder;
                d[3].num=a.ShopOrder.CancelOrder;

                that.setData({
                    avatar: a.avatar,
                    nickname: a.nickname,
                    id: a.id,
                    money: a.money,
                    appointments_num: a.appointments_num,
                    ranking:a.ranking,
                    integral:a.integral,
                    AllAppointmentOrder:a.AppointmentOrder.AllAppointmentOrder,
                    WaitServerOrder:a.AppointmentOrder.WaitServerOrder,
                    FinishedAppointmentOrder:a.AppointmentOrder.FinishedAppointmentOrder,
                    CancelAppointmentOrder:a.AppointmentOrder.CancelAppointmentOrder,
                    AllOrder:a.ShopOrder.AllOrder,
                    WaitGetOrder:a.ShopOrder.WaitGetOrder,
                    FinishedOrder:a.ShopOrder.FinishedOrder,
                    CancelOrder:a.ShopOrder.CancelOrder,
                    subscribeList: b,
                    orderList: d
                });
                console.log(that.data.subscribeList);

            }
        });
    }
});
