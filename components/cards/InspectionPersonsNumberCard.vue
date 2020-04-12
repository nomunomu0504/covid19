<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('検査実施人数')"
      :title-id="'number-of-inspection-persons'"
      :chart-id="'number-of-inspection-persons'"
      :chart-data="inspectionPersonsGraph"
      :date="inspectionPersonsDate"
      :unit="$t('人')"
      :url="'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19.html'"
    >
      <template v-slot:description>
        <ul>
          <li>
            {{ $t('（注）同一の対象者について複数の検体を調査する場合あり') }}
          </li>
        </ul>
      </template>
    </time-bar-chart>
  </v-col>
</template>

<script>
import InspectionPersons from '@/data/inspection_persons.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 検査実施人数グラフ
    const inspectionPersonsGraph = formatGraph(InspectionPersons.data)
    const inspectionPersonsDate = InspectionPersons.date
    const data = {
      inspectionPersonsDate,
      inspectionPersonsGraph
    }
    return data
  }
}
</script>
