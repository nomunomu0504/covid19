<template>
  <v-col cols="12" md="6" class="DataCard">
    <circle-chart
      :title="$t('感染症病床使用率')"
      :title-id="'hospital-beds-number-card'"
      :chart-id="'hospital-beds-number-card'"
      :chart-data="hospitalBedsGraph"
      :date="HospitalBeds.date"
      :labels="HospitalBeds.labels"
      :unit="$t('％')"
      :info="'病床使用率'"
      :description="'ここは未使用'"
    />
  </v-col>
</template>

<script>
import CircleChart from '@/components/CircleChart.vue'
import HospitalBeds from '@/data/hospital_beds.json'
import formatVariableGraph from '@/utils/formatVariableGraph.ts'

export default {
  components: {
    CircleChart
  },
  data() {
    // 検査実施週別状況
    const hospitalBedsGraph = formatVariableGraph(HospitalBeds.data)
    const data = {
      HospitalBeds,
      hospitalBedsGraph
    }
    return data
  }
}
</script>
 