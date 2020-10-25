Page({
    data: {
        list: [ {
            cate_name: "全部"
        }, {
            cate_name: "已付款"
        }, {
            cate_name: "已完成"
        }, {
            cate_name: "售后"
        } ],
        orderlist: [{
            name: "DSAD",
            _status: "SDAD",
            goods_list: [
                {
                    goods_pic: '../../static/images/aaa.png',
                    goods_name: 'DASD',
                    attr_list: [{
                        attr_name: "SDAD"
                    }],
                    price: '4',
                    num: '552'
                },
                {
                    goods_pic: 'DAD',
                    goods_name: 'DASD',
                    attr_list: [{
                        attr_name: "SDAD"
                    }],
                    price: '4',
                    num: '552'
                }
            ],

        }],
    },
    onLoad: function (options) {

    }
});
