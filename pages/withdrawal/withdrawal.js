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

});
