import {authorize, back, toast} from "../../../utils/macutils";
import {AddAddress, getAddress} from "../../../api/app";
import Toast from '@vant/weapp/toast/toast';

var that="";
var columnW=[];
var columns=[];
var adata={
    token: "",
    province: "",
    city: "",
    district: "",
    street: "",
    address: "",
    contacts: "",
    mobile: "",
    is_default: ""
};
Page({
    data: {
        Province: "",
        City: '',
        Country: '',
        street: '',
        columns: [],
        show: false,
        details: "",
        user:'',
        mobile: '',
        checked: false
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
        ];
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
    // 地址确认
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
    // 取消地址选择
    onCancel() {
        this.setData({
            show: false
        })
    },
    // 地址拖动改变
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
    // 设置默认地址
    onChangeCheck({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked: detail });
    },
    // 请求网络地址
    getAddr:function () {
        getAddress().then(res=>{
            console.log(res);
            columnW=res;
            columns[0].values=res;
            columns[1].values=res[0].list;
            columns[2].values=res[0].list[0].list;
            this.setData({
                columns: columns
            });
        })
    },
    // 地址添加
    HttpAddress:function (params) {
        AddAddress(params).then(res=>{
            console.log(res);
            if(res.code){
                back(1);
            }
        });
    },
    // 地址添加事件
    AddEnvent:function () {
        adata.token=wx.getStorageSync("token");
        adata.province=this.data.Province;
        adata.city=this.data.City;
        adata.district=this.data.Country;
        adata.street=this.data.street;
        adata.address=this.data.details;
        adata.contacts=this.data.user;
        adata.mobile=this.data.mobile;
        adata.is_default=this.data.checked?1:0;
        if(adata.token===""){
            toast("请前往登录",1);
        }else if(adata.province===""){
            toast("请选择省市区",1);
        }else if(adata.address===""){
            toast("请填写详细地址",1);
        }
        else if(adata.contacts===""){
            toast("请输入联系人",1);
        }else if(adata.mobile===""){
            toast("请输入手机号",1);
        }else if(this.checkPhone(adata.mobile)){
            toast("手机号码有误，请重填",1);
        }else{
           this.HttpAddress(adata);
        }
        console.log("请求数据",adata);
    },
    // 手机号检验
    checkPhone:function(phone) {
        if (!(/^1(3|4|5|7|8|9|6)\d{9}$/.test(phone))) {
            return true;
        }else{
            return false;
        }
    },
    // 详细位置
    ondetails(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            details: event.detail
        })
    },
    // 联系人
    onuser(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            user: event.detail
        })
    },
    // 手机号
    onmobile(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            mobile: event.detail
        })
    },
    // 街道
    onstreet(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
        this.setData({
            street: event.detail
        })
    },

});
