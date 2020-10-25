// pages/admin-login/admin-login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      account: "",
      password: "",
      user_id: wx.getStorageSync("userInfo").id
    }
  },
  login: function () {
    wx.showLoading({
      title: "登录中"
    }), this.$api.admin.login(this.form).then(function (t) {
      console.log(t), wx.hideLoading(), 1 === t.code ? (console.log(t.data.userinfo.token),
        wx.setStorage({
          key: "admin_token",
          data: t.data.userinfo.token
        }), t.data.userinfo.address = t.data.address, n.setStorage({
          key: "admin_info",
          data: t.data.userinfo
        }), wx.showToast({
          icon: "success",
          title: "登录成功即将跳转",
          duration: 2e3,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: "../admin/admin"
              });
            }, 1500);
          }
        })) : (wx.removeStorage("admin_token"), wx.showToast({
          icon: "none",
          title: "登录失败",
          duration: 2e3
        }));
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})