/**
 * index.js
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adr: '',
    goodList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
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

  },
  // 数据模拟
  initData: function () {

    const a = {
      name: '',
      goods_list: []
    };
    for (let i = 0; i < 3; i++) {
      a.name="生活家居";
      for(let j=0;j<4;j++){
        const b = {
          image: '',
          goods_name: '',
          attr_list: [],
          price: '',
          num: ''
        };
        b.image='../../static/images/recycle1.png';
        b.goods_name="衣服";
        b.price="500.00";
        b.num='10';
        for(let n=0;n<5;n++){
          const c = {
            attr_name: ''
          };
          c.attr_name='衣服';
          b.attr_list.push(c);
        }
        a.goods_list.push(b);
      }
    }
    console.log(a);
    this.setData({
      goodList: a
    });
  },
})
