Component({
    properties: {
        newList:Array
    },
    data: {

    },
    methods: {
        onTap(envent) {
            // wx.navigateTo({
            //     url:""
            // });
            let name = envent.currentTarget.dataset.name;
            wx.navigateTo({
                url: "/pages/consult-details/consult-details?id="+name
            })
            console.log(envent)
        }
    }
});
