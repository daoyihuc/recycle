import config from '../config/index'
import store from '../store/index'

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
            url: config.BASE_URL + params.url,
            data: params.params || {},
            header: {
              'content-type': params['content-type'] || params.method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
              token:wx.getStorageSync('token')
            },
            method: 'POST',
            success: function (res) {
                !params.showLoad && wx.hideLoading();
                params.showLoad && wx.hideNavigationBarLoading();
                console.log(res);
                if (200 === res.statusCode) {
                    if (200 === res.data.code || 1 === res.data.code) {
                        resolve(res.data.info || res.data)
                        console.log(res)
                    } else if (405 === res.data.code || -1 === res.data.code) {
                        currentPage.$message({message:res.data.msg, type:'error', route:{type:'back'}})
                    } else if (401 === res.data.code || 403 === res.data.code || 402 === res.data.code) {
                        store.user.removeUserInfo(),currentPage.$message({message:"请先授权登陆", route:{type:'nav',path:"/pages/auth/auth"}})
                    } else {
                        currentPage.$message(res.data.msg)
                    }
                }else{
                    currentPage.$message('网络请求失败！');
                }
            },
            fail: function (e) {
                !params.showLoad && wx.hideLoading();
                params.showLoad && wx.hideNavigationBarLoading();
                currentPage.$message('网络请求超时！');
                reject(e);
            }, 
        })
    });
}

export default request