Page({
    data: {
        urlq:""
    },
    onLoad: function (options) {
        const a=options.urls;
        this.setData({
                url: a
        }
        )
    }
});
