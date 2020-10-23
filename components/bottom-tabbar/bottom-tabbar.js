// components/bottom-tabbar/bottom-tabbar.js
Component({
  props: ["currentpage"],
  computed: {
    changeColor: function () {
      return this.currentpage;
    }
  },
  methods: {
    toIndex: function () {
      n.redirectTo({
        url: "/pages/index/index"
      });
    },
    toConsult: function () {
      n.redirectTo({
        url: "/pages/consult/index"
      });
    },
    toSubscribe: function () {
      n.redirectTo({
        url: "/pages/subscribe/index"
      });
    },
    toShop: function () {
      n.redirectTo({
        url: "/pages/shop/index"
      });
    },
    toMy: function () {
      n.redirectTo({
        url: "/pages/my/index"
      });
    },
    clickChangeImgHome: function (n) {
      return "pages/index/index" == n ? "../../static/images/tabbar_icon_home_sel@2x.png" : "../../static/images/tabbar_icon_home_nor@2x.png";
    },
    clickChangeImgConsult: function (n) {
      return "pages/consult/index" == n ? "../../static/images/tabbar_icon_zixun_sel@2x.png" : "../../static/images/tabbar_icon_zixun_nor@2x.png";
    },
    clickChangeImgShop: function (n) {
      return "pages/shop/index" == n ? "../../static/images/tabbar_icon_shagncheng_sel@2x.png" : "../../static/images/tabbar_icon_shagncheng_nor@2x.png";
    },
    clickChangeImgMy: function (n) {
      return "pages/my/index" == n ? "../../static/images/tabbar_icon_my_sel@2x.png" : "../../static/images/tabbar_icon_my_nor@2x.png";
    }
  }
})
