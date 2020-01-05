import axios from 'axios'

export default function(vm){
  // 用于拦截请求和响应
  axios.interceptors.request.use(config => {
    // 获取token
    const token = localStorage.getItem('token')
    if(token){
      // bearer token 规范  对应后台的 json Web Token规范
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  })
  // 响应拦截器 参数1表示成功的响应(不做任何处理) 参数2失败处理
  axios.interceptors.response.use(null, err => {
    if(err.response.status === 401){
      // 清空localStorage， 改变vuex
      vm.$store.dispatch('logout')
      // 跳转到登录
      vm.$router.push('/login') 
    }
    return Promise.reject(err)
  })
}