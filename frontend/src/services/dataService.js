import axios from 'axios'
const baseUrl = '/api/unzipAndParse'

const getData = async (givenUrl) => {
  const request = await axios.post(baseUrl, {
    url: givenUrl
  })
  return request.data
}

export default { getData }