import {goRouter} from '../../utils/macutils'

Page({
    data: {
        subscribeList: [
            {
                imgUrl: "../../static/images/my_icon_yuyue@2x.png",
                text: "全部预约",
                menuId: 1.1
            }, {
                imgUrl: "../../static/images/my_icon_daishagnmen@2x.png",
                text: "待上门",
                menuId: 1.2
            }, {
                imgUrl: "../../static/images/my_icon_yiwancheng@2x.png",
                text: "已完成",
                menuId: 1.3
            }, {
                imgUrl: "../../static/images/my_icon_yiquxiao@2x.png",
                text: "已取消",
                menuId: 1.4
            } ],
        orderList: [
            {
                imgUrl: "../../static/images/my_icon_quanbu@2x.png",
                text: "全部订单",
                menuId: 2.1
            }, {
                imgUrl: "../../static/images/fukuan@2x.png",
                text: "已付款",
                menuId: 2.2
            }, {
                imgUrl: "../../static/images/my_icon_daishouhuo@2x.png",
                text: "已完成",
                menuId: 2.3
            }, {
                imgUrl: "../../static/images/shouhoufuwu-zidongpingjia@2x.png",
                text: "售后",
                menuId: 2.4
            } ],
        toolList: [
            {
                imgUrl: "../../static/images/my_icon_bangdan.png",
                text: "回收榜单",
                menuId: 3
            }, {
                imgUrl: "../../static/images/my_icon_guzhi@2x.png",
                text: "回收分类",
                menuId: 4
            }, {
                imgUrl: "../../static/images/my_icon_zhinan@2x.png",
                text: "回收指南",
                menuId: 5
            }, {
                imgUrl: "../../static/images/my_icon_yaoqingyouli@2x.png",
                text: "邀请有礼",
                menuId: 6
            }, {
                imgUrl: "../../static/images/my_icon_yaoqing@2x.png",
                text: "我的邀请",
                menuId: 7
            }, {
                imgUrl: "../../static/images/my_icon_yijianfankui@2x.png",
                text: "意见反馈",
                menuId: 8
            }, {
                imgUrl: "../../static/images/my_icon_saoyisao@2x.png",
                text: "扫一扫",
                menuId: 9
            }, {
                imgUrl: "../../static/images/my_icon_gouwuche@2x.png",
                text: "购物车",
                menuId: 10
            }, {
                imgUrl: "../../static/images/my_icon_kefu@2x.png",
                text: "客服",
                menuId: 11
            }, {
                imgUrl: "../../static/images/my_icon_shouhuodizhi@2x.png",
                text: "回收地址",
                menuId: 12
            }, {
                imgUrl: "../../static/images/ywy.png",
                text: "管理员端",
                menuId: 14
            } ]
    },
    onLoad: function (options) {

    },
    onClick:function(event){
        console.log(event.target.dataset.menuid);
        let url;
        switch (event.target.dataset.menuid) {
            case 1.1: // yuyeu all
                url="/pages/subscribe-order/subscribe-order?tabarIndex=all";
                break;
            case 1.2:
                url="/pages/subscribe-order/subscribe-order?tabarIndex=0";
                break;
            case 2.1:
                url="/pages/my-order/my-order?tabarIndex=0";
                break;
            case 2.2:
                url="/pages/my-order/my-order?tabarIndex=0";
                break;
            case 2.3:
                url="/pages/my-order/my-order?tabarIndex=0";
                break;
            case 3:
                url="/pages/rank/rank";
                break;
        }
        goRouter(url);
    }
});
