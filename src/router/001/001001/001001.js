import g001001001Router from './001001001/001001001'
import g001001002Router from './001001002/001001002'

const g001001Router = {
  path: '001001',
  redirect: '/',
  name: '001001',
  meta: {
    title: '存款账务处理'
  },
  children: [g001001001Router, g001001002Router]
}
export default g001001Router
