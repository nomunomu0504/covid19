<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性患者数')"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :chart-data="patientsGraph"
      :date="updatedAt"
      :unit="$t('人')"
      :url="'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19.html'"
    />
  </v-col>
</template>

<script>
import PatientsSummary from '@/data/patients_summary.json'
import formatGraph from '@/utils/formatGraph'
import { getCommonStyleDateString } from '@/utils/formatDate'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    return {
      updatedAt: getCommonStyleDateString(PatientsSummary.date),
      // 感染者数グラフ
      patientsGraph: formatGraph(PatientsSummary.data)
    }
  }
}
</script>
