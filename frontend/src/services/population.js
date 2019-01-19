import axios from 'axios'
import JSZip from 'jszip'
const url = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv'

const getAll = () => {
  axios({
    url: url,
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    JSZip.loadAsync(response.body).then((zip) => {
      console.log(zip.file('content.txt').async('string'))
      return zip.file('content.txt').async('string')
    }).then(() => {
      console.log('huh? working?')
    })
  })
}

export default { getAll }