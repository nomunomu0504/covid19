const cheerio = require('cheerio')
const util = require('./util.js')

const CACHE_TIME = 1 * 60 * 60 * 1000 // 1hour
// const CACHE_TIME = 1 * 60 * 1000 // 1min
const PATH = 'data/covid19fukui/'
const InspectionDataPATH = 'data/covid19fukui_inspedtion/'
const URL =
  'https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html'
const InspectionDataURL =
  'https://www.city.fukui.lg.jp/fukusi/iryou/kensen/p021907.html'

const custom_res = {
  pcr: {
    date: '',
    total: 0,
    data: [
      {
        日付: '2020-03-23 09:00:00',
        short_date: '03/23',
        小計: 35
      },
      {
        日付: '2020/03/24 09:00',
        short_date: '03/24',
        小計: 3
      }
    ]
  },
  inspection_persons: {
    date: '',
    data: {
      県内: []
    },
    labels: []
  },
  inspections_summary: {
    date: '',
    attr: '検査実施人数',
    value: 0,
    children: [
      {
        attr: '陽性患者数',
        value: 0,
        children: [
          {
            attr: '入院中',
            value: 38,
            children: [
              {
                attr: '軽症・中等症',
                value: 36
              },
              {
                attr: '重症',
                value: 2
              }
            ]
          },
          {
            attr: '退院',
            value: 0
          },
          {
            attr: '死亡',
            value: 1
          }
        ]
      }
    ]
  }
}

// コロナウイルス検査結果に関するサイトを取得
const getCovid19Data = async function(cachetime) {
  return await util.getWebWithCache(URL, PATH, cachetime)
}

// PCR検査と相談件数に関するサイトを取得
const getCovid19InspectionData = async function(cachetime) {
  return await util.getWebWithCache(
    InspectionDataURL,
    InspectionDataPATH,
    cachetime
  )
}

const getLastUpdate = function(fn) {
  return util.getLastUpdateOfCache(URL, PATH)
}

const startUpdate = function() {
  setInterval(async function() {
    await util.getWebWithCache(URL, PATH, CACHE_TIME)
    // await getYoutubeVideolist(process.env.YOUTUBE_API_KEY, process.env.YOUTUBE_USERNAME)
  }, CACHE_TIME)
}

// X週をXにパース
const parseWeek = function(s) {
  s = util.toHalf(s)
  const n = s.indexOf('週')
  return s.substring(0, n)
}

// '令和２年３月９日午前９時時点' -> 2020/03/09 09:00
const parseDate = function(s) {
  s = util.toHalf(s)
  const num = s.match(/令和(\d+)年(\d+)月(\d+)日午(前|後)(\d+)時時点/)
  // console.log(s, num)
  const y = parseInt(num[1]) + 2018
  const m = num[2]
  const d = num[3]
  const h = parseInt(num[5]) + (num[4] == '後' ? 12 : 0)
  const fix0 = util.fix0
  return y + '/' + fix0(m, 2) + '/' + fix0(d, 2) + ' ' + fix0(h, 2) + ':00'
}

// '令和2年3月24日（火）' -> 2020/03/24 09:00
const parseDateOfInspectionData = function(s) {
  s = util.toHalf(s)
  const num = s.match(/令和(\d+)年(\d+)月(\d+)日+/)
  const y = parseInt(num[1]) + 2018
  const m = num[2]
  const d = num[3]
  const fix0 = util.fix0
  return y + '/' + fix0(m, 2) + '/' + fix0(d, 2) + ' ' + '09:00'
}

// '3月24日分' -> 2020/03/24 09:00
const parseInspectionDate = function(s) {
  s = util.toHalf(s)
  const num = s.match(/(\d+)月(\d+)日分/)
  const y = 2020
  const m = num[1]
  const d = num[2]
  const fix0 = util.fix0
  return {
    date: y + '/' + fix0(m, 2) + '/' + fix0(d, 2) + ' ' + '09:00',
    short_date: fix0(m, 2) + '/' + fix0(d, 2)
  }
}

// '3　電話相談件数　60件　累計　1,599件' -> {day: 60, total: 1599}
const parseNumberOfTelephoneData = function(s) {
  s = s.replace(',', '')
  const num = s.match(/3　電話相談件数\s+(\d+)件\s+累計\s+(\d+)件/)
  return { day: num[1], total: num[2] }
}

// 週番号からその週の始まりと終わりを取得
const getWeekFromWeekNumber = function(weekNumber) {
  const j10 = new Date(2020, 0, 10, 12, 0, 0)
  const j4 = new Date(2020, 0, 4, 12, 0, 0)
  const mon = j4.getTime() - j10.getDay() * 86400000

  const start = new Date(mon + (weekNumber - 1) * 7 * 86400000)
  const end = new Date(mon + ((weekNumber - 1) * 7 + 6) * 86400000)

  return {
    start: `${start.getMonth() + 1}/${start.getDate()}`,
    end: `${end.getMonth() + 1}/${end.getDate()}`
  }
}

