import T565000Router from './T565000'
import T569000Router from './T569000'

const dirA = 'A002'
const dirB = 'B001'
const A002B001Router = {
  path: dirB,
  component: () => import('@/views/A002/B001'),
  name: dirA + dirB,
  meta: {
    title: '贷款发放/归还'
  },
  children: [T565000Router, T569000Router]
}
export default A002B001Router
