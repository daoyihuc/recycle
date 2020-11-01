import {goRouter, toast} from "../../utils/macutils";
import {GoodsIndex} from "../../api/order";

var that;
Page({
    data: {
        bannerList: [], // banner
        classifyList: [], // 分类
        shopList: [],
        notice: "",
    },
    onLoad: function (options) {
        that = this;
        // this.addClassFylist();
        // this.addListcommodity();
        this.HttpShop();
    },
    addBanner: function (imgs) {
        const banner = [];
        // banner
        // {
        //     "img": "https://fg.996sh.com/123123123"
        // };
        for (let i = 0; i < imgs.length; i++) {
            banner.push(imgs[i].img);
        }
        banner.push("http://ptadmin.ccshpt.com///uploads/20200827/9dca86afc214a6d2aa5859252300a826.png");
        this.setData({
            bannerList: banner
        });
    },
    addClassFylist: function (menulist) {
        const list = [];
        for (let i = 0; i < menulist.length; i++) {
            const a = {
                id: '',
                image: "../../static/images/megdian@2x.png",
                name: "衣服"
            }
            // {
            //     "id": 1,
            //     "cat_name": "123123",
            //     "logo": "https://fg.996sh.com12312"
            // }
            a.id = menulist[i].id;
            a.image = menulist[i].logo;
            a.name = menulist[i].cat_name;
            list.push(a);
        }
        this.setData({
            classifyList: list
        });
    },
    addListcommodity: function (shopList) {
        const shop = [];
        // [ "CatId": 1,
        //     "CatName": "123123",
        //     "GoodsList": [
        //     {
        //          "id": "1"
        //         "goods_name": "231231",
        //         "img": "https://fg.996sh.com/2312312",
        //         "goods_price": "12.30"
        //     }
        // ]
        for (let i = 0; i < shopList.length; i++) {
            const b = {
                id: "",
                name: "生活家居",
                recommendList: [],
            };
            b.id = shopList[i].CatId;
            b.name = shopList[i].CatName;
            for (let j = 0; j < shopList[i].GoodsList.length; j++) {
                const c = {
                    id:"",
                    image: "../../static/images/recycle3.png",
                    price: "85.00",
                    name: "test"
                };
                c.id=shopList[i].GoodsList[j].id;
                c.price=shopList[i].GoodsList[j].goods_price;
                c.name=shopList[i].GoodsList[j].goods_name;
                c.image=shopList[i].GoodsList[j].img;
                b.recommendList.push(c);
            }
            shop.push(b);
        }
        this.setData({
            shopList: shop
        });

    },
    // 前往详情
    goDetails: function (e) {
        let id = e.currentTarget.dataset.id;
        console.log(id);
        goRouter("/pages/goods-details/goods-details?id=" + id);
    },
    // 前往分类列表
    goShopList: function (e) {
        let id = e.currentTarget.dataset.id;
        console.log(id);
        goRouter("/pages/shop-list-two/shop-list-two?id=" + id);
    },
    // 商城首页
    HttpShop: function (params) {
        GoodsIndex(params).then(res => {
            console.log(res);


            if (res.code === 1) {
                // that.data.bannerList=res.data.slide;
                that.addBanner(res.data.slide);// banner
                // that.data.classifyList = res.data.MenuList; //菜单
                that.addClassFylist(res.data.MenuList);
                that.setData({
                    notice:  res.data.notice// 公告
                });
                // that.data.shopList = res.data.CateList; // 商品
                that.addListcommodity(res.data.CateList)

            } else {
                toast("网络请求失败", 1);
            }
        });
    }
});
