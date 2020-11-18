import {authorize, toast} from "../../utils/macutils";

var that;

var aDatas={
    name: "", //店铺名称
    username: "", // 姓名
    phone: "", // 手机
    address: "", // 详细地址
    Province: "", // 省
    City: "", // 市
    Country: "", // 区
    street: "", // 街道
    img: "", // base64图片
    type: "" // 类型
};
var FSM = wx.getFileSystemManager();
Page({
    data: {
        Province: "",
        City: "",
        Country: "",
        street: "",
        img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@2.2/first-202@2x.png"
    },
    onLoad: function (options) {
        that=this;
    },
    // 地图选择位置
    openMap:function () {
        console.log("被点击");
        authorize("scope.userLocation").then( res =>{
            if(res === "yes"){
                wx.getLocation({
                    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                    success (res) {
                        const latitude = res.latitude
                        const longitude = res.longitude

                        wx.chooseLocation({
                            latitude,
                            longitude,
                            success:function(res) {
                                console.log(res);
                                let area = that.getArea(res.address);
                                console.log('省市区',area);
                            },
                        });
                    }
                })
            }else{
                toast("请先授权哦");
            }

        })

    },
    //省市区截取
    getArea: function(str) {
        let area = {}
        let index11 = 0
        let index1 = str.indexOf("省")
        if (index1 == -1) {
            index11 = str.indexOf("自治区")
            if (index11 != -1) {
                area.Province = str.substring(0, index11 + 3)
            } else {
                area.Province = str.substring(0, 0)
            }
        } else {
            area.Province = str.substring(0, index1 + 1)
        }

        let index2 = str.indexOf("市")
        if (index11 == -1) {
            area.City = str.substring(index11 + 1, index2 + 1)
        } else {
            if (index11 == 0) {
                area.City = str.substring(index1 + 1, index2 + 1)
            } else {
                area.City = str.substring(index11 + 3, index2 + 1)
            }
        }

        let index3 = str.lastIndexOf("区")
        if (index3 == -1) {
            index3 = str.indexOf("县")
            area.Country = str.substring(index2 + 1, index3 + 1)
        } else {
            area.Country = str.substring(index2 + 1, index3 + 1)
        }
        if(index3<str.length){
            area.street = str.substring(index3+1,str.length);
        }
        aDatas.Province=area.Province;
        aDatas.City=area.City;
        aDatas.Country=area.Country;
        aDatas.street=area.street;
        this.setData({
            Province: area.Province,
            City: area.City,
            Country: area.Country,
            street: area.street
        })

        return area;
    },
    afterRead(event) {
        const file  = event.detail;
        let a="";
        // reader.onload = () => {
        //     a += reader.result.toString().split(',')[1] + ',';
        // };
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        // fileList.push({...file, url: file.file.url });
        console.log("daoyi",file.file.url);
        FSM.readFile({
            filePath: file.file.url,
            encoding: "base64",
            success: function(data) {
                console.log(data.data);
                aDatas.img=data.data
                // toast(data.data);
            }
        });

        this.setData({
            img: file.file.url
        });
    },
    // 姓名
    getUsername:function (e) {
        console.log(e.detail);
        // this.setData({
        //     password: e.detail
        // });
        aDatas.username=e.detail;
    },
    getUsername1:function(e){
        console.log(e.detail);
        // this.setData({
        //     password: e.detail.value
        // });
        aDatas.username=e.detail.value;
    },
    // 店铺姓名
    getName0:function (e) {
        console.log(e.detail);
        // this.setData({
        //     password: e.detail
        // });
        aDatas.name=e.detail;
    },
    getName1:function(e){
        console.log(e.detail);
        // this.setData({
        //     password: e.detail.value
        // });
        aDatas.name=e.detail.value;
    },
    // 店铺手机
    getphone:function (e) {
        console.log(e.detail);
        // this.setData({
        //     password: e.detail
        // });
        aDatas.phone=e.detail;
    },
    getphone1:function(e){
        console.log(e.detail);
        // this.setData({
        //     password: e.detail.value
        // });
        aDatas.phone=e.detail.value;
    },
    // 店铺地址
    getAddress:function (e) {
        console.log(e.detail);
        // this.setData({
        //     password: e.detail
        // });
        aDatas.address=e.detail;
    },
    getAddress1:function(e){
        console.log(e.detail);
        // this.setData({
        //     password: e.detail.value
        // });
        aDatas.address=e.detail.value;
    },
    // 店铺类型
    getType:function (e) {
        console.log(e.detail);
        // this.setData({
        //     password: e.detail
        // });
        aDatas.type=e.detail;
    },
    getType1:function(e){
        console.log(e.detail);
        // this.setData({
        //     password: e.detail.value
        // });
        aDatas.type1=e.detail.value;
    },
});
