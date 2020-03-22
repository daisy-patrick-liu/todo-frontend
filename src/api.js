import axios from 'axios'
import qs from 'qs'

// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = 'http://localhost:3000';
// }else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'http://v.juhe.cn';
// }else if (process.env.NODE_ENV == 'production') {   
//     axios.defaults.baseURL = 'http://v.juhe.cn';
// }

if (process.env.NODE_ENV != 'development') {   
    axios.defaults.baseURL = 'http://172.105.51.30:3000';
}

// 设置头部信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 全局设置超时时间
axios.defaults.timeout = 10000;

// 请求路由拦截，可以做一些用户合法验证
axios.interceptors.request.use(function (config) {
    // 一般在这个位置判断token是否存在
    return config;
   }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function (response){
    // 处理响应数据
   if (response.status === 200) {            
       return Promise.resolve(response);        
   } else {            
       return Promise.reject(response);        
   }
   }, function (error){
   // 处理响应失败
   return Promise.reject(error);
});

// 封装get请求
export function get(url, params={}){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}

// 封装post请求
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, qs.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}