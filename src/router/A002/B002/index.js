import T563044Router from './T563044'

const dirA = 'A002'
const dirB = 'B002'
console.log('@/views/' + dirA + '/' + dirB)
const A002B002Router = {
  path: dirB,
  component: () => import('@/views/A002/B002'),
  redirect: '/',
  name: dirA + dirB,
  meta: {
    title: '贷款管理维护'
  },
  children: [T563044Router]
}
export default A002B002Router
