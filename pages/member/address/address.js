import {goRouter} from "../../../utils/macutils";
import {AddressList} from "../../../api/app";

var aData={
    token: "",
    Page: 1,
    PageSize: 10,
};
Page({
    data: {},
    onLoad: function (options) {
        aData.token=wx.getStorageSync("token");
        this.HttpAddresList(aData);
    },
    addAddress:function () {
        goRouter("/pages/member/add-address/add-address")
    },
    // 地址列表
    HttpAddresList:function (params) {
        AddressList(params).then(res=>{
           console.log(res);
        });
    }
});
