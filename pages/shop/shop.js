import {goRouter} from "../../utils/macutils";

Page({
    data: {
        bannerList: [], // banner
        classifyList: [], // 分类
        shopList: []
    },
    onLoad: function (options) {
        this.addBanner();
        this.addClassFylist();
        this,this.addListcommodity();
    },
    addBanner: function () {
        const banner = [];
        banner.push("http://ptadmin.ccshpt.com///uploads/20200827/9dca86afc214a6d2aa5859252300a826.png");
        this.setData({
            bannerList: banner
        });
    },
    addClassFylist: function () {
        const list = [];
        for (let i = 0; i < 8; i++) {
            const a = {
                image: "../../static/images/megdian@2x.png",
                name: "衣服"
            }
            list.push(a);
        }
        this.setData({
            classifyList: list
        });
    },
    addListcommodity: function () {
        const shop=[];
        for(let i=0;i<3;i++){
             const b = {
                 name: "生活家居",
                 recommendList: [],
             };
             for(let j=0;j<7;j++){
                 const c = {
                     image: "../../static/images/recycle3.png",
                     price: "85.00",
                     name: "test"
                 };
                 b.recommendList.push(c);
             }
             shop.push(b);
        }
        this.setData({
            shopList: shop
        });
            
    },
    // 前往详情
    goDetails:function (e) {
        let id=e.currentTarget.dataset.id;
        console.log(id);
        goRouter("/pages/goods-details/goods-details?id="+id);
    },
    // 前往分类列表
    goShopList:function (e) {
        let id=e.currentTarget.dataset.id;
        console.log(id);
        goRouter("/pages/shop-list-two/shop-list-two?id="+id);
    }
});
