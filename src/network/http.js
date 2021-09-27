import axios from 'axios'


export function request(config, success) {
    const instance = axios.create({
       

        timeout: 200000,

       
    })


    instance.interceptors.request.use(function(config) {
            if (sessionStorage.getItem('token')) {
                config.headers.Authentication = sessionStorage.getItem('token')
            }
            return config
        })
        // 添加拦截器   拦截data以外的数据
        // 响应拦截器
    instance.interceptors.response.use(function(response) {
        // 对响应数据做点什么
        return response.data
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    })

    return instance(config)
}