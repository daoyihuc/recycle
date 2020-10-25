// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "../../static/aaa.png",
    qrCode: "../../static/aaa.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (n) {
    // this.img = n.img, 
    // this.qrCode = n.qrCode, 
    this.draw();
  },
  draw: function () {
    var t = this;
    var n = this;
    wx.getImageInfo({
      src: t.img,
      success: function (e) {
        wx.getImageInfo({
          src: t.qrCode,
          success: function (t) {
            var o = n.createCanvasContext("my-poster");
            o.drawImage(e.path, 0, 0, 300, 450), o.drawImage(t.path, 100, 200, 100, 100), o.draw();
          }
        });
      }
    });
  },
  save: function () {
    // var n = this;
    wx.authorize({
      scope: "scope.writePhotosAlbum",
      success: function () {
        wx.showLoading({
          title: "正在生成图片"
        }), wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          height: 900,
          canvasId: "my-poster",
          success: function (t) {
            wx.hideLoading(), wx.saveImageToPhotosAlbum({
              filePath: t.tempFilePath,
              success: function () {
                // wx.showToast({
                //   title: "图片保存成功",
                //   duration: 2e3,
                //   icon: "success"
                // }), 
                console.log("save success");
              },
              fail: function (n) {
                console.log(n);
              }
            });
          }
        });
      }
    });
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