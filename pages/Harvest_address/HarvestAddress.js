import {goRouter, goRouterR, toast} from "../../utils/macutils";
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
        list: [],
        delBtnWidth: 360,//删除按钮宽度单位（rpx）
    },
    onLoad: function (options) {
        that = this;
        aData.token = wx.getStorageSync("token");
        // this.HttpAddresList(aData);
        this.initEleWidth();
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
                    txtStyle: "",
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
                list: a
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
        const address = this.data.list[id].address;
        const address_id = this.data.list[id].address_id;
        const city = this.data.list[id].city;
        const district = this.data.list[id].district;
        const province = this.data.list[id].province;
        const street = this.data.list[id].street;
        const contacts=this.data.list[id].contacts;
        const mobile=this.data.list[id].mobile;
        console.log(id);
        const a="/pages/confirm-order/index?type=2&province=" + province+
        "&city="+city+"&district="+district+"&street="+street+"&address="+address+
        "&address_id="+address_id+"&contacts="+contacts+"&mobile="+mobile;
        goRouterR(a);
    },

    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置
                startX: e.touches[0].clientX
            });
        }
    },
    touchM: function (e) {
        var that = this
        initdata(that)
        if (e.touches.length == 1) {
            //手指移动时水平方向位置
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var txtStyle = "";
            if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
                txtStyle = "left:0px";
            } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度
                    txtStyle = "left:-" + delBtnWidth + "px";
                }
            }
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list: list
            });
        }
    },

    touchE: function (e) {
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮
            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
            //获取手指触摸的是哪一项
            var index =e.currentTarget.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list: list
            });
        }
    },
    //获取元素自适应后的实际宽度
    getEleWidth: function (w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
            // console.log(scale);
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
            // Do something when catch error
        }
    },
    initEleWidth: function () {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    //点击删除按钮事件
    delItem: function (e) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '是否删除？',
            success: function (res) {
                if (res.confirm) {
                    //获取列表中要删除项的下标
                    var index = e.target.dataset.index;
                    var list = that.data.list;
                    //移除列表中下标为index的项
                    list.splice(index, 1);
                    //更新列表的状态
                    that.setData({
                        list: list
                    });
                } else {
                    // initdata(that)
                }
            }
        })


    }

    });
