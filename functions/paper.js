const axios = require('axios')

const apiUrl = process.env.API_URL

exports.handler = async () => {
  const URL = `https://${apiUrl}/api/v1/article/search`

  try {
    const res = await axios.get(URL, { timeout: 5000 })
    const articles = res.data.articles.map(article => {
      return {
        title: article.title,
        link: article.link,
        publishedAt: article.publishedAt
      }
    })
    return { articles }
  } catch (err) {
    return {
      statusCode: 500,
      body: err
    }
  }
}
