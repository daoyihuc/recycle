import {Mine, Withdrawal} from "../../api/order";
import {back, goRouter, toast} from "../../utils/macutils";
import {PHONE} from "../../config/constans";


var that;
var aData={
    token: ""
};
var aData2={
    token:"",
    money:"",
    real_name:"",
    nickname: ""
}
Page({
    data: {
        avatar: "",
        nickname: "",
        id: "",
        money: "",
        appointments_num: "",
        price: "",
        price1: "",
        real_name:""
    },
    onLoad: function (options) {
        aData.token=wx.getStorageSync("token");
        aData2.token=wx.getStorageSync("token");
        that=this;
        this.HttpMine(aData);
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
                };
                a=res.data;
                that.setData({
                    avatar: a.avatar,
                    nickname: a.nickname,
                    id: a.id,
                    money: a.money,
                    appointments_num: a.appointments_num,
                });
            }
        });
    },
    // 金额
    onPrice(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        let a=event.detail+".00";
        this.setData({
            price: event.detail,
            price1: a
        });
        aData2.money=event.detail;
    },
    // 全部体现
    allWith:function () {
        this.setData({
            price: this.data.money,
        });
        aData2.money=this.data.money;
    },
    // 姓名
    realName:function (event) {
        this.setData({
            real_name: event.detail,
        });
        aData2.real_name=event.detail;
    },
    sumbit:function(){
        aData2.nickname=this.data.nickname;
        this.HttpWithdrawal(aData2);
    },
    // 体现
    HttpWithdrawal:function (params) {
        Withdrawal(params).then(res=>{
            toast(res.msg,1);
            if(res.code===1){
                back(1);
            }
        });
    },
    onClick: function (event) {
        console.log(event.target.dataset.menuid);
        let url;
        switch (event.target.dataset.menuid) {

            case 16: // 明细
                url = "/pages/subsidiary/subsidiary";
                break;

        }
        goRouter(url);
    },
    subscribeMessage1:function() {
        //需要订阅的消息模板，在微信公众平台手动配置获取模板ID
        let message = [];
        message = ["_YYhl1CBHLu_eETqA2M9KJBGmeHjn3LTFLIBeNSQKWQ"];
        //如果总是拒绝（subscriptionsSetting，2.10.1库才支持）
        // if (this.versionCompare('2.10.1')) {
        wx.getSetting({
            withSubscriptions: true,//是否同时获取用户订阅消息的订阅状态，默认不获取
            success: (res) => {
                console.log(res)
                if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings &&
                    res.subscriptionsSetting.itemSettings[message[0]] == "reject") {
                    //打开设置去设置
                    this.openConfirm('检测到您没打开推送权限，是否去设置打开？')
                } else {
                    wx.requestSubscribeMessage({
                        tmplIds: message,
                        success: (res) => {
                            if (res[message[0]] == 'accept') {
                                //用户允许
                            }
                        },
                        fail: (res) => {
                            console.info(res)
                        },
                        complete: (res) =>{
                            that.sumbit();
                        }
                    })
                }
            }
        })
        // } else if (this.versionCompare('2.4.4')) {
        //     wx.requestSubscribeMessage({
        //         tmplIds: message,
        //         success: (res) => {
        //             if (res[message[0]] == 'accept') {
        //                 //用户允许
        //             }
        //         },
        //         fail: (res) => {
        //             console.info(res)
        //         },
        //     })
        // }
    },
//打开设置
    openConfirm: function (message) {
        wx.showModal({
            content: message,
            confirmText: "确认",
            cancelText: "取消",
            success: (res) => {
                //点击“确认”时打开设置页面
                if (res.confirm) {
                    wx.openSetting({
                        success: (res) => {
                            console.log(res.authSetting)
                        },
                        fail: (error) => {
                            console.log(error)
                        },
                        complete: (res) =>{
                            that.sumbit();
                        }
                    })
                } else {
                    console.log('用户点击取消')
                }
            }
        });
    },
//基础库版本比较
    versionCompare(v) {
        const version = wx.getSystemInfoSync().SDKVersion
        if (this.compareVersion(version, v) >= 0) {
            return true
        } else {
            return false
        }
    },

});
