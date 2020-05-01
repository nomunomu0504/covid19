<template>
  <v-col cols="12" class="DataCard">
    <data-table
      :title="$t('陽性患者の属性')"
      :title-id="'attributes-of-confirmed-cases'"
      :chart-data="patientsTable"
      :chart-option="{}"
      :date="updatedAt"
      :info="sumInfoOfPatients"
      :url="
        'https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html'
      "
    />
  </v-col>
</template>

<script>
import Patients from '@/data/patients.json'
import formatTable from '@/utils/formatTable'
import DataTable from '@/components/DataTable.vue'
import { getCommonStyleDateString } from '@/utils/formatDate'

export default {
  components: {
    DataTable
  },
  data() {
    // 感染者数
    const patientsTable = formatTable(Patients.data)
    const patientsTableDate = new Date(Patients.date)

    const sumInfoOfPatients = {
      lText: String(Patients.data.length),
      sText: this.$t('{date} 累計値', {
        date: `${patientsTableDate.getMonth() +
          1}/${patientsTableDate.getDate()}`
      }),
      unit: this.$t('人')
    }

    // console.log(sumInfoOfPatients)

    // 陽性患者の属性 ヘッダー翻訳
    for (const header of patientsTable.headers) {
      header.text =
        header.value === '退院' ? this.$t('退院※') : this.$t(header.value)
    }
    // 陽性患者の属性 中身の翻訳
    for (const row of patientsTable.datasets) {
      row['居住地'] = this.$t(row['居住地'])
      row['性別'] = this.$t(row['性別'])
      row['職業'] = this.$t(row['職業'])
      row['年代'] = this.$t(row['年代'])
      row['備考'] = this.$t(row['備考'])
    }

    const data = {
      Patients,
      patientsTable,
      sumInfoOfPatients
    }
    return data
  },
  computed: {
    updatedAt() {
      return getCommonStyleDateString(this.Patients.date)
    }
  }
}
</script>
