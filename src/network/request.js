import { request } from './http'

//获取数据
export function getdata(url, params) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}