// スクレイピングしたデータ（コロナウイルス検査結果）をJSON形式に変換
const getCovid19DataJSON = async function(cachetime) {
  const data = await getCovid19Data(cachetime)
  // console.log(data)
  const dom = cheerio.load(data)
  const weeks = []

  const calcSum = function(data) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += data[i]
    }
    return sum
  }

  let state = 0
  dom('p').each((idx, ele) => {
    if (state == 0) {
      if (ele.children.length) {
        const text = ele.children[0].data
        if (text && text.includes('（参考）検査実施状況')) {
          custom_res.inspection_persons.date = parseDate(
            text.substring(text.indexOf('　') + 1)
          )
          custom_res.inspections_summary.date = parseDate(
            text.substring(text.indexOf('　') + 1)
          )
          state = 1
        }
      }
    } else if (state == 1) {
      if (ele.children.length) {
        const tbl = dom(ele).next()
        dom(tbl)
          .find('tr')
          .each((idx, ele) => {
            const td = dom(ele).children()
            const week = td[0].children[0].data // ８週（令和２年２月17日～23日）
            const ninspect = td[1].children[0].data // 検査件数
            const npatient = td[3].children[0].data // 陽性患者数
            if (week != '週' && week != '計') {
              const weekLabel = getWeekFromWeekNumber(parseWeek(week))
              custom_res.inspection_persons.data.県内.push(
                util.cutNoneN(ninspect)
              )
              custom_res.inspection_persons.labels.push(
                `${weekLabel.start} ~ ${weekLabel.end}`
              )

              weeks.push({
                week_number: parseWeek(week),
                week: `${weekLabel.start} ~ ${weekLabel.end}`,
                ninspect: util.cutNoneN(ninspect),
                npatient: util.cutNoneN(npatient)
              })
            } else if (week == '計') {
              custom_res.inspections_summary.children[0].value = util.cutNoneN(
                npatient
              )
            }
          })
        state = 2
      }
    }
    custom_res.inspections_summary.value = calcSum(
      custom_res.inspection_persons.data.県内
    )
  })

  // await getCovid19InspectionDataJSON(0)

  const fs = require('fs')
  fs.writeFile(
    'covid19_fukui.json',
    JSON.stringify(custom_res, null, '    '),
    function(err) {
      if (err) {
        console.log(err)
      }
    }
  )
  fs.writeFile(
    'pcr.json',
    JSON.stringify(custom_res.pcr, null, '    '),
    function(err) {
      if (err) {
        console.log(err)
      }
    }
  )
  fs.writeFile(
    'inspection_persons.json',
    JSON.stringify(custom_res.inspection_persons, null, '    '),
    function(err) {
      if (err) {
        console.log(err)
      }
    }
  )
  fs.writeFile(
    'inspection_summary.json',
    JSON.stringify(custom_res.inspections_summary, null, '    '),
    function(err) {
      if (err) {
        console.log(err)
      }
    }
  )
  return custom_res
}

// スクレイピングしたデータ（PCR検査と相談件数）をJSON形式に変換
const getCovid19InspectionDataJSON = async function(cachetime) {
  const data = await getCovid19InspectionData(cachetime)
  const dom = cheerio.load(data)

  const calcSum = function(data) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += data[i]
    }
    return sum
  }

  const state = 0
  // メインコンテンツをスクレイピング
  dom('div.freearea > p').each((idx, ele) => {
    if (ele.children.length) {
      for (let i = 0; i < ele.children.length; i++) {
        const text = ele.children[i].data
        // console.log(text)
        // 1 対象日 のコンテンツを取得
        if (text && text.includes('1　対象日')) {
          const targetDate = parseDateOfInspectionData(text)
          custom_res.pcr.date = targetDate
        }

        // 2 PCR検査実施件数 のコンテンツを取得
        else if (text && text.includes('2　ＰＣＲ検査実施件数')) {
          // tableタグのコンテンツを取得
          const table = dom(ele.children[i].parent).next()
          // tableタグ中のtrタグリストを取得
          const trs = dom(table[0]).find('tr')
          // trタグの個数を取得
          const trsLength = trs.length

          /** * trタグの一番最初は必ずHeaderカラム（処理なし） ***/
          for (let index = 1; index < trsLength - 1; index++) {
            // 日付
            // const dayDate = parseInspectionDate(trs[index].children[1].children[0].data)
            // // 実施件数
            // const dayTotal = parseInt(trs[index].children[3].children[0].data)
            // // 陰性
            // const dayNegativeTotal = trs[index].children[5].children[0].data
            // // 陰性のうち濃厚接触者
            // const dayNegativeCloseContactTotal = trs[index].children[7].children[0].data
            // // 陽性
            // const dayActiveTotal = trs[index].children[9].children[0].data
            // // 陽性のうち濃厚接触者
            // const dayActiveCloseContactTotal = trs[index].children[11].children[0].data
            // custom_res.pcr.data.push(
            //   {
            //     "日付": dayDate.date,
            //     "short_date": dayDate.short_date,
            //     "小計": dayTotal
            //   }
            // )
          }

          /** * trタグの一番最後は必ず累計カラム ***/
          // 累計
          const resultHead = trs[trsLength - 1].children[1].children[0].data
          // トータル実施件数
          const resultTotal = trs[trsLength - 1].children[3].children[0].data
          // トータル陰性
          const resultNegativeTotal =
            trs[trsLength - 1].children[5].children[0].data
          // 陰性のうち濃厚接触者
          const resultNegativeCloseContactTotal =
            trs[trsLength - 1].children[7].children[0].data
          // トータル陽性
          const resultActiveTotal =
            trs[trsLength - 1].children[9].children[0].data
          // 陽性のうち濃厚接触者
          const resultActiveCloseContactTotal =
            trs[trsLength - 1].children[11].children[0].data

          custom_res.pcr.total = resultTotal
        }

        // 3 電話相談件数 のコンテンツを取得
        else if (text && text.includes('3　電話相談件数')) {
          // 電話相談件数を取得
          const phoneCount = parseNumberOfTelephoneData(text)

          // console.log(phoneCount)
        }
      }
    }
  })
}

