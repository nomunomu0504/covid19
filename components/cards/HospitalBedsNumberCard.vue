<template>
  <v-col cols="12" md="6" class="DataCard">
    <circle-chart
      :title="$t('感染症病床使用率')"
      :title-id="'hospital-beds-number-card'"
      :chart-id="'hospital-beds-number-card'"
      :chart-data="hospitalBedsGraph"
      :date="updatedAt"
      :labels="i18nHospitalLabel"
      :unit="$t('％')"
      :info="$t('病床使用率')"
      :description="'ここは未使用'"
    />
  </v-col>
</template>

<script>
import CircleChart from '@/components/CircleChart.vue'
import HospitalBeds from '@/data/hospital_beds.json'
import formatVariableGraph from '@/utils/formatVariableGraph.ts'
import { getCommonStyleDateString } from '@/utils/formatDate'

export default {
  components: {
    CircleChart
  },
  data() {
    const i18nHospitalLabel = [
      this.$t('現在患者数'),
      this.$t('空き病床数(推定)')
    ]
    return {
      HospitalBeds,
      i18nHospitalLabel,
      // 検査実施週別状況
      hospitalBedsGraph: formatVariableGraph(HospitalBeds.data)
    }
  },
  computed: {
    updatedAt() {
      return getCommonStyleDateString(this.HospitalBeds.date)
    }
  }
}
</script>
