import request from '@/utils/request'
const api = {
  getData: '/dataDictionary',
  addDict: '/dataDictionary',
}
export function getData(params) {
  return request({
    url: api.getData,
    method: 'GET',
    params,
  })
}
// 新增公告
export function addDict(data) {
  return request({
    url: api.addDict,
    method: 'POST',
    data,
  })
}
