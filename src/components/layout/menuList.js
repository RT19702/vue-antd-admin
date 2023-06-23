export default [
  {
    id: 1,
    name: '工作台',
    icon: 'dashboard',
    path: '/dashboard',
    children: [],
  },
  {
    id: 2,
    name: '管理列表',
    icon: 'file',
    children: [
      {
        id: 3,
        name: '文章管理',
        path: '/articles',
      },
      {
        id: 4,
        name: '公告管理',
        path: '/notices',
      },
    ],
  },
  {
    id: 5,
    name: '门户管理',
    icon: 'heat-map',
    children: [
      {
        id: 6,
        name: '字典管理',
        path: '/dictionary',
      },
    ],
  },
]
