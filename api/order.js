import request from '../utils/request'

export function createOrder(params){
    return request({
        url:'/order/create',
        params:params,
        method:'POST',
        'content-type':'application/json'
    })
}

export function getList(params){
    return request({
        url:'/user/get_order',
        params:params,
        method:'POST'
    })
}
export function getcancel(params){//新增的
    return request({
        url:'/order/refund',
        params:params,
        method:'POST'
    })
}

export function getOrder(id){
    return request({
        url:'/order/detail/'+id,
        method:'GET'
    })
}

export function deleteOrder(id){
    return request({
        url:'/order/delete/'+id,
        method:'POST'
    })
}

export function addOrder(params){
    return request({
        url:'/order/add',
        params: params,
        method:'POST'
    })
}

export function getRunOrderList(params){
    return request({
        url:'/psy/OrderList',
        params: params,
        method:'POST'
    })
}

// 取件成功
export function getSuccess(params){
    return request({
        url:'/psy/getsuccess',
        params: params,
        method:'POST'
    })
}

// 送件成功
export function sendSuccess(params){
    return request({
        url:'/psy/ordersuccess',
        params: params,
        method:'POST'
    })
}


