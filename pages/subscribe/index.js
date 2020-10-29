
import {getLocation, getSetting,goRouter} from '../../utils/macutils'
import {AppointmentShow} from "../../api/app";


var that;
Page({
    data: {
        currentSel: "",
        weightList:[],
        checked: true,
        show: true,
        showcalendar: false,
        showtime: false,
        date: '' , // 日期
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
    }

});
