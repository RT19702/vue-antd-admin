import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

import { message } from 'ant-design-vue'

const request = axios.create({
  // baseURL: 'http://iwebapi.zlhranhou.com/public/index.php',
  // baseURL: 'http://localhost:3000',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 进度条开始
    nprogress.start()
    return config
  },
  (error) => {
    return error
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (res) {
    // 进度条结束
    nprogress.done()

    const response = res.data

    if (response.status === 'success' && Number(response.code) === 0) {
      return Promise.resolve(response.data)
    } else {
      console.log(
        '%c [ response ]-34',
        'font-size:15px; background:#f9e390; color:#ffffd4;',
        response
      )
      message.error(response.message)
    }
    return response
  },
  function (error) {
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default request
