import request from '../utils/request'

export function getContactPhone(){
    return request({
        url:"/config/pt_phone",
        method:'POST'
    })
}

export function getAbout(){
    return request({
        url:"/config/about",
        method:'POST'
    })
}

export function getRule(){
    return request({
        url:"/config/order_as",
        method:'POST'
    })
}

export function wxPay(){
    return request({
        url:"/notify",
        method:'POST'
    })
}

export function getMoney(params){
    return request({
        url:"/get_money",
        params: params,
        method:'POST'
    })
}

export function getBanner(){
    return request({
        url:"/config/banner",
        method:'POST'
    })
}


