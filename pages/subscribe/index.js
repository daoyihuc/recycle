
import {getLocation, getSetting, goRouter, toast} from '../../utils/macutils'
import {AppointmentShow, MakeAnAppointmentNow} from "../../api/app";
import {CategoryList} from "../../api/order"
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
var that;
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
        c_a:0,
        class_value:[
            "纸皮","易拉罐","金属制品","电池回收"
        ],
        Province: "",
        City: "",
        Country:"",
        street: ""
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
        qqmapsdk = new QQMapWX({
            key: 'ORNBZ-U2M3U-VGLV2-2DLG2-SUH7V-5IFPD'
        });
        this.getLocationName();
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
    sel1: function(t) {
        console.log("weight",t.target.dataset.count);
        this.setData({
            c_a: t.target.dataset.count
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
        this.getLocationName();

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
        aData.NowTime=this.data.date; //NowDate NowTime
        aData.NowDate=this.data.currentDate;
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
                        that.getArea(res.result.address);
                        // that.setData({
                        //     address: res.result.address
                        // });
                    },
                    fail: function (res) {
                        console.log(res);
                        // toast("地址获取成功");
                    }
                });
            },
        })
    },
    //省市区截取
    getArea: function(str) {
        let area = {}
        let index11 = 0
        let index1 = str.indexOf("省")
        if (index1 == -1) {
            index11 = str.indexOf("自治区")
            if (index11 != -1) {
                area.Province = str.substring(0, index11 + 3)
            } else {
                area.Province = str.substring(0, 0)
            }
        } else {
            area.Province = str.substring(0, index1 + 1)
        }

        let index2 = str.indexOf("市")
        if (index11 == -1) {
            area.City = str.substring(index11 + 1, index2 + 1)
        } else {
            if (index11 == 0) {
                area.City = str.substring(index1 + 1, index2 + 1)
            } else {
                area.City = str.substring(index11 + 3, index2 + 1)
            }
        }

        let index3 = str.lastIndexOf("区")
        if (index3 == -1) {
            index3 = str.indexOf("县")
            area.Country = str.substring(index2 + 1, index3 + 1)
        } else {
            area.Country = str.substring(index2 + 1, index3 + 1)
        }
        if(index3<str.length){
            area.street = str.substring(index3+1,str.length);
        }
        this.setData({
            Province: area.Province,
            City: area.City,
            Country: area.Country,
            street: area.street
        })
        const a={
            token: wx.getStorageSync("TOKEN"),
            district_name: area.Country
        }
        this.httpClass(a);
        return area;
    },

    httpClass:function (param) {
        CategoryList(param).then(res=>{
            console.log(res);
            const a={
                id: 1,
                image: "http://fgadmin.996sh.com/assets/img/qrcode.png",
                name: "官方新闻",
                NextList: []
            }
            let arr=[];
            let b=6;
            if(res.data.List.length<b){
                b=res.data.List.length;
            }
            for(let i=0;i<b;i++){
                arr.push(res.data.List[i].name);
            }
            that.setData({
                class_value: arr
            })

        })
    }

});
