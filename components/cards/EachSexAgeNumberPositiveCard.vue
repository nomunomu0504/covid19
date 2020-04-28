<template>
  <v-col cols="12" md="6" class="DataCard">
    <horizontal-bar-chart
      :title="$t('年代別の陽性患者数')"
      :title-id="'each-sex-age-number-positive'"
      :chart-id="'each-sex-age-number-positive'"
      :chart-data="patientsGraph"
      :date="updatedAt"
      :labels="graphLabels"
      :unit="$t('人')"
      :url="'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19.html'"
    />
  </v-col>
</template>

<script>
import Patients from '@/data/patients.json'
import formatGraph from '@/utils/formatGraph'
import { getCommonStyleDateString } from '@/utils/formatDate'
import HorizontalBarChart from '@/components/HorizontalBarChart.vue'

export default {
  components: {
    HorizontalBarChart
  },
  data() {
    // 年代グラフラベル
    const graphLabels = [
      this.$t("90代"),
      this.$t("80代"),
      this.$t("70代"),
      this.$t("60代"),
      this.$t("50代"),
      this.$t("40代"),
      this.$t("30代"),
      this.$t("20代"),
      this.$t("10代"),
      this.$t("10代未満")
    ]

    return {
      updatedAt: getCommonStyleDateString(Patients.date),
      graphLabels,
      // 陽性患者の詳細
      patientsGraph: Patients.data
    }
  }
}
</script>
