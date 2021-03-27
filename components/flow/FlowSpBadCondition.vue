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
      <span :class="$style.underline">{{ $t('かかりつけ医') }}</span>
      {{ $t('または') }}
      <span :class="$style.underline">{{ $t('最寄りの医療機関') }}</span>
      {{ $t('へ') }}
    </p>
    <p :class="$style.duration">
      <span :class="[$style.fzNumeric, $style.underline]">{{
        $t('すぐに')
      }}</span>
      {{ $t('ご相談ください') }}
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
        {{ $t('かかりつけ医がない') }}<br>
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
