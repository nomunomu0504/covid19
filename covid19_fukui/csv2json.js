/**
 * Fukui covid-19 open data getting script
 * include feature downloading news spreadsheet
 * Copyright © HyodaKazuaki
 */

const path = require('path')
const fs = require('fs')
const axios = require('axios')
const csv2json = require('csvtojson')
const Enumerable = require('linq')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

/**
 * Shift-JISフラグ
 * falseの場合はUTF-8として処理
 */
const ISSHIFTJIS = false

/**
 * 病床数
 */
if (isNaN(parseInt(process.env.HOSPITAL_BEDS))) {
  throw new RangeError('env HOSPITAL_BEDS is NaN')
}
const HospitalBedNum = process.env.HOSPITAL_BEDS

/**
 * オープンデータ取得先
 */
const openDataSource = [
  {
    name: 'call_center',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_call_center.csv'
  },
  // {
  //   name: 'discharge',
  //   url:
  //     'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_discharge.csv'
  // },
  {
    name: 'patients',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_patients.csv'
  },
  {
    name: 'test_count',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_test_count.csv'
  }
]

/**
 * ニュースデータ取得先
 */
const newsURL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=PYdskn-DTyGWV-opQBIPMai2hf_fFAN4QEmRbzTslY_Wk87YfJO9j9H3ity-FUaFPy1pksmbx2n_xtdxmYsKNAQ8OsCGB2Tbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEfRmCr39HTGQrTUSiWR0O7CYjXcSKXdkQgDZghk6tW42sA2IpyDGOwsQ9LRFT_DlHTmz_2mixm&lib=MA39SnUYxoNd8lbNHqVdiBtdTRtZCTy75'

/**
 * 福井新聞RSS取得先
 */
const fukuiShimbunURL = 'https://www.fukuishimbun.co.jp/list/feed/rss'

/**
 * jsonファイルの階層
 */
const dir = '../data/'

/**
 * jsonのファイル名
 */
const files = {
  breakingNews: 'breaking_news.json', // 速報
  fukuiNews: 'fukui_news.json', // 県内のお知らせ
  japanNews: 'japan_news.json', // 国内のお知らせ
  fukuiShimbun: 'fukuishimbun.json', // 福井新聞のニュース
  contacts: 'contacts.json', // コールセンター相談件数
  hospitalBeds: 'hospital_beds.json', // 感染症病床使用率
  inspectionPersons: 'inspection_persons.json', // 検査実施人数
  inspectionSummary: 'inspection_summary.json', // 検査陽性者の状況
  patientsSummary: 'patients_summary.json', // 陽性患者数
  patients: 'patients.json' // 陽性患者の属性
}

