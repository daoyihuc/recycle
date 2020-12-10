import {goRouter, toast} from "../../utils/macutils";
import {PHONE} from "../../config/constans";
import {GetStoreAddress} from "../../api/order";
import {MakeAnAppointmentNow} from "../../api/app";

var aData = {
    token: wx.getStorageSync('token'),
    id: ""
};
var aData2 = {
    token: wx.getStorageSync("token"),
    Weight: "", // 重量选择
    NowTime: "",// 时间
    NowDate: "", // 日期
    AddressId: "", // 地址id
    address_type: "1"

}
var value = {};
var that;
Page({
    data: {
        img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/mendian-5@2x.png",
        id: 1, // 1.下单 2.取消订单
        show: false,
        vas: {}
    },
    onLoad: function (options) {
        that = this;
        console.log(options.id);
        aData.id = options.id;
        aData2.AddressId = options.id;
        aData2.NowTime=this.dateFormat("YYYY-mm-dd",new Date());
        aData2.NowDate=this.dateFormat("HH:MM",new Date());
        console.log(aData2.NowDate);
        console.log(aData2.NowTime);
        this.httpInfo(aData);
    },
    down_order: function (e) {
        if (e.currentTarget.dataset.id === 1) {
            this.setData({


            });
            this.HttpSubscriber(aData2);
        } else {
            this.setData({
                img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/mendian-5@2x.png",
                id: 1
            })
        }

    },
    onclick: function (e) {
        switch (e.currentTarget.dataset.id) {
            case 1: // 我的
                wx.switchTab({url: "/pages/my/my"})
                break;
            case 2: // 客服
                let number = PHONE;
                wx.makePhoneCall({
                    phoneNumber: number
                });
                break;
        }
    },
    close: function () {
        this.setData({
            show: false
        })
    },
    httpInfo: function (params) {
        GetStoreAddress(params).then(res => {
            let a = {
                connect_name: null,
                store_address: "，您",
                store_city: "长沙市",
                store_district: "芙蓉区",
                store_img: "http://fgadmin.996sh.com/uploads/20201119/b50f09d09bf8df590c87b4a5c3bf0da3.jpg",
                store_mobile: "18673497779",
                store_name: "道翼",
                store_province: "湖南省",
                store_street: "地铁2号线,地铁5号线",
                type: null
            }
            a = res.data;
            that.setData({
                vas: a
            })

            console.log(res);
        })
    },
    // 立即预约
    HttpSubscriber: function (params) {
        MakeAnAppointmentNow(params).then(res => {
            if (res.code == 1) {
                console.log("开始清除数据");
                toast(res.msg, 0);
                that.setData({
                    img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/mendian-9@2x.png",
                    id: 2,
                    show: true
                })
            } else {
                toast(res.msg, 1);
            }
        })
    },
    dateFormat(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
            ;
        }
        ;
        return fmt;
    }
});
