/**
 * 贷款直连交易
 */
const dirA = 'A002'
const dirB = 'B002'
const tradeCode = 'T563044'
const T566000Router = {
  path: tradeCode,
  component: () => import('@/views/A002/B002/T563044/index.vue'),
  name: dirA + dirB + tradeCode,
  meta: {
    title: '贷款结息日签约/解约'
  }
}

export default T566000Router
