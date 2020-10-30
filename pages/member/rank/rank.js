// pages/rank/rank.
import {RankingList} from "../../../api/order";
import {toast} from "../../../utils/macutils";

var aData={
  token: "",
  Page: 1,
  PageSize: 10
};
var ListData=[];
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
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
    this.HttpRank(aData);
    console.log("onLoad加载");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  onHide:function(){

    console.log("Hide请求");
  },
  onUnload:function(){
    ListData=[];
    console.log("onUnload加载");
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
      // toast("请求开始");
      if(res.code===1){
        for(let i=0;i<res.data.length;i++){
          const a={
            id: 1,
            avatar: "",
            nickname: "admin",
            total_money: "0.00",
            level: 1
          }
          a.id=res.data[i].id;
          a.avatar=res.data[i].avatar;
          a.nickname=res.data[i].nickname;
          a.total_money=res.data[i].total_money;
          a.level=res.data[i].level;
          ListData.push(a);
        }

        that.setData({
          list: ListData,
        });
        aData.Page+=1;
        // toast("加载成功");
      }

    });
  }
})
