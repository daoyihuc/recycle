import request from '../utils/request'
import {API} from "../config/constans";


// address 地址获取
export function getAddress(){
    return request({
        url:"https://cdn.jsdelivr.net/gh/daoyihuc/recycle@1.6/areas.json",
        method:'GET'
    })
}

// 微信授权登录接口
export function WxLogin(params) {
    return request({
        url: API.wxlogin,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}

// 资讯列表接口
export function NewList(params) {
    return request({
        url: API.NewList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 首页接口
export function Index(params) {
    return request({
        url: API.Index,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}


