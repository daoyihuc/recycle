// pages/rank/rank.
import {RankingList} from "../../../api/order";

var aData={
  token: "",
  Page: 1,
  PageSize: 10
};
var ListDatas=[];
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: !1,
    showstr: !1,
    mine: {},
    list: [],
    page: 1,
    streetRanges: 1,
    street: 1,
    myran: "",
    mymoeny: "",
    columns: '',
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    aData.token=wx.getStorageSync("token");
    that=this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.HttpRank(aData);
  },
  onHide:function(){
    ListDatas=[];
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
    this.HttpRank(aData);
  },
  HttpRank:function (params) {
    RankingList(params).then(res=>{
      console.log(res);

      if(res.code===1){
        for(let i=0;i<res.data.length;i++){
          const a={
            id: 1,
            avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/OMFdLnWEMRuIvibEcVJib1wjuYAAibdhogBomh5atRQZc3gCxKY7MF3yibhkf8n4xfMswFjhwVAkH6IX8g4hoKia0iaQ/132",
            nickname: "admin",
            total_money: "0.00",
            level: 1
          }
          a.id=res.data[i].id;
          a.avatar=res.data[i].avatar;
          a.nickname=res.data[i].nickname;
          a.total_money=res.data[i].total_money;
          a.level=res.data[i].level;
          ListDatas.push(a);
        }

        that.setData({
          list: ListDatas,
        });
      }
      aData.Page+=1;
    });
  }
})
