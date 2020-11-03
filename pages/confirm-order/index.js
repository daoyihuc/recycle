import {CheckOrder, Done} from "../../api/order";
import {back, goRouter, goRouterR, toast} from "../../utils/macutils";

var that;
var aData={
  token: "",
  Id:"",
};
var aData2={
  token: "",
  Id:"",
  AddressId: "",
  Remark: ""
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adr: '',
    goodList: [],
    province: "", // 省
    city:'', // 市
    district: "", // 区
    street: "", // 街道
    address: "",// 详细地址
    address_id: "", // 地址id
    contacts: "", // 联系人
    mobile: "", // 手机号
    GoodsInfo: "", // 商品详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.type==="1"){
      let id=options.id;
      aData.Id=id;
      aData2.Id=id;
    }else if(options.type==="2"){
      // const a="/pages/confirm-order/index?type=2&province=" + province+
      //     "&city="+city+"&district="+district+"&street="+street+"&address="+address+
      //     "&address_id="+address_id+"&contacts="+contacts+"&mobile="+mobile;
      let province=options.province;
      let city=options.city;
      let district=options.district;
      let street=options.street;
      let address=options.address;
      let address_id=options.address_id;
      let contacts=options.contacts;
      let mobile=options.mobile;
      this.setData({
        province: province,
        city: city,
        district: district,
        street: street,
        address: address,
        address_id: address_id,
        contacts: contacts,
        mobile: mobile,
      });
      aData2.token=wx.getStorageSync("token");
     aData2.AddressId=address_id;
    }
    aData.token=wx.getStorageSync("token");

    that=this;
    // this.initData();
    this.HttpCofirmOrder(aData);
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
  // 数据模拟
  initData: function () {

    const a = {
      name: '',
      goods_list: [],
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
  // 确认下单信息
  HttpCofirmOrder:function (params) {
    CheckOrder(params).then(res=>{
      let a={
        "Address": [],
        "GoodsInfo": {
          "goods_name": "231231",
          "img": "https://fg.996sh.com/2312312",
          "goods_price": "12.30",
          "sale_number": 0
        },
        "GoodsPrice": "12.30",
        "OrderPrice": "12.30"
      };
      a=res.data;
      that.setData({
        OrderPrice: a.OrderPrice,
        GoodsInfo: a.GoodsInfo
      });
      console.log(res);
    });
  },
  // 选择地址
  selectedAddress:function () {
    // goRouter("/pages/confirm-order/index?type=1&id=" + id);
    goRouter("/pages/Harvest_address/HarvestAddress");
  },
  // 订单提交
  HttpDone:function (params) {
    Done(params).then(res=>{
      toast(res.msg,1);
      if(res.code===1){
        back(2);
      }
    })
  },
  // 提交事件
  sumbitEvent:function () {
    if(!aData2.AddressId){
      toast("地址不能为空",1)
    }else if(!aData2.token){
      toast("请先登录",1)
    }else{
      this.HttpDone(aData2);
    }

  }


})
