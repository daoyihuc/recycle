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
// 资讯详情
export function NewDetail(params) {
    return request({
        url: API.NewDetail,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 预约界面信息展示接口
export function AppointmentShow(params) {
    return request({
        url: API.AppointmentShow,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 添加地址接口
export function AddAddress(params) {
    return request({
        url: API.AddAddress,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 地址详情
export function AddressInfo(params) {
    return request({
        url: API.AddressInfo,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 地址编辑
export function EditAddress(params) {
    return request({
        url: API.EditAddress,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}

// 地址列表
export function AddressList(params) {
    return request({
        url: API.AddressList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 地址删除
export function AddressDelete(params) {
    return request({
        url: API.AddressDelete,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 立即预约接口
export function MakeAnAppointmentNow(params) {
    return request({
        url: API.MakeAnAppointmentNow,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}





