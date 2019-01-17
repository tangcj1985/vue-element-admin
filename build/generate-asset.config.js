const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const config = require('../config/comboItem')

function createServerConfig(compilation) {
  return JSON.stringify(
    Object.assign(
      {
        _hash: compilation.hash
      },
      config
    )
  )
}

module.exports = () => {
  return new GenerateAssetPlugin({
    filename: 'config/comboItem.json',
    fn: (compilation, cb) => {
      cb(null, createServerConfig(compilation))
    }
  })
}
