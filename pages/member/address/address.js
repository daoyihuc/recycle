import {goRouter} from "../../../utils/macutils";

Page({
    data: {},
    onLoad: function (options) {

    },
    addAddress:function () {
        goRouter("/pages/member/add-address/add-address")
    }
});
