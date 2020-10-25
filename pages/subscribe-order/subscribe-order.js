Page({
    data: {
        list: [ {
            cate_name: "全部"
        }, {
            cate_name: "待服务"
        }, {
            cate_name: "服务中"
        }, {
            cate_name: "已完成"
        }, {
            cate_name: "已取消"
        } ],
        orderlist: [{
            _status: '待服务',
            order_status: 0,
            appointment_time: '2020-09-24',
            createtime: '2020-09-24',
            mobile: '125369541',
            address_detail: '45454545215511545451mnbhjhjjh'
        }],
    },
    onLoad: function (options) {

    }
});
