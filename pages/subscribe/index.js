Page({
    data: {
        currentSel: "",
        weightList:[],
        checked: true,
    },
    onLoad: function (options) {
        this.addWeightList();
    },
    sel: function(t) {
        // console.log(t);
        this.setData({
            currentSel:t.target.dataset.count
        });
    },
    addWeightList:function () {

        const as=[];
        for (let i=0;i<4;i++){
            const ad="100-285kg";
            as.push(ad);
        }
        this.setData({
            weightList: as
        })
    },
    onChange(event) {
        this.setData({
            checked: event.detail,
        });
    },


});
