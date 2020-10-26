Page({
    data: {
        bannerList: [], // banner
        classifyList: [], // 分类
        shopList: []
    },
    onLoad: function (options) {
        this.addBanner();
        this.addClassFylist();
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
        const b = {
            name: "生活家居",
            recommendList: [],
        };
        const c = {
                image: "",
                price: "",
                name: ""
            };
    }
});