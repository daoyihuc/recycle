
// 登录
export function wxLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success:function (res) {
                const  a= {
                    status: 0x11,
                    code: ""
                };
                if(res.code){
                    a.status=0x11;
                    a.code=res.code;
                    resolve(a);
                }else{
                    a.status=0x12;
                    a.code="";
                    reject(a);
                }
            }
        })
    });
}
// 获取用户信息
export function getUserinfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success:function (res) {
                resolve( res.userInfo);

            }
        });
    });
}

// 获取授权信息
export function getSetting(isSub) {
    return new Promise( (resolve ,reject) => {
        wx.getSetting({
            withSubscriptions: isSub,
            success(res){
                resolve(res);
            },
            fail(){
                reject("网络出现错误了")
            }
        });
    })

}
// 获取定位信息
export function getLocation() {
    return new Promise((resolve, reject) =>{
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
               resolve(res);
            },
            fail(){
                reject('0x12');
            }
        })
    })
}
 // 路由跳转
export function goRouter(url) {
     wx.navigateTo({
        url: url
    })
}
// 返回上一页
export function back(number) {
    wx.navigateBack({
        delta: number
    })
}
// toast 提示
export function toast(value) {
    wx.showToast({
        title: value
    });
}
