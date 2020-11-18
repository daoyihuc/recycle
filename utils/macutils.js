
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
// 获取订阅消息
export function messge() {
   subscribeMessage();
}

function subscribeMessage(){
    //需要订阅的消息模板，在微信公众平台手动配置获取模板ID
    let message = [];
    message=['VVoj1Q31KkVV6AIKVfWOh86lmUi76KUvrF1IjTApwsE',"WofiCxzkm18B1MKq7gu_cfpwPAMF-uNmbcPD394Znls"];
    //如果总是拒绝（subscriptionsSetting，2.10.1库才支持）
    if(this.versionCompare('2.10.1')){
        wx.getSetting({
            withSubscriptions: true,//是否同时获取用户订阅消息的订阅状态，默认不获取
            success: (res)=> {
                console.log(res)
                if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings &&
                    res.subscriptionsSetting.itemSettings[message] == "reject"){
                    //打开设置去设置
                    this.openConfirm('检测到您没打开推送权限，是否去设置打开？')
                }else {
                    wx.requestSubscribeMessage({
                        tmplIds: [message],
                        success: (res)=> {
                            if (res[message] == 'accept'){
                                //用户允许
                            }
                        },
                        fail: (res)=> { console.info(res) },
                    })
                }
            }
        })
    }else if(this.versionCompare('2.4.4')){
        wx.requestSubscribeMessage({
            tmplIds: [message],
            success: (res)=> {
                if (res[message] == 'accept'){
                    //用户允许
                }
            },
            fail: (res)=> { console.info(res) },
        })
    }
}
//打开设置
 function openConfirm(message) {
    wx.showModal({
        content: message,
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
            //点击“确认”时打开设置页面
            if (res.confirm) {
                wx.openSetting({
                    success: (res) => {
                        console.log(res.authSetting)
                    },
                    fail: (error) => {
                        console.log(error)
                    }
                })
            } else {
                console.log('用户点击取消')
            }
        }
    });
}
//基础库版本比较
function versionCompare(v) {
    const version = wx.getSystemInfoSync().SDKVersion
    if (this.compareVersion(version, v) >= 0) {
        return true
    } else {
        return false
    }
}
