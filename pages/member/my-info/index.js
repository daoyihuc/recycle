import Toast from '@vant/weapp/toast/toast';
Page({
    data: {
        columns: ['男', '女'],
        show: true,
        sex: ''
    },
    onLoad: function (options) {

    },
    onConfirm(event) {
        const { picker, value, index } = event.detail;
        Toast(`当前值：${value}, 当前索引：${index}`);
        this.setData({
            show: false,
            sex: value
        })
    },

    onCancel() {
        Toast('取消');
        this.setData({
            show: false
        });
    },
    selectSex(){
        this.setData({
            show: true
        });
    }

});
