<template>
  <div :class="$style.container">
    <p :class="$style.heading">
      <span :class="[$style.icon, $style.top]" aria-hidden="true">
        <HumanIcon />
      </span>
      <span :class="$style.fzMedium">{{ $t('誰でも') }}</span>
    </p>
    <ul :class="[$style.rectContainer, $style.double]">
      <li :class="$style.symptom">
        {{ $t('強いだるさ') }}
      </li>
      <li :class="$style.symptom">
        {{ $t('息苦しさ') }}
      </li>
      <li :class="$style.symptom">
        {{ $t('高熱') }}
      </li>
    </ul>
    <p :class="$style.duration">
      <i18n
        path="{doctor}または{hospital}へ{phone}"
      >
        <template v-slot:doctor>
          <span :class="$style.underline">{{ $t('かかりつけ医') }}</span>
        </template>
        <template v-slot:hospital>
          <br><span :class="$style.underline">{{ $t('最寄りの医療機関') }}</span>
        </template>
        <template v-slot:phone>
          <span :class="$style.underline">
            {{ $t('電話相談') }}
          </span>
        </template>
      </i18n>
    </p>
    <p :class="$style.duration">
      <i18n
        path="{immediately} ご相談ください"
      >
        <template v-slot:immediately>
          <span :class="[$style.fzNumeric, $style.underline]">
            {{ $t('すぐに') }}
          </span>
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
