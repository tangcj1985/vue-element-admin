/**
 * 贷款直连交易
 */
const dirA = 'A002'
const dirB = 'B001'
const tradeCode = 'T565000'
const T565000Router = {
  path: tradeCode,
  component: () => import('@/views/A002/B001/T565000'),
  name: dirA + dirB + tradeCode,
  meta: {
    title: '贷款直连交易'
  }
}

export default T565000Router
