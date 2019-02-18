const populationRouter = require('express').Router()
const Papa = require('papaparse')

const AdmZip = require('adm-zip')
const request = require('request')

const populationData = 'http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv'


populationRouter.get('/', async (req, res) => {
  request.get({ url: populationData, encoding: null }, (err, respond, body) => {
    let zip = new AdmZip(body)
    let zipEntries = zip.getEntries()
    let data = ''
    zipEntries.forEach((entry) => {
      data += (zip.readAsText(entry))
    })
    let parsed = Papa.parse(data)
    let altered = filterAndReformArray(parsed.data)

    res.json(parsed.data)
  })
})


const filterAndReformArray = (data) => {

  ///deletes data we dont need
  const prefilter = data.filter(e => (
    e[2] === 'Indicator Name' || e[2] === 'Population, total')
    ? true : false
  )

  ///this contains titles like "Country Name" or "1960"
  const objTitles = prefilter[0] //This array contains description for data in later arrays. For example [0] = Country name

  /// transform country arrays to country object with good titles
  const fromArrayToKeyAndValues = (countryInfo) => {
    let obj = {}
    countryInfo.forEach((element, i) => {
      if(element !== prefilter[i]){
        let keyName = objTitles[i]
        obj[keyName] = element
      }
    })
    return (obj)
  } /// TODO: form array with {countryname : 1690: {population : asdfsdfa, co2: 283749823749}, suurvalta: true/false}

  return (
    prefilter.map(c => fromArrayToKeyAndValues(c))
  )
}

module.exports = populationRouter