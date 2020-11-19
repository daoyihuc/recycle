import {PromoteStoreList} from "../../api/order";
import {toast} from "../../utils/macutils";

var aData={
    token: wx.getStorageSync("token"),
    Page: 1,
    PageSize: 10
};
var that;

var data=[];

Page({
    data: {
        List:[]
    },
    onLoad: function (options) {
        that=this;
        this.http(aData);
    },
    onReachBottom() {
        this.http(aData);
    },
    onUnload() {
      data=[];
      aData.Page=1;
    },
    http:function (params) {
        PromoteStoreList(params).then(res=>{
            console.log(res);
            const  a={
                admin_id: 1,
                code_img: "http://fgadmin.996sh.com/lasterweima/erweima1.png",
                connect_name: null,
                dateline: 0,
                id: 1,
                store_address: "，您",
                store_city: "长沙市",
                store_district: "芙蓉区",
                store_img: "/uploads/20201119/b50f09d09bf8df590c87b4a5c3bf0da3.jpg",
                store_mobile: "18673497779",
                store_name: "道翼",
                store_province: "湖南省",
                store_street: "地铁2号线,地铁5号线",
                type: null
            }
            if(res.code===1){
                for(let i=0;i<res.data.List.length;i++){
                    data.push(res.data.List[i]);
                }
                that.setData({
                    List: data
                });
                aData.Page+=1;
            }else{
                toast(res.msg,1);
            }
        })
    }
});
