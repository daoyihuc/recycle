
import {goRouter} from "../../../utils/macutils";
import {BookingCenter} from "../../../api/order";


var aData={
  token:"",
  type:0,
  Page:1,
  PageSize:10
}
var ListData=[];
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        cate_name: "收入",
        name: 0
      }, {
        cate_name: "支出",
        name: 1
      }
      ],

    active: 0,
    activeB: 1,
    AdminInfo: {},
    MoneyList:[],
    icon: {
      normal: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-81@2x.png',
      active: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-82@2x.png',
    },
    icon1: {
      normal: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-84@2x.png',
      active: 'https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.8/first-83@2x.png',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    that=this;
    aData.token=wx.getStorageSync("atoken");
    this.getList(aData);
  },
  getList: function (params) {
    BookingCenter(params).then(res=>{
      console.log(res);
      if(res.code===1){
        let AdminInfo={
          id:"",
          username:"",
          mobile:"",
          district:"",
          money:""
        };
        AdminInfo=res.data.AdminInfo;// 相关信息
        let c={
          id:"",
          change_money:"10.00",
          remark:"吃饭",
          dateline:"2020-11-02",
          title:"日常开销",
        };
        for(let i=0;i<res.data.List.length;i++){
          let a={
            id:"",
            change_money:"",
            remark:"",
            dateline:"",
            title:"",
          };
          a=res.data.List[i];
          ListData.push(a);
        }
        // ListData.push(c);
        that.setData({
          MoneyList: ListData,
          AdminInfo: AdminInfo
        });
        aData.Page+=1;
      }
    })
  },
  // 界面跳转
  onclick:function (e) {
    let number = e.detail;
    let url="";
    switch (number) {
      case 0:
        url="/pages/member/admins/admins";
        break;
      case 1:
        url="/pages/member/admin-center/admin-center";
        break;
    }
    goRouter(url);
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    ListData=[];
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList(aData);
  },
  // tabChange
  onTabChange:function (event) {
    this.setData({
      active: event.detail.name,
    });
    aData.type=event.detail.name;
    aData.Page=1;
    ListData=[];
    this.getList(aData);
  },
  logout:function () {
    wx.removeStorage({
      key: 'atoken',
      success (res) {
        wx.switchTab({url:"/pages/my/my"})
      }
    })
  }
})
