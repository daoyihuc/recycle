import {authorize, toast} from "../../../utils/macutils";
import {getAddress} from "../../../api/app";
import Toast from '@vant/weapp/toast/toast';

var that="";
var columnW=[];
var columns=[];
Page({
    data: {
        Province: "",
        City: '',
        Country: '',
        street: '',
        columns: [],
        show: false,
    },
    onLoad: function (options) {

         columns=[
            {
                key: "name",
                values: "",
                className: 'column1',
            },
            {
                key: "name",
                values: '',
                className: 'column2',
                defaultIndex: 2,
            },
            {
                key: "name",
                values: '',
                className: 'column3',
            }
        ]

        that=this;
         this.getAddr();
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
        this.setData({
            Province: area.Province,
            City: area.City,
            Country: area.Country,
            street: area.street
        })

        return area;
    },
    // 选择器
    openSelect:function () {
        const b=true;
        that.getAddr();
        this.setData({
            show: b
        })
    },
    onConfirm(event) {
        const a= event.detail;
        // Toast(`当前值：${value[0].name}+${value[1].name}+${value[2].name}, 当前索引：${index}`);
        this.setData({
            Province: a.value[0].name,
            City:  a.value[1].name,
            Country:  a.value[2].name,
            show: false
        })
    },

    onCancel() {
        this.setData({
            show: false
        })
    },
    onChange(event) {
        const { picker, value, index } = event.detail;
        console.log(event.detail);
        console.log(picker.getColumnIndex(index));
        let columnIndex = picker.getColumnIndex(index);
        switch (index) {
            case 0:
                picker.setColumnValues(1, columnW[columnIndex].list);
                let columnValues1 = picker.getColumnValues(1);
                console.log(columnValues1);
                picker.setColumnValues(2, columnValues1[0].list);
                break;
            case 1:
                let columnValues = picker.getColumnValues(index);
                console.log(columnValues);
                picker.setColumnValues(2, columnValues[columnIndex].list);
                break;
        }

    },
    getAddr:function () {
        getAddress().then(res=>{
            console.log(res);
            columnW=res.data;
            columns[0].values=res.data;
            columns[1].values=res.data[0].list;
            columns[2].values=res.data[0].list[0].list;
            this.setData({
                columns: columns
            });
        })
    }
});
