import request from '@/utils/request'

/* 文章列表 */
export function getList(params) {
  return request({
    url: '/api/admin/article',
    method: 'GET',
    params
  })
}

/* 文章启用 */
export function enableArticle(id) {
  return request({
    url: `/api/admin/article/enable/${id}`,
    method: 'POST'
  })
}

/* 文章禁用 */
export function disableArticle(id, data) {
  return request({
    url: `/api/admin/article/disable/${id}`,
    method: 'POST',
    data
  })
}

/* 文章详情 */
export function getArticle(id) {
  return request({
    url: `/api/admin/article/${id}`,
    method: 'GET'
  })
}

/* 审核通过文章 */
export function passArticle(id) {
  return request({
    url: `/api/admin/article/pass/${id}`,
    method: 'POST'
  })
}

/* 审核驳回文章 */
export function rejectArticle(id, data) {
  return request({
    url: `/api/admin/article/noPass/${id}`,
    method: 'POST',
    data
  })
}