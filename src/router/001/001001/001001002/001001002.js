/**
 * 借贷转账
 */
const g001001002Router = {
  path: '001001002',
  redirect: '/',
  name: '001001002',
  meta: {
    title: '借贷转账'
  },
  children: [
    {
      path: '461020',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '001001002461020',
      meta: { title: '个人外汇转账' }
    },
    {
      path: '461021',
      name: '001001002461021',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '系统内汇划' }
    }
  ]
}

export default g001001002Router
