<template>
  <div :class="$style.container">
    <p :class="$style.heading">
      <span :class="[$style.icon, $style.top]" aria-hidden="true">
        <HumanIcon />
      </span>
      <span :class="$style.fzMedium">{{ $t('一般の方またはお子様') }}</span>
    </p>
    <ul :class="[$style.rectContainer, $style.double]">
      <li :class="$style.symptom">
        <span>
          <i18n path="{cold}のような症状">
            <template v-slot:cold>
              <span :class="$style.ConditionsItemLarger">
                {{ $t('風邪') }}
              </span>
            </template>
          </i18n>
        </span>
      </li>
      <li :class="$style.symptom">
        {{ $t('発熱') }}
      </li>
      <li :class="$style.symptom">
        {{ $t('咳') }}
      </li>
    </ul>
    <v-row class="justify-center mt-4">
      <span :class="$style.fzMedium">{{ $t('症状が続く場合は') }}</span>
    </v-row>
    <p :class="$style.duration">
      <i18n
        path="{doctor}または{hospital}へ"
      >
        <template v-slot:doctor>
          <span :class="$style.underline">{{ $t('かかりつけ医') }}</span>
        </template>
        <template v-slot:hospital>
          <span :class="$style.underline">{{ $t('最寄りの医療機関') }}</span>
        </template>
      </i18n>
    </p>
    <v-row class="justify-center mt-2">
      {{ $t('ご相談ください') }}
    </v-row>
    <p :class="$style.duration">
      <i18n
        tag="span"
        path="{days} は必ずご相談ください"
      >
        <template v-slot:days>
          <i18n
            tag="span"
            path="{day}日以上"
            :class="$style.underline"
          >
            <template v-slot:day>
              4 
            </template>
          </i18n>
        </template>
      </i18n>
    </p>
    <a
      v-scroll-to="{
        el: '#consult',
        onDone: onDoneScroll
      }"
      href="#consult"
      :class="[$style.button, $style.clickable]"
    >
      <span :class="$style.text">
        {{ $t('かかりつけ医がない場合') }}<br>
        {{ $t('受診先に迷う場合は') }}
      </span>
      <ArrowForwardIcon :class="$style.icon" />
    </a>
  </div>
</template>

<script lang="ts">
import { onDoneScroll } from '@/utils/vueScrollTo'
import HumanIcon from '@/static/flow/responsive/accessibility.svg'
import ArrowForwardIcon from '@/static/flow/responsive/arrow_forward.svg'
export default {
  components: { HumanIcon, ArrowForwardIcon },
  methods: { onDoneScroll }
}
</script>

<style module lang="scss">
@import '@/components/flow/flow_sp.scss';
</style>
