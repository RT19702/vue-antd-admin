import Mock from 'mockjs'

const NoticeList = Mock.mock({
  'list|30': [
    {
      'id|+1': 1,
      notice_title: '@ctitle(5, 10)',
      notice_content: '@cparagraph(2, 4)',
      created_time: '@datetime',
      owner_str: '@cname',
      notice_type: '@pick(["1", "2"])',
    },
  ],
})

// Mock API
Mock.mock('/mock/notice', 'get', () => {
  return {
    code: 0,
    status: 'success',
    msg: '获取成功',
    data: NoticeList.list,
  }
})
