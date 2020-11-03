
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
                console.log(res);
                resolve(res.userInfo);
            },
            fail(res) {
                console.log(res);
            }
        });
    });
}
// 授权
export function authorize(value) {
    return new Promise((resolve, reject) => {
        wx.authorize({
            scope: value,
            success () {
                resolve("yes");
            },
            fail(){
                reject("no");
            }
        })
    })

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
 // 路由跳转并关闭当前界面
export function goRouterR(url) {
    wx.redirectTo({
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
export function toast(value,number) {
    let icons='success';
    switch (number) {
        case 0:
            icons="success";
            break
        case 1:
            icons="none";
            break
    }
    wx.showToast({
        title: value,
        icon: icons
    });
}
