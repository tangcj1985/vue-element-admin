/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'
import g001001Router from './001001/001001'
import g001002Router from './001002/001002'

const g001Router = {
  path: '/001',
  component: Layout,
  redirect: '/',
  name: '001',
  meta: {
    title: '存款业务',
    icon: 'table'
  },
  children: [g001001Router, g001002Router]
}
export default g001Router
