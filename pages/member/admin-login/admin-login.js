// pages/admin-login/admin-login.js
import {goRouterR, toast} from "../../../utils/macutils";
import {AdminLogin} from "../../../api/order";

var that;
var aDatas={
  username: "",
  password: ""
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
      account: "",
      password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
  },
  usernames1:function(e){
    console.log(e);
    that.setData({
      account: e.detail
    });
    aDatas.username=e.detail;
  },
  usernames2:function(e){
    console.log(e);
    that.setData({
      account: e.detail.value
    });
    aDatas.username=e.detail.value;
  },
  passwords:function(e){
    console.log(e.detail);
    this.setData({
      password: e.detail
    });
    aDatas.password=e.detail;
  },
  passwords1:function(e){
    console.log(e.detail);
    this.setData({
      password: e.detail.value
    });
    aDatas.password=e.detail.value;
  },
  logins: function () {
    if(!this.data.account){
      toast("帐号不能为空",1);
    }else if(!this.data.password){
      toast("密码不能为空",1);
    }else{
      aDatas.username=this.data.account;
      this.HttpAdminLogin(aDatas);
    }
    console.log(aDatas);
    // goRouter("/pages/member/admin/admin")
  },
  HttpAdminLogin:function(params){
    AdminLogin(params).then(res=>{
      toast(res.msg,1);
      console.log(res);
      if(res.code===1){
        let a={
          id: "",
          token: "", // 回收员token
          username: ""
        }
        a=res.data;
        wx.setStorageSync("atoken",a.token);
        wx.setStorageSync("auname",a.username);
        wx.setStorageSync("aid",a.id);
        setTimeout(()=>{
          goRouterR("/pages/member/admins/admins");
        },1000);

      }
    });
  },

  subscribeMessage1:function() {
    //需要订阅的消息模板，在微信公众平台手动配置获取模板ID
    let message = [];
    message = ["pszE5AXIBgnmmaWmIivxP74um_pqhbbRnCKVCL3IVN4","wPtyaXiVnNcGuDAalQ4H21Z0QI2sNnIAyXAczAGqzQA",
    "wPtyaXiVnNcGuDAalQ4H21Z0QI2sNnIAyXAczAGqzQA","pszE5AXIBgnmmaWmIivxP74um_pqhbbRnCKVCL3IVN4"
    ];
    //如果总是拒绝（subscriptionsSetting，2.10.1库才支持）
    // if (this.versionCompare('2.10.1')) {
    wx.getSetting({
      withSubscriptions: true,//是否同时获取用户订阅消息的订阅状态，默认不获取
      success: (res) => {
        console.log(res)
        if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings &&
            res.subscriptionsSetting.itemSettings[message[0]] == "reject") {
          //打开设置去设置
          this.openConfirm('检测到您没打开推送权限，是否去设置打开？')
        } else {
          wx.requestSubscribeMessage({
            tmplIds: message,
            success: (res) => {
              if (res[message[0]] == 'accept') {
                //用户允许
              }
            },
            fail: (res) => {
              console.info(res)
            },
            complete: (res) =>{
              that.logins();
            }
          })
        }
      }
    })
    // } else if (this.versionCompare('2.4.4')) {
    //     wx.requestSubscribeMessage({
    //         tmplIds: message,
    //         success: (res) => {
    //             if (res[message[0]] == 'accept') {
    //                 //用户允许
    //             }
    //         },
    //         fail: (res) => {
    //             console.info(res)
    //         },
    //     })
    // }
  },
//打开设置
  openConfirm: function (message) {
    wx.showModal({
      content: message,
      confirmText: "确认",
      cancelText: "取消",
      success: (res) => {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              console.log(res.authSetting)
            },
            fail: (error) => {
              console.log(error)
            },
            complete: (res) =>{
              that.logins();
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
//基础库版本比较
  versionCompare(v) {
    const version = wx.getSystemInfoSync().SDKVersion
    if (this.compareVersion(version, v) >= 0) {
      return true
    } else {
      return false
    }
  },

})
