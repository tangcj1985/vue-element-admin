/**
 * 特殊交易
 */
const g001002Router = {
  path: '001002',
  redirect: '/',
  name: '001002',
  meta: {
    title: '特殊交易'
  },
  children: [
    {
      path: '468025',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '001002468025',
      meta: { title: '协查批量登记' }
    },
    {
      path: '468024',
      name: '001002468024',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '协查/协查登记' }
    }
  ]
}

export default g001002Router
