import request from 'request'
var originPage = Page

function MyPage(config) {
    config.$request = request;
    config.$message = message;
    config.$router = router;
    config.catchEvent = function(){};
    // config.$route = Object.assign(getCurrentPages()[getCurrentPages().length-1],{routes: getCurrentPages()});
    config.onPullDownRefresh = function() {
        getCurrentPages()[getCurrentPages().length-1].onLoad(getCurrentPages()[getCurrentPages().length-1].options);
        wx.stopPullDownRefresh()
    };
    config.onShareAppMessage = function (event) {
        let params = "?",
            options = getCurrentPages()[getCurrentPages().length - 1].options;
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                params += key + "=" + options[key] + "&";
            }
        }
        let obj = {
            path: "/" + getCurrentPages()[getCurrentPages().length - 1].route + params
        }
        return obj;
    }
    originPage(config)
}

function message(options) {
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    if ('error' !== options.type) {
        wx.showToast({
            title: options.message,
            icon: options.type || 'none',
            duration: options.duration || 1200,
            mask: options.mask || false,
            complete: function () {
                options.route &&
                    setTimeout(() => {
                        router(options.route)
                    }, options.duration || 1200)
            }
        })
    } else {
        wx.showModal({
            title: options.title || '温馨提示',
            content: options.message,
            showCancel: options.showCancel || false,
            cancelText: options.cancelText || '取消',
            cancelColor: options.cancelColor || '#000000',
            confirmText: options.confirmText || '确定',
            confirmColor: options.confirmColor || '#576B95',
            complete: function () {
                options.route &&
                    setTimeout(() => {
                        router(options.route)
                    }, options.duration || 1200)
            }
        });
    }
};

function router(route) {
    if (route.currentTarget) {
        route = {
            path: route.currentTarget.dataset.url,
            type: route.currentTarget.dataset.type
        }
    }
    if (route.query) {
        let params = "?";
        let options = route.query;
        for (const key in options) {
            console.log(typeof options[key]);
            if (options.hasOwnProperty(key) && 'object' !== typeof options[key]) {
                params += params === '?' ? key + "=" + options[key] : "&" + key + "=" + options[key]
            } else {
                params += params === '?' ? key + "=" + JSON.stringify(options[key]) : "&" + key + "=" + JSON.stringify(options[key])
            }
        }
        route.query && (route.path += params)
    }
    let wxArr = ['navigateTo', 'navigateBack', 'redirectTo', 'switchTab', 'reLaunch']
    let typeArr = ['nav', 'back', 'redirect', 'switch', 'reLaunch']
    let index = typeArr.indexOf(route.type || 'nav');
    if (route.type === 'back') {
        let delta = route.delta || 1
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - (delta + 1)]
        route.pageData && prevPage.setData(route.pageData)
        route.refresh && prevPage.onLoad(prevPage.options)
        wx.navigateBack(route)
    } else {
        var _app = getApp();
        if(_app.globalData.isNav) return console.log("正在跳转");
        _app.globalData.isNav = true;
        wx[wxArr[index]]({
            url: route.path,
            // events: {
            //     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            //     passDataToPage: function (data) {
            //         console.log(data)
            //     }
            // },
            success: (res) => {
                // route.passData && res.eventChannel.emit('passDataToPage', route.passData)
                _app.globalData.isNav = false;
            },
            fail: () => {
                wx.switchTab({
                    url: route.path,
                    fail: () => {
                        wx.redirectTo({
                            url: route.path,
                            complete:()=>{
                                _app.globalData.isNav = false;
                            }
                        });
                    },
                    success:()=>{
                        _app.globalData.isNav = false;
                    }
                });
            }
        })
    }
};

function page(config) {
    return new MyPage(config)
}
Page = page