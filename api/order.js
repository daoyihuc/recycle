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
// 商品列表
export function GoodsList(params) {
    return request({
        url: API.GoodsList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 商品详情信息
export function GoodsDetail(params) {
    return request({
        url: API.GoodsDetail,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 确认下单
export function CheckOrder(params) {
    return request({
        url: API.CheckOrder,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 提交 订单
export function Done(params) {
    return request({
        url: API.Done,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 商城订单列表
export function OrderList(params) {
    return request({
        url: API.OrderList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 订单详情
export function OrderDetail(params) {
    return request({
        url: API.OrderDetail,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 商城订单取消
export function CancelGoodsOrder(params) {
    return request({
        url: API.CancelGoodsOrder,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 确认收获
export function ComfirmGoodsOrder(params) {
    return request({
        url: API.ComfirmGoodsOrder,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 我的
export function Mine(params) {
    return request({
        url: API.Mine,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 明细
export function AmountDetails(params) {
    return request({
        url: API.AmountDetails,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 体现
export function Withdrawal(params) {
    return request({
        url: API.Withdrawal,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收员登录
export function AdminLogin(params) {
    return request({
        url: API.AdminLogin,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收预约订单列表
export function AdminAppointmentList(params) {
    return request({
        url: API.AdminAppointmentList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收员接单
export function ReceivingOrders(params) {
    return request({
        url: API.ReceivingOrders,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收预约订单列表
export function UpdateOrderStatus(params) {
    return request({
        url: API.UpdateOrderStatus,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收预约订单详情
export function AdminAppointmentDetail(params) {
    return request({
        url: API.AdminAppointmentDetail,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 管理员回收分类
export function AdminCategoryList(params) {
    return request({
        url: API.AdminCategoryList,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收员称重获取单品价格接口
export function OrderWeightPrice(params) {
    return request({
        url: API.OrderWeightPrice,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 回收员称重提交接口
export function OrderWeight(params) {
    return request({
        url: API.OrderWeight,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 预约中心接口
export function BookingCenter(params) {
    return request({
        url: API.BookingCenter,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 邀请有礼
export function PoliteInvitation(params) {
    return request({
        url: API.PoliteInvitation,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 提交门店信息接口
export function ApplyStore(params) {
    return request({
        url: API.ApplyStore,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 判断该二维码是否绑定门店接口
export function ApplyStoreStatus(params) {
    return request({
        url: API.ApplyStoreStatus,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}
// 通过二维码ID获取门店地址信息
export function GetStoreAddress(params) {
    return request({
        url: API.GetStoreAddress,
        method: "POST",
        params: params,
        'content-type':'application/json'
    })
}

