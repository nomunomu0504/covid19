const axios = require('axios')

const apiUrl = process.env.API_URL

exports.handler = async () => {
  const result = await fetchPaper()
  return result
}

async function fetchPaper() {
  const URL = `https://${apiUrl}/api/v1/article/search`

  try {
    return await axios.get(URL, { timeout: 5000 })
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    }
  }
}
