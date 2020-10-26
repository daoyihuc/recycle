
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
