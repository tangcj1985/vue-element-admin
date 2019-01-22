import Layout from '@/views/layout/Layout'
import A002B001Router from './B001'
import A002B002Router from './B002'

const A002Router = {
  path: '/A002',
  component: Layout,
  redirect: '/',
  name: 'A002',
  meta: {
    title: '贷款业务',
    icon: 'table'
  },
  children: [A002B001Router, A002B002Router]
}
export default A002Router
