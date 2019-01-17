import axios from 'axios'

// let configPath = './static/config/combo-item-config.js'
// if (process.env.NODE_ENV === 'development') {
//   configPath = '../static/config/combo-item-config.js'
// }
const configPath = './config/comboItem.json'
axios.get(configPath).then(response => {
  localStorage.setItem('comboItem', JSON.stringify(response.data))
})
