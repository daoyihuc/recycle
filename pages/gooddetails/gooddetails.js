import {toast} from "../../utils/macutils";
import {OrderDetail} from "../../api/order";

var that;
var aData={
    token: '',
    oid:''
};
Page({
    data: {
        info: {
            oid: "", // 订单id
            order_sn: "", // 订单编号
            address: [{
                address_id: "", // 地址id
                province: "", // 省
                city: "", // 市
                district: "",// 区
                street: "", // 街道
                address: "", // 详细地址
                contacts: "", // 收货人
                mobile: "", // 手机
            }],
            total_amount: "", // 金额
            dateline: "", // 时间
            orderstatus: "", // 订单状态
            cancel_time: "", // 取消时间
            finished_time: "", // 完成时间
            send_time: "", // 发货时间
            remark: "", //备注
            GoodsList: [{
                goods_id: "", // 商品id
                goods_name: "",// 名词
                goods_image: "", // src
                goods_price: "", // 金额
            }],
        }
    },
    onLoad: function (options) {
        that=this;
        aData.token=wx.getStorageSync("token");
        aData.oid=options.id;
        this.HttpDetails(aData);
    },
    // 获取商品详情
    HttpDetails:function (params) {
        OrderDetail(params).then(res=>{
           console.log(res);
           let a={
               oid: "", // 订单id
               order_sn: "123213414414", // 订单编号
               address: {
                   address_id: "1", // 地址id
                   province: "湖南省", // 省
                   city: "长沙市", // 市
                   district: "岳麓区",// 区
                   street: "和平街道", // 街道
                   address: "解放路", // 详细地址
                   contacts: "daoyi", // 收货人
                   mobile: "18673497779", // 手机
               },
               total_amount: "100.00", // 金额
               dateline: "2020-09-24", // 时间
               orderstatus: "0", // 订单状态
               cancel_time: "", // 取消时间
               finished_time: "", // 完成时间
               send_time: "", // 发货时间
               remark: "", //备注
               GoodsList: [{
                   goods_id: "", // 商品id
                   goods_name: "牙膏",// 名词
                   goods_image: "", // src
                   goods_price: "100.00", // 金额
               }],
           };
            // that.setData({
            //     info: a
            // });
           if(res.code===1){
               a=res.data;
               that.setData({
                   info: a
               });
           }else{
               toast(res.msg,1);
           }
        });
    }
});
