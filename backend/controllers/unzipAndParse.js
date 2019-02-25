const unzipAndParse = require('express').Router()
const Papa = require('papaparse')

const AdmZip = require('adm-zip')
const request = require('request')


unzipAndParse.post('/', async (req, res) => {
  try{

    if(!req.body.url){
      res.status(400).json({ error: 'url missing' })
    }

    request.get({ url: req.body.url, encoding: null }, (err, respond, body) => {
      let zip = new AdmZip(body)
      let zipEntries = zip.getEntries()
      let data = ''
      zipEntries.forEach((entry) => {
        data += (zip.readAsText(entry))
      })
      let parsed = Papa.parse(data)

      res.json(parsed.data)
    })

  } catch(e) {
    console.log(e)
    res.status(500).json({ error: 'Something went wrong...' })
  }
})


module.exports = unzipAndParse