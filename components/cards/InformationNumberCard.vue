<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="'コールセンター相談件数'"
      :title-id="'information-number-card'"
      :chart-id="'information-number-card'"
      :chart-data="contactsGraph"
      :date="Contacts.date"
      :unit="'件'"
    />
  </v-col>
</template>

<script>
import TimeBarChart from '@/components/TimeBarChart.vue'
import Contacts from '@/data/contacts.json'
import formatGraph from '@/utils/formatGraph'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 検査実施週別状況
    const contactsGraph = formatGraph(Contacts.data)

    const data = {
      Contacts,
      contactsGraph,
    }
    return data
  }
}
</script>
