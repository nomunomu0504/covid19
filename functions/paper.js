const axios = require('axios')

const apiUrl = process.env.API_URL

exports.handler = async () => {
  const URL = `https://${apiUrl}/api/v1/article/search`

  try {
    const res = await axios.get(URL, { timeout: 5000 })
    return res.data
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    }
  }
}
