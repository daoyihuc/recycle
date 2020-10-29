import request from '../utils/request'

export function getAddressList(id){
    return request({
        url:"/user/AddesList",
        method:'GET',
        params: {"type": id}
    })
}

export function getAddressDetail(id){
    return request({
        url:"/address/detail",
        method:'GET',
        params: {"id": id}
    })
}

export function saveAddress(params){
    return request({
        url:"/add/addres",
        method:'POST',
        params: params
    })
}

export function editAddress(params){
    return request({
        url:"/Edit/addres",
        method:'POST',
        params: params
    })
}


export function delAddress(params){
    return request({
        url:"/addres/show",
        method:'POST',
        params: params
    })
}

export function addresData(params){
    return request({
        url:"/config/addres_data",
        method:'POST',
        params: params
    })
}
