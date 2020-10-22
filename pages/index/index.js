//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    bannerList: [],
    menuList: []
  },
  onLoad: function () {
    this.addBanner();
    this.addMenu();
  },
  addBanner: function () {
    const banner = [];
    banner.push("http://ptadmin.ccshpt.com///uploads/20200827/9dca86afc214a6d2aa5859252300a826.png");
    this.setData({
      bannerList: banner
    });
  },
  addMenu: function () {
    const menuLists = [];
    const a=[
        "../../static/images/yaoqing_daoyi.png",
        "../../static/images/dingdanyuyue_daoyi.png",
        "../../static/images/huanbaodaoyi.png",
        "../../static/images/huishoudaoyi.png"
    ];
    const b=[
        "邀请有礼",
        "预约订单",
        "环保商城",
        "回收指南"
    ];
    for(let i=0;i<a.length;i++){
      const menu = {
      }
      menu.logo=a[i];
      menu.name=b[i];
      menuLists.push(menu);
    }


    this.setData({
      menuList: menuLists
    })
  }


})
