/**
 * 贷款直连交易
 */
const dirA = 'A002'
const dirB = 'B001'
const tradeCode = 'T569000'
const T569000Router = {
  path: tradeCode,
  component: () => import('@/views/001/001001/001001001/index.vue'),
  name: dirA + dirB + tradeCode,
  meta: {
    title: '贷款开关维护'
  }
}

export default T569000Router
