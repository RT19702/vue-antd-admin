import request from '@/utils/request'
const api = {
  getData: '/api/dataDictionary',
}
export function getData(params) {
  return request({
    url: api.getData,
    method: 'GET',
    params,
  })
}
