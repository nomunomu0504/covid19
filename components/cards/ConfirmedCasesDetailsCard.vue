<template>
  <v-col cols="12" md="6" class="DataCard">
    <confirmed-cases-card
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="updatedAt"
    >
      <confirmed-cases-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </confirmed-cases-card>
  </v-col>
</template>

<script>
import InspectionsSummary from '@/data/inspection_summary.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import ConfirmedCasesCard from '@/components/ConfirmedCasesCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'
import { getCommonStyleDateString } from '@/utils/formatDate'

export default {
  components: {
    ConfirmedCasesCard,
    ConfirmedCasesTable
  },
  data() {
    return {
      InspectionsSummary,
      // 検査陽性者の状況
      confirmedCases: formatConfirmedCases(InspectionsSummary)
    }
  },
  computed: {
    updatedAt() {
      return getCommonStyleDateString(this.InspectionsSummary.date)
    }
  }
}
</script>
