
var listItems=[];
Page({
    data: {
        active:0,
        listItem:[]
    },
    onLoad: function (options) {
        this.listItem();
    },
    onChange(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none',
        });
    },
    onReachBottom:function () {
        this.listItem();
    },
    // 测试
    listItem:function () {
        const test = {
            image: "https://cs17.appios.cn/uploads/20200731/3d5cf83e0deee46995454e0976d845df.jpg",
            name: "端午节|“粽”于等到你",
            desc: "端午安康！来康康粽叶垃圾分类小科普吧",
            read: "222",
            comment: "54",
            createtime: "2020/07/14"
        }
        const list = [];
        listItems.push(test);
        listItems.push(test);
        listItems.push(test);
        listItems.push(test);

        this.setData({
            listItem: listItems
        })
        console.log(listItems);
    }
});
