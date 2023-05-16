import request from '@/utils/request'

// 获取公告列表
export function getNoticeApi(params) {
  return request({
    url: '/api/notice',
    method: 'GET',
    params,
  })
}
// 新增公告
export function addNoticeApi(data) {
  return request({
    url: '/api/notice',
    method: 'POST',
    data,
  })
}
// 编辑公告
export function updateNoticeApi(id, data) {
  return request({
    url: `/api/notice/${id}`,
    method: 'PUT',
    data,
  })
}
// 删除公告
export function deleteNoticeApi(id) {
  return request({
    url: `/api/notice/${id}`,
    method: 'DELETE',
  })
}
// 启用公告
export function enableNoticeApi(id) {
  return request({
    url: `/api/enableNotice/${id}`,
    method: 'POST',
  })
}
// 禁用公告
export function disableNoticeApi(id) {
  return request({
    url: `/api/deactivateNotice/${id}`,
    method: 'POST',
  })
}