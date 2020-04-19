<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:button>
      <p class="Graph-Desc">
          {{ $t('（ 注 ）福井県における陽性患者数を年代別で表示しています') }}<br/>
          {{ $t('（ 注 ）この値はこれまでの累積値です') }}
      </p>
    </template>
    <horizontal-bar
      :style="{ display: canvas ? 'block' : 'none' }"
      :chart-id="chartId"
      :chart-data="displayData"
      :options="displayOption"
      :height="240"
    />
    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-text="displayInfo.lText"
        :s-text="displayInfo.sText"
        :unit="displayInfo.unit"
      />
    </template>
  </data-view>
</template>

<script lang="ts">
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { GraphDataType } from '@/utils/formatGraph'
import DataView from '@/components/DataView.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import { single as color } from '@/utils/colors'

type Data = {
  dataKind: 'transition' | 'cumulative'
  canvas: boolean
  valueOfEachAge: number[]
}
type Methods = {
  
}
type Computed = {
  displayInfo: {
    lText: string
    sText: string
    unit: string
  }
  displayData: {
    labels: string[]
    datasets: {
      label: TranslateResult
      data: number[]
      backgroundColor: string,
      borderWidth: number
    }[]
  }
  displayOption: {
    tooltips: {
      displayColors: boolean
      callbacks: {
          label(tooltipItem: any): string
          title(tooltipItem: any[], data: any): string | undefined
      }
    }
    scales: object
  }
}
type Props = {
  title: string
  titleId: string
  chartId: string
  chartData: GraphDataType[]
  date: string
  unit: string
  info: string
  labels: string[]
  url: string
  description: string
}

const options: ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
> = {
  created() {
    this.canvas = process.browser
  },
  components: { DataView, DataViewBasicInfoPanel },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    chartId: {
      type: String,
      default: 'horizontal-bar-chart'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dataKind: 'transition',
    canvas: true,
    valueOfEachAge: []
  }),
  computed: {
    displayInfo() {
      return {
        lText: "",
        sText: "",
        unit: ""
      }
    },
    displayData() {
      this.valueOfEachAge = [0,0,0,0,0,0,0,0,0,0]
      this.chartData.map((d: any) => {
        switch (d["年代"]) {
            case "10歳未満":
                this.valueOfEachAge[9] += 1      
                break;
            case "10代":
                this.valueOfEachAge[8] += 1      
                break;
            case "20代":
                this.valueOfEachAge[7] += 1      
                break;
            case "30代":
                this.valueOfEachAge[6] += 1      
                break;
            case "40代":
                this.valueOfEachAge[5] += 1      
                break;
            case "50代":
                this.valueOfEachAge[4] += 1      
                break;
            case "60代":
                this.valueOfEachAge[3] += 1      
                break;
            case "70代":
                this.valueOfEachAge[2] += 1      
                break;
            case "80代":
                this.valueOfEachAge[1] += 1      
                break;
            case "90代":
                this.valueOfEachAge[0] += 1      
                break;
            default:
                break;
        }
      })

      return {
        labels: this.labels,
        datasets: [
          {
            label: this.$t("陽性者数"),
            data: this.valueOfEachAge,
            backgroundColor: color,
            borderWidth: 0
          }
        ]
      }
    },
    displayOption() {
        // const unit = this.unit
        const valueOfEachAge = this.valueOfEachAge
        const _this = this

        const options = {
            tooltips: {
                displayColors: false,
                callbacks: {
                    label(tooltipItem: any) {
                      return `${_this.$t('陽性者数')}: ${valueOfEachAge[tooltipItem.index]}`
                    },
                    title(tooltipItem: any, data: any) {
                      return `${data.labels[tooltipItem[0].index]} ${_this.$t('陽性者数')}`
                    }
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        suggestedMax: 50,
                        suggestedMin: 0,
                        stepSize: 5
                    }
                }],
                yAxes: [{
                    stacked: true,
                }]
            }
        }
        return options
    }
  },
}

export default Vue.extend(options)
</script>

<style lang="scss" scoped>
.Graph-Desc {
  margin: 10px 0;
  font-size: 12px;
  color: $gray-3;
}

.link {
  text-decoration: none;
}
</style>
