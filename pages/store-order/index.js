import {goRouter} from "../../utils/macutils";
import {PHONE} from "../../config/constans";

Page({
    data: {
        img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/mendian-5@2x.png",
        id: 1, // 1.下单 2.取消订单
        show: false
    },
    onLoad: function (options) {

    },
    down_order:function (e) {
        if(e.currentTarget.dataset.id===1){
            this.setData({
                img:"https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/mendian-9@2x.png",
                id: 2,
                show: true
            })
        }else{
            this.setData({
                img:"https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/mendian-5@2x.png",
                id: 1
            })
        }

    },
    onclick:function (e) {
        switch (e.currentTarget.dataset.id) {
            case 1: // 我的
                wx.switchTab({url:"/pages/my/my"})
                break;
            case 2: // 客服
                let number = PHONE;
                wx.makePhoneCall({
                    phoneNumber: number
                });
                break;
        }
    },
    close:function () {
        this.setData({
            show:false
        })
    }
});
