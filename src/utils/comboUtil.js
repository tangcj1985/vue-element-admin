import Vue from 'vue'
import axios from 'axios'

let configPath = './static/config/combo-item-config.js'
if (process.env.NODE_ENV === 'development') {
  configPath = '../static/config/combo-item-config.js'
}
axios.get(configPath).then(response => {
  console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
  console.log(response)
  Vue.prototype.$apiPrefixes = response
})
