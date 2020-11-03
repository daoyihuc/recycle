import {goRouter} from "./macutils";


const request = function (params) {
    !params.params && (params.params = {});
    wx.getStorageSync('token') && (params.params.token = wx.getStorageSync('token'))
    !params.showLoad && wx.showLoading({
        title: '正在加载...',
        mask: true,
    });
    params.showLoad && wx.showNavigationBarLoading();
    let currentPage = getCurrentPages()[getCurrentPages().length-1];
    return new Promise((resolve, reject) => {
        wx.request({
            url:  params.url,
            data: params.params || {},
            header: {
                'content-type': params['content-type'] || params.method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
                token:wx.getStorageSync('token')
            },
            method: params.method,
            success: function (res) {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                resolve(res.data);
                if(res.data.data===3){
                    goRouter("/pages/login/login")
                }
                console.log(res);
            },
            fail: function (e) {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                reject(e);
                // dsadadda
            },
        })
    });
}

export default request
