import Mock from 'mockjs'
import '@/mock/user'
import '@/mock/list'

// 设置全局延时
Mock.setup({
  timeout: '200-400'
})
