/**
 * @author 侯欣榆
 * @date 2019-10-30 22:49
 * @Description:
 */

import axios from "axios"

if (process.env.NODE_ENV === "development") {
    //开发环境
} else {
    //生产环境
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log("-----interceptors-----", config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 *
 * @param url--->{path:"/test", type:"get"}   url地址
 * @param param  参数
 */
function http(url, param) {
    let pro = new Promise((resolve, reject) => {
        axios({
            method: url.type,
            url: url.path,
            data: {
                ...param
            }
        })
            .then((result) => {
                resolve(result);
            })
            .catch(reason => {
                reject(reason)
            });

    })

    return pro

}

export default http;
