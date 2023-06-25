export default [
  {
    name: '工作台',
    icon: 'dashboard',
    path: '/dashboard',
    children: [],
  },
  {
    name: '管理列表',
    icon: 'file',
    children: [
      {
        name: '用户管理',
        path: '/user',
      },
      {
        name: '文章管理',
        path: '/articles',
      },
      {
        name: '公告管理',
        path: '/notices',
      },
    ],
  },
  {
    name: '门户管理',
    icon: 'heat-map',
    children: [
      {
        name: '字典管理',
        path: '/dictionary',
      },
    ],
  },
]
