import dayjs from 'dayjs'

const headers = [
  { text: '公表日', value: '公表日' },
  { text: '発症日', value: '発症日' },
  { text: '居住地', value: '居住地' },
  { text: '年代', value: '年代' },
  { text: '性別', value: '性別' },
  { text: '職業', value: '職業' },
  { text: '状態', value: '状態' },
  { text: '症状', value: '症状' },
  { text: '渡航歴', value: '渡航歴' },
  { text: '退院', value: '退院' },
  { text: '備考', value: '備考' }
]

type DataType = {
  公表日: string | null
  発症日: string | null
  居住地: string | null
  年代: string | null
  性別: '男性' | '女性' | string
  職業: string | null
  状態: string | null
  症状: string | null
  渡航歴: string | null
  退院: string | null
  備考: string | null
  [key: string]: any
}

type TableDataType = {
  公表日: string
  発症日: string
  居住地: DataType['居住地']
  年代: DataType['年代']
  性別: DataType['性別'] | 'その他'
  職業: DataType['職業']
  状態: DataType['状態']
  症状: DataType['症状']
  渡航歴: DataType['渡航歴']
  退院: DataType['退院']
  備考: DataType['備考']
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      公表日: !d['公表日'] ? '---' : dayjs(d['公表日']).format('YYYY/MM/DD'),
      発症日: !d['発症日'] ? '---' : dayjs(d['発症日']).format('YYYY/MM/DD'),
      居住地: d['居住地'] ?? '不明',
      年代: d['年代'] ?? '不明',
      性別: d['性別'] ?? 'その他',
      職業: d['職業'],
      状態: d['状態'],
      症状: d['症状'],
      渡航歴: d['渡航歴'] === '1' ? 'あり' : '',
      退院: d['退院'] === '1' ? '●' : '',
      備考: d['備考']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
