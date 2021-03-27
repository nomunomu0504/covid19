<template>
  <div :class="$style.container">
    <div :class="[$style.heading, $style.multi]">
      <span :class="[$style.item, $style.fzMedium]">
        <span :class="$style.icon">
          <DirectionsWalkIcon aria-hidden="true" />
        </span>
        {{ $t('ご高齢の方') }}
      </span>
      <span :class="[$style.item, $style.fzMedium]">
        <span :class="$style.icon">
          <AccessibleIcon aria-hidden="true" />
        </span>
        {{ $t('基礎疾患のある方') }}
      </span>
      <span :class="[$style.item, $style.fzMedium]">
        <span :class="$style.icon">
          <PregnantWomanIcon aria-hidden="true" />
        </span>
        {{ $t('妊娠中の方') }}
      </span>
    </div>
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
import AccessibleIcon from '@/static/flow/responsive/accessible.svg'
import ArrowForwardIcon from '@/static/flow/responsive/arrow_forward.svg'
import DirectionsWalkIcon from '@/static/flow/responsive/directions_walk.svg'
import PregnantWomanIcon from '@/static/flow/responsive/pregnant_woman.svg'

export default {
  components: {
    AccessibleIcon,
    ArrowForwardIcon,
    DirectionsWalkIcon,
    PregnantWomanIcon
  },
  methods: { onDoneScroll }
}
</script>

<style module lang="scss">
@import '@/components/flow/flow_sp.scss';

.heading {
  // elder
  &.multi {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: px2vw(-20);
    margin-left: px2vw(-10);
    margin-right: px2vw(-10);

    .icon {
      display: block;
      margin-bottom: 0;
      width: px2vw(50);
      height: px2vw(50);
    }

    > .item {
      display: flex;
      align-items: center;
      margin: px2vw(20) px2vw(10) 0;

      svg {
        margin-right: px2vw(5);
      }
    }
  }
}

@include largerThan($small) {
  $vw: 960;

  .heading {
    &.multi {
      margin-top: px2vw(-20, $vw);
      margin-left: px2vw(-10, $vw);
      margin-right: px2vw(-10, $vw);

      .icon {
        width: px2vw(50, $vw);
        height: px2vw(50, $vw);
      }

      > .item {
        margin: px2vw(20, $vw) px2vw(10, $vw) 0;

        svg {
          margin-right: px2vw(5, $vw);
        }
      }
    }
  }
}
</style>
