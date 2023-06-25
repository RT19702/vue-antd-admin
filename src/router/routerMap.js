export default [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('@/views/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/userProfile/ProfilePage.vue'),
      },
      {
        path: '/articles',
        name: 'articles',
        component: () => import('@/views/administerList/ArticleList.vue'),
      },
      {
        path: '/notices',
        name: 'notices',
        component: () => import('@/views/administerList/NoticeList.vue'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/dictionary',
        name: 'notices',
        component: () => import('@/views/administerList/DictionaryList.vue'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/administerList/UserList.vue'),
        meta: {
          keepAlive: true,
        },
      }
    ],
  },
  {
    // 登录页
    path: '/login',
    name: 'SignInForm',
    component: () => import('@/views/login/SignInForm.vue'),
  },
]
