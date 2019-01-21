const co2Router = require('express').Router()
const Papa = require('papaparse')

const AdmZip = require('adm-zip')
const request = require('request')

const source = 'http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv'


co2Router.get('/', async (req, res) => {
  request.get({ url: source, encoding: null }, (err, respond, body) => {

    var zip = new AdmZip(body)
    var zipEntries = zip.getEntries()
    console.log(zipEntries.length)
    var data = ''
    zipEntries.forEach((entry) => {
      if (entry.entryName.match('API_EN.ATM.CO2E.KT_DS2_en_csv_v2_10312204.csv')){
        console.log(zip.readAsText(entry))
        data += (zip.readAsText(entry))
      }
    })
    var parsed = Papa.parse(data)
    res.json(parsed)
  })
})

/* const notactualdata = [ //how frontend search wants to see this data
    {
      'title': 'Thiel - Koch',
      'description': 'Integrated non-volatile synergy',
      'image': 'https://s3.amazonaws.com/uifaces/faces/twitter/nandini_m/128.jpg',
      'price': '$42.88'
    }
}) */

module.exports = co2Router