const main = async () => {
  try{
  // オープンデータ取得
  for (const source of openDataSource) {
    const csv = await getCSV(source.url)
    const json = await csv2json().fromString(csv)
    source.json = json
  }
  // ニュースデータ取得
  const newsJson = (await axios.get(newsURL)).data
  const breakingNewsJson = newsJson.breaking_news
  const fukuiNewsJson = newsJson.fukui_news
  const japanNewsJson = newsJson.japan_news

  // オープンデータ
  const today = new Date()
  today.setHours(today.getHours() + 9)
  const jsonObjectBase = {
    date: dateFormat.format(today, 'yyyy/MM/dd hh:mm')
  }
  // 各JSONを作成
  const contactsJson = Object.assign({}, jsonObjectBase)
  const hospitalBedsJson = Object.assign({}, jsonObjectBase)
  const inspectionPersonsJson = Object.assign({}, jsonObjectBase)
  const inspectionSummaryJson = Object.assign({}, jsonObjectBase)
  const patientsJson = Object.assign({}, jsonObjectBase)
  const patientsSummaryJson = Object.assign({}, jsonObjectBase)
  // LINQの設定
  const linq = Enumerable.from(openDataSource)
  // 各JSONの処理
  contacts(linq.where(x => x.name === 'call_center').first().json, contactsJson)
  hospitalBeds(
    linq.where(x => x.name === 'patients').first().json,
    hospitalBedsJson
  )
  inspectionPersons(
    linq.where(x => x.name === 'test_count').first().json,
    inspectionPersonsJson
  )
  inspectionSummary(
    linq.where(x => x.name === 'patients').first().json,
    inspectionSummaryJson
  )
  patients(linq.where(x => x.name === 'patients').first().json, patientsJson)
  patientsSummary(
    linq.where(x => x.name === 'patients').first().json,
    patientsSummaryJson
  )

  // 書き出し
  writeFile(breakingNewsJson, files.breakingNews)
  writeFile(fukuiNewsJson, files.fukuiNews)
  writeFile(japanNewsJson, files.japanNews)
  writeFile(contactsJson, files.contacts)
  writeFile(hospitalBedsJson, files.hospitalBeds)
  writeFile(inspectionPersonsJson, files.inspectionPersons)
  writeFile(inspectionSummaryJson, files.inspectionSummary)
  writeFile(patientsJson, files.patients)
  writeFile(patientsSummaryJson, files.patientsSummary)
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}

/**
 * オープンデータのCSVを取得します
 * `ISSHIFTJIS`が`true`ならばShift-JISをUTF-8に変換します
 * @param {String} URL 取得先URL
 * @returns 取得したデータ
 */
async function getCSV(URL) {
  if (ISSHIFTJIS) {
    const data = (await axios.get(URL, { responseType: 'arraybuffer' })).data
    return iconv.decode(Buffer.from(data), 'windows-31j')
  }
  const data = (await axios.get(URL)).data
  return data
}

/**
 * JSONオブジェクトを書き出します
 * `dir`ディレクトリ以下に引数のファイル名で出力します
 * @param {Object} json 書き出すJSONオブジェクト
 * @param {String} fileName 書き出すファイル名
 */
function writeFile(json, fileName) {
  const filePath = path.join(dir, fileName)
  fs.readFile(filePath, 'UTF-8', (err, data) => {
    if (err) throw err
    const oldJSON = JSON.parse(data || "null")
    if (isUpdateJSON(oldJSON, json)) {
      fs.writeFile(filePath, JSON.stringify(json, null, '    '), err => {
        if (err) throw err
      })
    }
  })
}

/**
 * 2つのJSONオブジェクトに差があるか調べます
 * `date`要素を除いた上で実行します
 * @param {Object} oldJSON 変更元のJSONオブジェクト
 * @param {Object} newJSON 変更先のJSONオブジェクト
 * @returns 差があるか
 */
function isUpdateJSON(oldJSON, newJSON) {
  // newJSONはシャローコピーなのでディープコピーを作成
  const newJSONClone = JSON.parse(JSON.stringify(newJSON) || "null")
  // 各jsonからdateを除去
  if("date" in oldJSON)
    delete oldJSON.date
  if("date" in newJSON)
    delete newJSONClone.date
  const oldJSONStr = JSON.stringify(oldJSON)
  const newJSONCloneStr = JSON.stringify(newJSONClone)
  return oldJSONStr !== newJSONCloneStr
}

/**
 * コールセンターの相談件数をJSONにします
 * @param {Object} json 元の情報があるJSONオブジェクト
 * @param {Object} jsonObject 書き出すJSONオブジェクト
 */
function contacts(json, jsonObject) {
  jsonObject.data = Enumerable.from(json)
    .select(x => {
      const date = new Date(x.受付_年月日)
      const formatDate = dateFormat.format(date, 'yyyy-MM-dd')
      return {
        日付: `${formatDate}T00:00:00.000+09:00`,
        小計: parseInt(x.相談件数)
      }
    })
    .toArray()
}

/**
 * 病床数をJSONにします
 * 全体のベッド数は環境変数`HOSPITAL_BEDS`から取得します
 * @param {Object} json 元の情報があるJSONオブジェクト
 * @param {Object} jsonObject 書き出すJSONオブジェクト
 */
function hospitalBeds(json, jsonObject) {
  const patient = Enumerable.from(json)
  const hospitalized = x =>
    x.患者_状態 !== '死亡' && parseInt(x.患者_退院済フラグ) !== 1
  const usedNum = patient.where(hospitalized).count()
  jsonObject.data = {
    used: usedNum,
    unused: HospitalBedNum - usedNum
  }
  jsonObject.labels = ['現在患者数', '空き病床数(推定)']
}

/**
 * 日毎の検査実施件数をJSONにします
 * @param {Object} json 元の情報があるJSONオブジェクト
 * @param {Object} jsonObject 書き出すJSONオブジェクト
 */
function inspectionPersons(json, jsonObject) {
  jsonObject.data = []
  Enumerable.from(json).forEach(row => {
    const date = new Date(`${row['実施_年月日']}`)
    const formattedDate = dateFormat.format(date, 'yyyy-MM-dd')
    const testCount = parseInt(row['検査実施_件数'])
    const dataItem = {
      日付: `${formattedDate}T00:00:00.000+09:00`,
      小計: testCount
    }
    jsonObject.data.push(dataItem)
  })
}

/**
 * 陽性患者の属性をJSONにします
 * @param {Object} json 元の情報があるJSONオブジェクト
 * @param {Object} jsonObject 書き出すJSONオブジェクト
 */
function inspectionSummary(json, jsonObject) {
  const patient = Enumerable.from(json)
  const hospitalized = x =>
    x.患者_状態 !== '死亡' && parseInt(x.患者_退院済フラグ) !== 1
  const mildOrModerate = x =>
    x.患者_状態 === '軽症' || x.患者_状態 === '中等症' || x.患者_状態 === ''
  const severeOrSerious = x => x.患者_状態 === '重症' || x.患者_状態 === '重篤'
  const dead = x => x.患者_状態 === '死亡'
  const discharge = x =>
    parseInt(x.患者_退院済フラグ) === 1 && x.患者_状態 !== '死亡'
  jsonObject.children = [
    {
      attr: '陽性患者数',
      value: patient.count(),
      children: [
        {
          attr: '入院中',
          value: patient.where(hospitalized).count(),
          children: [
            {
              attr: '軽症・中等症',
              value: patient
                .where(hospitalized)
                .where(mildOrModerate)
                .count()
            },
            {
              attr: '重症',
              value: patient
                .where(hospitalized)
                .where(severeOrSerious)
                .count()
            }
          ]
        },
        {
          attr: '死亡',
          value: patient.where(dead).count()
        },
        {
          attr: '退院',
          value: patient.where(discharge).count()
        },
        {
          attr: '自宅療養',
          value: '不明'
        },
        {
          attr: '宿泊施設等',
          value: '不明'
        }
      ]
    }
  ]
}

/**
 * 陽性者の状態をJSONにします
 * @param {Object} json 元の情報があるJSONオブジェクト
 * @param {Object} jsonObject 書き出すJSONオブジェクト
 */
function patients(json, jsonObject) {
  jsonObject.data = []
  Enumerable.from(json).forEach(row => {
    const publicationDay = new Date(row.公表_年月日)
    const publicationDate = dateFormat.format(publicationDay, 'yyyy-MM-dd')
    const publicationDateString = `${publicationDate}T00:00:00.000+09:00`

    const developmentDay = new Date(row.発症_年月日)
    const developmentDate = dateFormat.format(developmentDay, 'yyyy-MM-dd')
    const developmentDateString =
      row.発症_年月日 !== '' ? `${developmentDate}T00:00:00.000+09:00` : ''

    const newObj = {
      公表日: publicationDateString,
      発症日: developmentDateString,
      居住地: row['患者_居住地'],
      年代: row['患者_年代'],
      性別: row['患者_性別'],
      職業: row['患者_職業'],
      状態: row['患者_状態'],
      症状: row['患者_症状'],
      渡航歴: row['患者_渡航歴の有無フラグ'],
      退院: row['患者_退院済フラグ'],
      備考: row['備考']
    }
    jsonObject.data.push(newObj)
  })
}

/**
 * 日毎の患者数をJSONにします
 * @param {Object} json 元の情報があるJSONオブジェクト
 * @param {Object} jsonObject 書き出すJSONオブジェクト
 */
function patientsSummary(json, jsonObject) {
  jsonObject.data = []
  // 最初の日
  const initDay = new Date('2020-02-16')
  const today = new Date()
  const diffDay = parseInt((today - initDay) / (1000 * 60 * 60 * 24)) // 日の差分
  for (let i = 0; i <= diffDay; i++) {
    const targetDay = new Date(initDay.toDateString())
    targetDay.setDate(targetDay.getDate() + i)
    const number = Enumerable.from(json)
      .where(x => new Date(x.公表_年月日).getTime() === targetDay.getTime())
      .count()
    const day = new Date(initDay)
    day.setDate(day.getDate() + i)
    day.setHours(day.getHours() + 9) // UTC to JST
    const formatDay = dateFormat.format(day, 'yyyy-MM-dd')
    const newObj = {
      日付: `${formatDay}T00:00:00.000+09:00`,
      小計: number
    }
    jsonObject.data.push(newObj)
  }
}

const dateFormat = {
  _fmt: {
    yyyy(date) {
      return date.getFullYear() + ''
    },
    MM(date) {
      return ('0' + (date.getMonth() + 1)).slice(-2)
    },
    dd(date) {
      return ('0' + date.getDate()).slice(-2)
    },
    hh(date) {
      return ('0' + date.getHours()).slice(-2)
    },
    mm(date) {
      return ('0' + date.getMinutes()).slice(-2)
    },
    ss(date) {
      return ('0' + date.getSeconds()).slice(-2)
    }
  },
  _priority: ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'],
  format(date, format) {
    return this._priority.reduce(
      (res, fmt) => res.replace(fmt, this._fmt[fmt](date)),
      format
    )
  }
}

main()
