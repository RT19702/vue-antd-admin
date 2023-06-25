import request from '@/utils/request'

/* 登录 */
export function loginApi(data) {
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}

// 用户列表
export function getUserListApi(data) {
  return request({
    url: '/api/admin/user',
    method: 'GET',
    params: data
  })
}

// 用户详情
export function getUserDetailApi(id) {
  return request({
    url: `/api/admin/user/${id}`,
    method: 'GET'
  })
}

// 启用用户
export function enableUserApi(id) {
  return request({
    url: `/api/admin/user/enable/${id}`,
    method: 'POST'
  })
}

// 禁用用户
export function disableUserApi(id) {
  return request({
    url: `/api/admin/user/disable/${id}`,
    method: 'POST'
  })
}

// 重置用户密码
export function resetUserPasswordApi(id) {
  return request({
    url: `/api/admin/user/resetpwd/${id}`,
    method: 'PUT'
  })
}