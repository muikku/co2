import axios from 'axios'
const baseUrl = 'https://whispering-castle-37289.herokuapp.com/api/unzipAndParse'

const getData = async (givenUrl) => {
  const request = await axios.post(baseUrl, {
    url: givenUrl
  })
  return request.data
}

export default { getData }