import {OrderList,CancelGoodsOrder,ComfirmGoodsOrder} from "../../../api/order";
import {goRouter, toast} from "../../../utils/macutils";

var that;
var aData={
    token: '',
    type: '',
    Page: 1,
    PageSize: 10,
};
var  countPage;
var ListData=[];
var aData2={
    token: '',
    oid:''
};
Page({
    data: {
        list: [ {
            cate_name: "全部",
            id: 'all'
        }, {
            cate_name: "已兑换",
            id: '0'
        }, {
            cate_name: "已发货",
            id: '1'
        }, {
            cate_name: "已完成",
            id: '2'
        }, {
            cate_name: "已取消",
            id: '3'
        }
        ],
        orderlist: [],
        activited: "all"
    },
    onLoad: function (options) {
        that=this;
        this.setData({
            activited: options.type
        });
        aData.token=wx.getStorageSync("token");
        aData.type=this.data.activited;
        aData2.token=wx.getStorageSync("token");
        this.HttpOrderList(aData);
    },
    onTabChange(event) {
        const a=event.detail.name;
        toast(a);
        aData.Page=1;
        this.setData({
            activited: a
        });
        aData.type=this.data.activited;
        ListData=[];
        this.HttpOrderList(aData);
    },
    // 列表数据
    HttpOrderList:function (params) {
        OrderList(params).then(res=>{
            console.log(res);
            let a={
                oid: "", //订单
                order_sn: "dadadaddada", // 订单编号
                total_amount: "13.00", // 金额
                orderstatus: "1",// 状态
                dateline: "2020-09-24",  // 时间
                GoodsList: {
                    goods_id: "1", // 商品id
                    goods_name: "sdadd",// 商品名称
                    goods_image: "../../../static/images/testbanner.png", // 图片地址
                    goods_price: "", // 商品金额
                },
            };
            if(res.code===1){
                // ListData=res.data.List;
                for(let i=0;i<res.data.List.length;i++){
                    ListData.push(res.data.List[i]);
                }
                // ListData.push(a);
                countPage=res.data.Pageinate;
                that.setData({
                    orderlist: ListData
                });
                aData.Page+=1;
            }
            console.log("数组长度",that.data.orderlist.length);
        });
    },
    // 上拉加载
    onReachBottom:function() {
        this.HttpOrderList(aData);
    },
    // 取消订单
    HttpCancel:function (params) {
        CancelGoodsOrder(params).then(res=>{
            console.log(res);
            if(res.code===1){
                aData.Page=1;
                ListData=[];
                this.HttpOrderList(aData);
            }
            toast(res.msg,1);
        });
    },
    // 确认收获
    HttpCofig:function (params) {
        ComfirmGoodsOrder(params).then(res=>{
            console.log(res);
            if(res.code===1){
                aData.Page=1;
                ListData=[];
                this.HttpOrderList(aData);
            }
            toast(res.msg,1);
        })
    },
    // 取消事件
    cancelEevent:function (e) {
        let id=e.currentTarget.dataset.id;
        console.log(id);
        aData2.oid=id;
        this.HttpCancel(aData2);
    },
    // 确认收货事件
    comfirmEevent:function (e) {
        let id=e.currentTarget.dataset.id;
        aData2.oid=id;
        this.HttpCofig(aData2);
    },
    // 查看详情
    GoDetail:function (e) {
        goRouter("/pages/gooddetails/gooddetails?id="+e.currentTarget.dataset.id);
    }
});
