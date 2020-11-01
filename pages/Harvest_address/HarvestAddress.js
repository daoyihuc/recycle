import {goRouter, toast} from "../../utils/macutils";
import {AddressDelete, AddressList} from "../../api/app";

var aData = {
    token: "",
    Page: 1,
    PageSize: 10,
};
var a=[];
var that;
var app=getApp();
Page({
    data: {
        address: []
    },
    onLoad: function (options) {
        that = this;
        aData.token = wx.getStorageSync("token");
        // this.HttpAddresList(aData);
    },
    onShow() {
        a=[];
        aData.Page=1;
        this.HttpAddresList(aData);
    },
    addAddress: function () {
        goRouter("/pages/member/add-address/add-address")
    },
    // 地址列表
    HttpAddresList: function (params) {
        AddressList(params).then(res => {

            console.log(res);
            for (let i = 0; i < res.data.List.length; i++) {
                const b = {
                    address: "65465",
                    address_id: 3,
                    city: "长沙市",
                    contacts: "464646",
                    dateline: "2020/10/29",
                    district: "开福区",
                    is_default: 0,
                    mobile: "17673850004",
                    province: "湖南省",
                    street: "盛世路1号",
                };
                b.address = res.data.List[i].address;
                b.address_id = res.data.List[i].address_id;
                b.city = res.data.List[i].city;
                b.contacts = res.data.List[i].contacts;
                b.dateline = res.data.List[i].dateline;
                b.district = res.data.List[i].district;
                b.is_default = res.data.List[i].is_default;
                b.mobile = res.data.List[i].mobile;
                b.province = res.data.List[i].province;
                b.street = res.data.List[i].street;
                a.push(b);
                console.log(a);

            }
            aData.Page+=1;
            that.setData({
                address: a
            });
            console.log(aData.Page);
        });
    },
    onReachBottom() {
        aData.token=wx.getStorageSync("token");
        this.HttpAddresList(aData);
    },
    GoEditer:function (e) {
        console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id;
        goRouter("/pages/member/edit-address/edit-address?id="+id);
    },
    GoDelete:function (e) {
        console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id;
        const  a={
            token: wx.getStorageSync("token"),
            id: id
        };
        this.HttpDelete(a);
    },
    HttpDelete:function (params) {
        AddressDelete(params).then(res=>{
            if(res.code===1){
                toast(res.msg);
                a=[];
                aData.Page=1;
                this.HttpAddresList(aData);
            }else{
                toast(res.msg,1);
            }
        });
    },
    GoBack:function (e) {
        let id = e.currentTarget.dataset.index;
        const address = this.data.address[id].address;
        const address_id = this.data.address[id].address_id;
        const city = this.data.address[id].city;
        const district = this.data.address[id].district;
        const province = this.data.address[id].province;
        const street = this.data.address[id].street;
        const contacts=this.data.address[id].contacts;
        const mobile=this.data.address[id].mobile;
        console.log(id);
        const a="/pages/confirm-order/index?type=2&province=" + province+
        "&city="+city+"&district="+district+"&street="+street+"&address="+address+
        "&address_id="+address_id+"&contacts="+contacts+"&mobile="+mobile;
        goRouter(a);
    }
});
