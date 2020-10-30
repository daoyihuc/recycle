import {AppintmentList, CancelOrder} from "../../api/order";
import {toast} from "../../utils/macutils";

var aData={
    token:"",
    status:"",
    Page: 1,
    PageSize: 10
};
var  listData=[];
var that;
var CouPage;
Page({
    data: {
        list: [ {
            cate_name: "全部",
            status: 'all'
        }, {
            cate_name: "待服务",
            status: '0'
        }, {
            cate_name: "服务中",
            status: '1'
        }, {
            cate_name: "已完成",
            status: '2'
        }, {
            cate_name: "已取消",
            status: '3'
        } ],
        orderlist: [{
            _status: '待服务',
            order_status: 0,
            appointment_time: '2020-09-24',
            createtime: '2020-09-24',
            mobile: '125369541',
            address_detail: '45454545215511545451mnbhjhjjh'
        }],
        active: 0,
    },
    onLoad: function (options) {
        console.log(options.id);
        const id=Number(options.id);
        this.setData({
            active: id
        });
        // console.log(this.data.list[id].status);
        that=this;
        aData.token=wx.getStorageSync("token");
        aData.status=this.data.list[id].status;
        this.HttpSuberList(aData);
    },
    onTabChange(event) {
        listData=[];
        const a=event.detail.name;
        aData.status=this.data.list[a].status;
        aData.Page=1;
        this.HttpSuberList(aData);
    },
    onReachBottom:function(){
        if(aData.Page<=CouPage){
            this.HttpSuberList(aData);
        }else{
            toast("没有更多数据了哦",1);
        }

    },
    // 列表
    HttpSuberList:function (params) {
        AppintmentList(params).then(res=>{
            console.log(res);
            // 临时存储客栈
            if(res.code===1){
                const b=res.data.List;
                CouPage=res.data.Pageinate.Pages;
                for(let i=0;i<b.length;i++){
                    const a={};
                    a.id=b[i].id;
                    a.order_sn=b[i].order_sn;
                    a.uid=b[i].uid;
                    a.weight=b[i].weight;
                    a.now_time=b[i].now_time;
                    a.now_date=b[i].now_date;
                    a.dateline=b[i].dateline;
                    a.order_amount=b[i].order_amount;
                    a.total_weight=b[i].total_weight;
                    a.admin_id=b[i].admin_id;
                    a.pay_id=b[i].pay_id;
                    a.pay_time=b[i].pay_time;
                    a.status_name=b[i].status_name;
                    a.mobile=b[i].mobile;
                    a.address=b[i].address;
                    a.cancel_time=b[i].cancel_time;
                    a.finished_time=b[i].finished_time;
                    a.remark=b[i].remark;

                    listData.push(a);
                }
                that.setData({
                    orderlist: listData
                });
                aData.Page+=1;
                console.log("daoyi",listData);
            }
            toast(res.msg,1);
        });
    },
    // 删除
    HttpCancleOrder:function (params) {
        CancelOrder(params).then(res=>{
            console.log(res);
            if(res.code===1){
                toast("取消成功",0);
                aData.Page=1;
                listData=[];
                this.HttpSuberList(aData);
            }else{
                toast(res.msg,1);
            }

        });
    },
    // 取消事件
    DeleteEvent:function (e) {
        console.log(e.currentTarget.dataset.id);
        let id=e.currentTarget.dataset.id;
        const a={
            token: wx.getStorageSync("token"),
            id: id
        };
        this.HttpCancleOrder(a);
    }
});
