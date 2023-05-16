import Mock from 'mockjs'

/* 最新用户动态 */
const generateUserActivity = () => {
  const userAvatar = Mock.Random.image('48x48', Mock.Random.color(), '#FFF', 'Avatar')
  const userName = Mock.Random.cname()
  const actionTime = Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
  const actionProject = Mock.Random.word()
  const actionInfo = Mock.Random.sentence(5, 10)

  return {
    userAvatar,
    userName,
    actionTime,
    actionProject,
    actionInfo,
  }
}

// Mock API
Mock.mock('/api/userActivity', 'get', () => {
  const userActivity = []
  for (let i = 0; i < 10; i++) {
    userActivity.push(generateUserActivity())
  }
  return {
    code: 0,
    status: 'success',
    msg: '获取成功',
    data: userActivity
  }
})