// 未使用
const calcCovid19DataSummary = function(json) {
  const calcSum = function(data, name) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum += data[i][name]
    }
    return sum
  }

  return {
    n_inspections: calcSum(json.inspection, 'ninspect'),
    n_patients: calcSum(json.inspection, 'npatient'),
    n_light: 1,
    n_heavy: 0,
    n_exit: 0,
    n_death: 0,
    n_capacity_pcr_per_day: 66, // https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200319-1.pdf
    n_capacity_bed: 48,
    s_lastUpdate: json.lastUpdate
  }
}

// Youtubeから関連動画のリストを取得
const getYoutubeVideolist = async function(apiKey, userName) {
  const axios = require('axios')
  const youtubeAPI = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 3000,
    responseType: 'json'
  })
  let playlistId = ''
  let playlistItems = []

  await youtubeAPI
    .get(
      '/channels?part=contentDetails&forUsername=' + userName + '&key=' + apiKey
    )
    .then(res => {
      playlistId = res.data.items[0].contentDetails.relatedPlaylists.uploads
    })
    .catch(err => {
      console.log(err)
    })

  await youtubeAPI
    .get(
      '/playlistItems?part=snippet&playlistId=' +
        playlistId +
        '&maxResults=50&key=' +
        apiKey
    )
    .then(res => {
      playlistItems = res.data.items
      const relatedVideo = playlistItems.filter(video =>
        video.snippet.title.match(/新型コロナウイルス/)
      )
      relatedVideo.sort((a, b) => {
        const publishedAt_a = new Date(a.snippet.publishedAt).getTime()
        const publishedAt_b = new Date(b.snippet.publishedAt).getTime()

        let comparison = 0
        if (publishedAt_a < publishedAt_b) {
          comparison = 1
        } else if (publishedAt_a > publishedAt_b) {
          cimparison = -1
        }
        return comparison
      })
      // console.log(relatedVideo)
      const fs = require('fs')
      fs.writeFile(
        'youtubeVideolist.json',
        JSON.stringify(relatedVideo, null, '    '),
        function(err) {
          if (err) {
            console.log(err)
          }
        }
      )
    })
}

const getFukuiShimbun = () => {
  const axios = require('axios')
  const moment = require('moment-timezone')
  const xml2js = require('xml2js')
  moment.tz.setDefault("Asia/Tokyo");

  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get('https://www.fukuishimbun.co.jp/list/feed/rss')
      const xml = res.data
      const json = {
        timestamp: moment().unix(),
        info: null
      }
      xml2js.parseString(xml, (_, xmlres) => {
        json.info = xmlres.rss.channel[0].item
        .map((i) => {
            return {
              title: i.title[0],
              link: i.link[0],
              published_at: moment(i.pubDate[0]).format('YYYY/MM/DD HH:mm')
            }
          })
      })
      resolve(json)
    } catch (error) {
      reject(error)
    }
  })
}

const storeFukuiShimbun = async () => {
  try {
    const info = await getFukuiShimbun()
    const fs = require('fs')
    fs.writeFile(
      'fukuishimbun.json',
      JSON.stringify(info, null, '    '),
      function(err) {
        if (err) {
          console.log(err)
        }
    }
  )
  } catch (error) {
    console.log(error)
  }
}


const main = async function() {
  // const data = await getCovid19DataJSON(1000 * 60)
  const temp = await getCovid19InspectionDataJSON(0)
  const inspectionData = await getCovid19DataJSON(0)
  console.log(inspectionData)
  await storeFukuiShimbun()
}

if (require.main === module) {
  main()
  // getYoutubeVideolist(process.env.YOUTUBE_API_KEY, process.env.YOUTUBE_USERNAME)
} else {
  startUpdate()
}

exports.getCovid19DataJSON = getCovid19DataJSON
exports.getCovid19InspectionDataJSON = getCovid19InspectionDataJSON
