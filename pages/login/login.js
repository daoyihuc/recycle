import {back,wxLogin,toast} from "../../utils/macutils";

Page({
    data: {

    },
    onLoad: function (options) {

    },
    login:function(){
      wxLogin().then( res =>{
          if(res.status===0x12){
              toast("登录失败");
          }else{
              console.log(res.code);
              wx.setStorageSync("code",res.code);
              wx.setStorageSync("islogin",true);
              toast("登录成功");
              setTimeout(()=>{
                  back(1);
              },1000);

          }
      });
    },
    getUserInfo:function (e) {
        console.log(e);
    },
    onback:function () {
// 在C页面内 navigateBack，将返回A页面
        back(1);
    }
});
