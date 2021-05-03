<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:button>
      <p class="Graph-Desc">
        {{ $t('(注)') }}
        {{ $t('福井県における陽性患者数を年代別で表示しています') }}<br />
        {{ $t('(注)') }}
        {{ $t('この値はこれまでの累積値です') }}
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
import { plusMinus as color } from '@/utils/colors'

type Data = {
  dataKind: 'transition' | 'cumulative'
  canvas: boolean
  valueOfEachAge: {
    male: number[]
    female: number[]
  }
}
type Methods = {}
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
      backgroundColor: string
      borderWidth: number
    }[]
  }
  displayOption: {
    tooltips: {
      displayColors: boolean
      callbacks: {
        label(tooltipItem: any[], data: any): string
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
    valueOfEachAge: {
      male: [],
      female: []
    }
  }),
  computed: {
    displayInfo() {
      return {
        lText: '',
        sText: '',
        unit: ''
      }
    },
    displayData() {
      this.valueOfEachAge = {
        male: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        female: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      this.chartData.map((d: any) => {
        const ages = [
          '90代',
          '80代',
          '70代',
          '60代',
          '50代',
          '40代',
          '30代',
          '20代',
          '10代',
          '10歳未満'
        ]
        if (d['性別'] == '男性') {
          this.valueOfEachAge['male'][ages.indexOf(d['年代'])] -= 1
        } else {
          this.valueOfEachAge['female'][ages.indexOf(d['年代'])] += 1
        }
        /*
        switch (d['年代']) {
          case '10歳未満':
            this.valueOfEachAge[9] += 1
            break
          case '10代':
            this.valueOfEachAge[8] += 1
            break
          case '20代':
            this.valueOfEachAge[7] += 1
            break
          case '30代':
            this.valueOfEachAge[6] += 1
            break
          case '40代':
            this.valueOfEachAge[5] += 1
            break
          case '50代':
            this.valueOfEachAge[4] += 1
            break
          case '60代':
            this.valueOfEachAge[3] += 1
            break
          case '70代':
            this.valueOfEachAge[2] += 1
            break
          case '80代':
            this.valueOfEachAge[1] += 1
            break
          case '90代':
            this.valueOfEachAge[0] += 1
            break
          default:
            break
        }
        */
      })

      return {
        labels: this.labels,
        datasets: [
          {
            label: this.$t('男性'),
            data: this.valueOfEachAge['male'],
            backgroundColor: color[0],
            borderWidth: 0
          },
          {
            label: this.$t('女性'),
            data: this.valueOfEachAge['female'],
            backgroundColor: color[1],
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
            label(tooltipItem: any, data: any) {
              return `${data.datasets[tooltipItem.datasetIndex].label}: ${
                Math.abs(tooltipItem.xLabel)
              }`
            },
            title(tooltipItem: any, data: any) {
              return `${data.labels[tooltipItem[0].index]} ${_this.$t(
                '陽性者数'
              )}`
            }
          }
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                suggestedMax: 50,
                suggestedMin: -50,
                stepSize: 10,
                callback: function(value: number) {
                  return value.toString().replace('-', '')
                }
              }
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
      return options
    }
  }
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
