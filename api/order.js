import request from '../utils/request'
import {API} from "../config/constans";


// 预约列表
export function AppintmentList(params){
    return request({
        url: API.AppintmentList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 预约详情
export function AppintmentDetail(params){
    return request({
        url: API.AppintmentDetail,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 订单取消接口
export function CancelOrder(params){
    return request({
        url: API.CancelOrder,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 用户预约订单确认完成接口
export function ComfirmFinished(params){
    return request({
        url: API.ComfirmFinished,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 分类
export function CategoryList(params){
    return request({
        url: API.CategoryList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// 指南
export function RecyclingList(params){
    return request({
        url: API.RecyclingList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    });
}
// my邀请
export function MyInvitation(params) {
    return request({
        url: API.MyInvitation,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// recycle排行List
export function RankingList(params) {
    return request({
        url: API.RankingList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// opinion反馈
export function FeedBack(params) {
    return request({
        url: API.FeedBack,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// shopIndex
export function GoodsIndex(params) {
    return request({
        url: API.GoodsIndex,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
