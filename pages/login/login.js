import {back,wxLogin,toast} from "../../utils/macutils";
import {WxLogin} from "../../api/app"

var  a={
    Code: "",
    gender: "",
    nickname: "",
    avatar: "",
    inviteuid: ""
};
var that="";
Page({
    data: {

    },
    onLoad: function (options) {
        that=this;
    },
    login:function(){
        wxLogin().then( res =>{
            if(res.status===0x12){
                toast("登录失败");
            }else{
                a.Code=res.code;
                that.http(a);

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
    }
});
