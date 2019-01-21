/**
 * 存款开户
 */
const g001001001Router = {
  path: '001001001',
  redirect: '/',
  name: '001001001',
  meta: {
    title: '存款开户'
  },
  children: [
    {
      path: '461010',
      component: () => import('@/views/001/001001/001001001/index'), // Parent router-view
      name: 'G001G001G001T461010',
      meta: { title: '个人外汇存款开户' }
    },
    {
      path: '461011',
      name: '001001001461011',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '个人本币活期开户' }
    }
  ]
}

export default g001001001Router
