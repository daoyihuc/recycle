const fileList = [] ;
Page({
    data: {
        fileList: [],
    },
    onLoad: function (options) {

    },
    afterRead(event) {
        const { file } = event.detail;

        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        fileList.push({ ...file, url: file.path });
        this.setData({
            fileList: fileList
        })
    },
});
