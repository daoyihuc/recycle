Page({
    data: {

    },
    onLoad: function (options) {

    },
    getUserInfo:function (e) {
        console.log(e);
    },
    onback:function () {
// 在C页面内 navigateBack，将返回A页面
        wx.navigateBack({
            delta: 1
        })
    }
});
