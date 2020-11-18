import {CategoryList} from "../../../api/order";

// 引入SDK核心类
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var that;
Page({
    data: {
        List:[],
        img:""
    },
    onLoad: function (options) {
        that=this;
        qqmapsdk = new QQMapWX({
            key: 'ORNBZ-U2M3U-VGLV2-2DLG2-SUH7V-5IFPD'
        });
        this.getLocationName();
    },
    // 获取位置
    getLocationName:function () {
        wx.getLocation({
            success: function(res) {
                console.log(res)

                // 调用sdk接口
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: function (res) {
                        //获取当前地址成功
                        console.log(res.result.address);
                        that.getArea(res.result.address);
                        // that.setData({
                        //     address: res.result.address
                        // });
                    },
                    fail: function (res) {
                        console.log(res);
                        // toast("地址获取成功");
                    }
                });
            },
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
        this.setData({
            Province: area.Province,
            City: area.City,
            Country: area.Country,
            street: area.street
        })
        const a={
            token: wx.getStorageSync("TOKEN"),
            district_name: area.Country
        }
        this.httpClass(a);
        return area;
    },

    httpClass:function (params) {
        CategoryList(params).then(res=>{
            console.log(res);
            const a={
                id: 1,
                image: "http://fgadmin.996sh.com/assets/img/qrcode.png",
                name: "官方新闻",
                NextList: [
                    {
                        id: 3,
                        image: "http://fgadmin.996sh.com/assets/img/qrcode.png",
                        name: "微信公众号",
                        price: "1.00"
                    }
                ]
            }
            // let arr=[];
            // for(let i=0;i<res.data.List.length;i++){
            //     arr.push(res.data.List[i].name);
            // }
            let as=[];
            as.push(a);
            that.setData({
                List: res.data.List,
                img: "https://cdn.jsdelivr.net/gh/daoyihuc/recyclerresouce@1.9/first23.png"
            })
        });
    }
});
