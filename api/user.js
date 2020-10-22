import request from '../utils/request'

export function getUserInfo(params){
    return request({
        url:"/login",
        params:params,
        method:'POST'
    })
}

export function getPhoneNumber(params){
    return request({
        url:"/user/bind_mobile",
        params:params,
        method:'POST'
    })
}

export function updatePhoneNumber(params){
    return request({
        url:"/user/edit_mobile",
        params:params,
        method:'POST'
    })
}