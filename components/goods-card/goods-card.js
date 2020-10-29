Component({
    properties: {
        goodlist: Array,
    },
    data: {},
    methods: {
        jump: function(n) {
            wx.navigateTo({
                url: "/pages/goods-details/index?id=" + n
            });
        }
    }
});
