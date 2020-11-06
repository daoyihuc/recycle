import {back,wxLogin,toast} from "../../utils/macutils";
import {WxLogin} from "../../api/app"

var  a={
    Code: "",
    gender: "",
    nickname: "",
    avatar: "",
    inviteuid: "",
    district: ""
};
var that="";
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
    data: {
        address:"",
        Country:""
    },
    onLoad: function (options) {
        that=this;
        qqmapsdk = new QQMapWX({
            key: 'ORNBZ-U2M3U-VGLV2-2DLG2-SUH7V-5IFPD'
        });
    },
    login:function(){
        wxLogin().then( res =>{
            if(res.status===0x12){
                toast("登录失败");
            }else{
                a.Code=res.code;
                that.getLocationName();
            }
        });
    },
    getUserInfo:function (res) {
        console.log(res);
        let userInfo = res.detail.userInfo;
        let pic=userInfo.avatarUrl;
        let name=userInfo.nickName;
        let gender=userInfo.gender;
        a.avatar=pic;
        a.nickname=name;
        a.gender=gender;
        a.inviteuid=wx.getStorageSync("scene");
        this.login();

    },
    onback:function () {
        // 在C页面内 navigateBack，将返回A页面
        back(1);
    },
    // login
    http:function (params) {
        WxLogin(params).then( res =>{
            console.log(res);
            if(res.code == 1){
                wx.setStorageSync("token",res.data.token);
                wx.setStorageSync("islogin",true);
                wx.setStorageSync("pic",res.data.UserInfo.avatar);
                wx.setStorageSync("name",res.data.UserInfo.nickname);
                wx.setStorageSync("money",res.data.UserInfo.money);
                wx.setStorageSync("appointments_num",res.data.UserInfo.appointments_num);
                toast("登录成功");
                setTimeout(()=>{
                    back(1);
                },1000);
            }else{
                wx.showToast({
                    title: "网络请求失败"
                })
            }

        })
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
                        that.setData({
                            address: res.result.address
                        });
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
            Country: area.Country,
        });
        a.district=area.Country;
        that.http(a);

        return area;
    },
});
