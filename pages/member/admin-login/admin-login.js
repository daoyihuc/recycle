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
  login: function () {
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

})
