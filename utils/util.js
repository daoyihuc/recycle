export function onPay(params) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: (result) => {
        resolve(result)
      },
      fail: (error) => {
        reject(error)
      },
    });
  })
};
export function onMap(params) {
  wx.openLocation({
    latitude: params.lat,
    longitude: params.lng,
    scale: 18,
    name: params.name,
    address: params.address,
  });
};
export function onCall(phone) {
  wx.makePhoneCall({
    phoneNumber: phone
  });
};
export function onCopy(str) {
  wx.setClipboardData({
    data: str,
    success(res) {
      wx.getClipboardData({
        success(res) {
          // console.log(res.data) 
        }
      })
    }
  })
};

export function isMobile(mobile) {
  let reg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
  return reg.test(mobile);
};

export function distance(lat1, lng1, lat2, lng2) {
  var lat1 = lat1 * Math.PI / 180.0;
  var lat2 = lat2 * Math.PI / 180.0;
  var La3 = lat1 - lat2;
  var Lb3 = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(Lb3 / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(2);
  s = parseFloat(s) < 1 ? parseFloat(s) * 1000 + 'm' : s + 'km';
  return s;
};
export function formatTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{M}-{d} {h}:{m}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    if ((typeof time === 'string') && (/[\u4e00-\u9fa5]/.test(time))) {
      time = time.replace(/[\u4e00-\u9fa5]/g, '/');
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay()
  }
  const time_str = format.replace(/{(y|M|d|h|m|s|w)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'w') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
};
export function throttle(fn, interval) {
  var enterTime = 0;
  var gapTime = interval || 1000;
  return function () {
    var context = this;
    var backTime = new Date();
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime;
    }
  };
};
export function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 500;
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments;
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
};

export function checkAuth() {
  var curPages = getCurrentPages();
  var curPage = curPages[curPages.length-1];
  var url = '/pages/auth/auth';
  return new Promise((resolve) => {
    wx.checkSession({
      success() {
        if (!wx.getStorageSync("token")) {
          curPage.$router({
            type:curPages.length > 1 ? 'redirect' : 'nav',
            path:url
          })
          curPage.$message("请先授权登录")
          return false
        }
      },
      fail() {
        curPage.$router({
          type:curPages.length > 1 ? 'redirect' : 'nav',
          path:url
        })
        curPage.$message("请先授权登录")
        return false
      }
    })
  })
};