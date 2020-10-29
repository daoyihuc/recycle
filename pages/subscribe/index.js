
import {getLocation, getSetting, goRouter, toast} from '../../utils/macutils'
import {AppointmentShow, MakeAnAppointmentNow} from "../../api/app";

var app=getApp();
var that;
var aData={
    token:"",
    Weight: "", // 重量选择
    NowTime: "",// 时间
    NowDate:"", // 日期
    AddressId:"", // 地址id
}
Page({
    data: {
        currentSel: -1,// 重量index
        weightList:[], // 重量数组
        checked: true, // 免责协议 勾选
        show: true,
        showcalendar: false,
        showtime: false,
        date: '' , // 日期
        address: "", // 地址显示
        address_id:"", // 地址id
        formatter(type, value) {
            if (type === 'hour') {
                return `${value}点`;
            } else if (type === 'minute') {
                return `${value}分`;
            }
            return value;
        },
        currentDate: '12:00',// 当前时间
        Weight: '',// 体重选择
    },
    onLoad: function (options) {
        console.log("subscribe",options);
        that=this;//上下文对象
        this.addWeightList();
        getSetting(false).then(res => {
            console.log(res);
        });
        getLocation(false).then(value => {
            if(value!==0x12){
                const show=false;
                this.setData({
                    show: show
                })
            }
            console.log(value);
        });

        this.Httpinfo();

    },
    onShow() {
        const address=app.globalData.address;
        const address_id=app.globalData.address_id;
        this.setData({
            address: address,
            address_id:address_id,
        });
        app.globalData.address="";
        app.globalData.address_id="";
    },
    sel: function(t) {
        console.log("weight",t.target.dataset.count);
        this.setData({
            currentSel: t.target.dataset.count
        });
    },
    addWeightList:function () {

        const as=[];
        for (let i=0;i<4;i++){
            const ad="100-285kg";
            as.push(ad);
        }
        this.setData({
            weightList: as
        })
    },
    // 免责条款勾选
    onChange(event) {
        this.setData({
            checked: event.detail,
        });
        console.log("是否勾选",this.data.checked);
    },
    openLocation: function (event) {
        getLocation().then(res => {
            console.log(res);
        });

    },

    getUserInfo(event) {
        console.log(event.detail);
    },

    // 时间关闭
    onClose() {
        this.setData({ close: false });
    },
    // 日期关闭
    onCloseClaendar() {
        this.setData({ showcalendar: false });
    },
    // 关闭时间选择
    onCloseTime() {
        this.setData({ showtime: false });
    },
    // 代开时期选择
    opencalendar:function(){
        this.setData({
            showcalendar: true
        })
    },
    // 日期格式化
    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    // 日期确认
    onConfirm(event) {
        console.log(event);
        this.setData({
            showcalendar: false,
            date: this.formatDate(event.detail),
        });
    },
    // 时间选择
    onConfirm_Time(event) {
        this.setData({
            currentDate: event.detail,
            showtime: false
        });
    },
    // 打开时间
    openTime:function () {
        this.setData({
            showtime: true,
        });
    },
    //  选择地址
    selectAddress:function(){
        goRouter('/pages/member/address/address')
    },
    // 信息展示
    Httpinfo:function (params) {
        AppointmentShow(params).then(res=>{
            console.log(res);
            // WeightRange {id: 1, weight: "20.00-50.00kg"}
            const datas1=res.data.WeightRange;//重量列表
            const dataContent=res.data.ExemptionClause;// 免责协议
            that.setData({
                weightList: datas1,
                Disclaimer: dataContent
            });
        });
    },
    // 立即预约
    HttpSubscriber:function (params) {
        MakeAnAppointmentNow(params).then(res=>{
            if(res.code==1){
                console.log("开始清除数据");
                toast(res.msg,0);
                that.clearData();
            }else{
                toast(res.msg,1);
            }
        })
    },
    sumbitEvent:function () {
        console.log(this.data.currentSel);
        aData.token=wx.getStorageSync("token");
        aData.NowDate=this.data.date;
        aData.NowTime=this.data.currentDate;
        aData.AddressId=this.data.address_id;
        if(aData.token===""){
            toast("请前往登录",1);
        }else if(this.data.currentSel===-1){
            toast("请选择重量",1);
        }else if(aData.NowDate===""){
            toast("请选择日期",1);
        }
        else if(aData.NowTime===""){
            toast("请选择时间",1);
        }else if(aData.AddressId===""){
            toast("请选择地址",1);
        }else{
            aData.Weight=this.data.weightList[this.data.currentSel].id;
            this.HttpSubscriber(aData);
        }

    },
    clearData:function () {
        that.setData({
            currentSel: -1,// 重量index
            checked: true, // 免责协议 勾选
            date: '' , // 日期
            address: "", // 地址显示
            address_id:"", // 地址id
            currentDate: '12:00',// 当前时间
            Weight: '',// 体重选择
        });
    }

});
