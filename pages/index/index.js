//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
        bannerList: [],// banner
        menuList: [],//菜单
        listItem:[]
  },
  onLoad: function () {
    this.addBanner();
    this.addMenu();
    this.listItem();
  },
  addBanner: function () {
    const banner = [];
    banner.push("../../static/images/testbanner.png");
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
  },
    // 测试
    listItem:function (){
      const test = {
          image:"https://cs17.appios.cn/uploads/20200731/3d5cf83e0deee46995454e0976d845df.jpg",
          name:"端午节|“粽”于等到你",
          desc:"端午安康！来康康粽叶垃圾分类小科普吧",
          read:"222",
          comment:"54",
          createtime:"2020/07/14"
      }
      const  list=[];
      list.push(test);
      this.setData({
          listItem: list
      })
        console.log(list);
    }


})
