import request from '@/utils/request'

/* 登录 */
export function loginApi(data) {
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}