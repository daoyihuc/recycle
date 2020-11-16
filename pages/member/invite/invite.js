import {PoliteInvitation} from "../../../api/order";
import {toast} from "../../../utils/macutils";

var aData={
    token:"",
};
var that;
Page({
    data: {
        id: "",
        bac_img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.7/yaoqing@2x.png",
        down_bac_img: "",
        isShow: false,
        qrCode: "",
        openSettingBtnHidden: false,//是否授权
    },
    onLoad: function (options) {

        that=this;
        this.handleSetting();
    },
    onShow:function(){
        aData.token=wx.getStorageSync("token");
        this.isLogin();
        this.Http(aData);
    },
    Http:function (params) {
        PoliteInvitation(params).then(res=>{
            console.log(res);
            if(res.code===1){
                const a={
                    erweima: "https://fg.996sh.com/erweima/erweima1.png",
                    share_img: "http://fgadmin.996sh.com/uploads/20201109/843b797a8a5b7e537446b842c712f0bf.jpg"
                }
                that.setData({
                    qrCode: res.data.erweima,
                    // bac_img: res.data.share_img
                });
            }else{
                toast(res.msg,1);
            }

        })
    },
    // 判断当前是否已经登录
    isLogin:function () {
        let storageSync = wx.getStorageSync('islogin');
        console.log("是否登录",storageSync===null);

        if(storageSync){
            this.setData({
                isShow: false
            });
        }
    },
    // 保存图片
    saveImg:function(e){


        let that = this;

        //获取相册授权
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            //这里是用户同意授权后的回调
                            that.saveImgToLocal();
                        },
                        fail() {//这里是用户拒绝授权后的回调
                            that.setData({
                                openSettingBtnHidden: false
                            })
                        }
                    })
                } else {//用户已经授权过了
                    that.saveImgToLocal();
                }
            },fail:function () {
                that.saveImgToLocal();
            }
        })

    },
    saveImgToLocal: function (e) {
        let that = this;
        toast("开始保存",0);
        let imgSrc = that.data.qrCode;
        console.log(that.data.qrCode);
        wx.downloadFile({
            url: imgSrc,
            success: function (res) {
                console.log(res);
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (data) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail:function () {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        })

    },

    // 授权
    handleSetting: function (e) {
        let that = this;
        // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮

        if (!e.detail.authSetting['scope.writePhotosAlbum']) {
            wx.showModal({
              title: '警告',
              content: '若不打开授权，则无法将图片保存在相册中！',
              showCancel: false
            })
            that.setData({
                openSettingBtnHidden: false
            })
        } else {
            wx.showModal({
              title: '提示',
              content: '您已授权，赶紧将图片保存在相册中吧！',
              showCancel: false
            })
            that.setData({
                openSettingBtnHidden: true
            })
        }
    },
});
