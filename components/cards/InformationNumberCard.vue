<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('コールセンター相談件数')"
      :title-id="'information-number-card'"
      :chart-id="'information-number-card'"
      :chart-data="contactsGraph"
      :date="updatedAt"
      :unit="$t('件.reports')"
    />
  </v-col>
</template>

<script>
import TimeBarChart from '@/components/TimeBarChart.vue'
import Contacts from '@/data/contacts.json'
import formatGraph from '@/utils/formatGraph'
import { getCommonStyleDateString } from '@/utils/formatDate'

export default {
  components: {
    TimeBarChart
  },
  data() {
    return {
      Contacts,
      // 検査実施週別状況
      contactsGraph: formatGraph(Contacts.data)
    }
  },
  computed: {
    updatedAt() {
      return getCommonStyleDateString(this.Contacts.date)
    }
  }
}
</script>
