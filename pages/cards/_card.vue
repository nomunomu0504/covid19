<template>
  <div>
    <confirmed-cases-details-card
      v-if="this.$route.params.card == 'details-of-confirmed-cases'"
    />
    <!-- <tested-cases-details-card
      v-else-if="this.$route.params.card == 'details-of-tested-cases'"
    /> -->
    <confirmed-cases-number-card
      v-else-if="this.$route.params.card == 'number-of-confirmed-cases'"
    />
    <confirmed-cases-attributes-card
      v-else-if="this.$route.params.card == 'attributes-of-confirmed-cases'"
    />
    <!-- <tested-number-card
      v-else-if="this.$route.params.card == 'number-of-tested'"
    /> -->
    <inspection-persons-number-card
      v-else-if="this.$route.params.card == 'number-of-inspection-persons'"
    />
    <!-- <consultation-desk-reports-number-card
      v-else-if="
        this.$route.params.card ==
          'number-of-reports-to-covid19-consultation-desk'
      "
    /> -->
    <hospital-beds-number-card
      v-else-if="this.$route.params.card == 'hospital-beds-number-card'"
    />

    <each-sex-age-number-positive-card
      v-else-if="this.$route.params.card == 'each-sex-age-number-positive'"
    />

    <information-number-card
      v-else-if="this.$route.params.card == 'information-number-card'"
    />
  </div>
</template>

<script>
// 検査実施人数
import InspectionPersons from '@/data/inspection_persons.json'
// 陽性患者の属性
import InspectionsSummary from '@/data/inspection_summary.json'
// 感染症病床使用率
import HospitalBeds from '@/data/hospital_beds.json'
// 陽性患者数
import PatientsSummary from '@/data/patients_summary.json'
// お問合わせ件数
import Contacts from '@/data/contacts.json'

// import MetroData from '@/data/metro.json'
// import agencyData from '@/data/agency.json'
// import ShinjukuData from '@/data/13104_daily_visitors.json'
// import ChiyodaData from '@/data/13101_daily_visitors.json'
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
// import TestedCasesDetailsCard from '@/components/cards/TestedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
// import TestedNumåberCard from '@/components/cards/TestedNumberCard.vue'
import InspectionPersonsNumberCard from '@/components/cards/InspectionPersonsNumberCard.vue'
import HospitalBedsNumberCard from '@/components/cards/HospitalBedsNumberCard.vue'
// import ConsultationDeskReportsNumberCard from '@/components/cards/ConsultationDeskReportsNumberCard.vue'
// import MetroCard from '@/components/cards/MetroCard.vue'
// import AgencyCard from '@/components/cards/AgencyCard.vue'
// import ShinjukuVisitorsCard from '@/components/cards/ShinjukuVisitorsCard.vue'
// import ChiyodaVisitorsCard from '@/components/cards/ChiyodaVisitorsCard.vue'

// コールセンターお問合せ件数
import InformationNumberCard from '@/components/cards/InformationNumberCard.vue'

// 男女年代別の陽性患者数
import EachSexAgeNumberPositiveCard from '@/components/cards/EachSexAgeNumberPositiveCard.vue'

export default {
  components: {
    ConfirmedCasesDetailsCard,
    // TestedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    // TestedNumberCard,
    InspectionPersonsNumberCard,
    HospitalBedsNumberCard,
    InformationNumberCard,
    EachSexAgeNumberPositiveCard,
    // ConsultationDeskReportsNumberCard,
    // MetroCard,
    // AgencyCard,
    // ShinjukuVisitorsCard,
    // ChiyodaVisitorsCard
  },
  data() {
    let title, updatedAt
    switch (this.$route.params.card) {
      case 'details-of-confirmed-cases':
        title = this.$t('検査陽性者の状況')
        updatedAt = PatientsSummary.date
        break
      // case 'details-of-tested-cases':
      //   title = this.$t('検査実施状況')
      //   updatedAt = InspectionsSummary.date
      //   break
      case 'number-of-confirmed-cases':
        title = this.$t('陽性患者数')
        updatedAt = PatientsSummary.date
        break
      case 'attributes-of-confirmed-cases':
        title = this.$t('陽性患者の属性')
        updatedAt = InspectionsSummary.date
        break
      // case 'number-of-tested':
      //   title = this.$t('検査実施件数')
      //   updatedAt = InspectionsSummary.date
        break
      case 'number-of-inspection-persons':
        title = this.$t('検査実施人数')
        updatedAt = InspectionPersons.date
        break
      // case 'number-of-reports-to-covid19-consultation-desk':
      //   title = this.$t('新型コロナ受診相談窓口相談件数')
      //   updatedAt = Data.querents.date
      //   break
      // case 'predicted-number-of-toei-subway-passengers':
      //   title = this.$t('都営地下鉄の利用者数の推移')
      //   updatedAt = MetroData.date
      //   break
      // case 'agency':
      //   title = this.$t('都庁来庁者数の推移')
      //   updatedAt = agencyData.date
      //   break
      // case 'shinjuku-visitors':
      //   title = this.$t('新宿区エリアの来訪者数の推移（参考値）')
      //   updatedAt = ShinjukuData.date
      //   break
      // case 'chiyoda-visitors':
      //   title = this.$t('千代田区エリアの来訪者数の推移（参考値）')
      //   updatedAt = ChiyodaData.date
      //   break
      case 'hospital-beds-number-card':
        title = this.$t('感染症病床使用率')
        updatedAt = HospitalBeds.date
        break

      case 'information-number-card':
        title = this.$t('コールセンターお問合せ件数')
        updatedAt = Contacts.date
        break
      
      case 'each-sex-age-number-positive':
        title = this.$t('年代別の陽性患者数')
        updatedAt = PatientsSummary.date
        break
    }

    const data = {
      title,
      updatedAt
    }
    return data
  },
  head() {
    const url = 'https://covid19-fukui.com'
    const timestamp = new Date().getTime()
    const ogpImage = this.$tc('ogp.og:image')
    const description = `${this.updatedAt} | ${this.$t(
      '当サイトは福井県における新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために、福井高専生卒の野村弘樹が開設したものです'
    )}`

    return {
      title: this.title,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: url + this.$route.path + '/'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.title +
            ' | ' +
            this.$t('福井県公認') +
            ' ' +
            this.$t('新型コロナウイルス') +
            this.$t('対策サイト')
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogpImage
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogpImage
        }
      ]
    }
  }
}
</script>
