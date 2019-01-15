(function(env) {
  const dev = {
    host: 'http://web.dev.cn',
    remote: 'http://api.dev.cn'
  }
  const test = {
    host: 'http://web.test.cn',
    remote: 'http://api.test.cn'
  }
  if (env == 'dev') {
    return dev
  } else if (env == 'test') {
    return test
  }
})('test')
