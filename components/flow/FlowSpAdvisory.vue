<template>
  <div :class="$style.container">
    <h4 id="consult" :class="[$style.heading, $style.fzXLarge]">
      {{ $t('新型コロナ受診相談窓口') }}
      <small :class="[$style.break, $style.fzRegular, $style.mt5]">{{
        $t('帰国者・接触者 電話相談センター')
      }}</small>
    </h4>
    <dl>
      <!--
      <div :class="$style.daytime">
        <dt :class="[$style.title, $style.fzMedium]">
          {{ $t('時間外も対応') }}
        </dt>
        <dd :class="$style.link">
          <a
            href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona-denwa.html"
            target="_blank"
            rel="noopener"
          >
            {{ $t('各管轄地域の保健所の電話番号はこちら') }}
            <v-icon size="16">
              mdi-open-in-new
            </v-icon>
          </a>
        </dd>
      </div>
      -->
      <div>
        <dt>
          <ul :class="[$style.night]">
            <li>
              <span :class="[$style.fzMedium, $style.break, $style.mb10]">
                {{ $t('総合相談窓口') }}
              </span>
              {{ $t('7:00~21:00') }}
            </li>
          </ul>
        </dt>
        <!--
        <dd>
          <div :class="['mb-1']">
            <span>{{ $t('7:00~21:00') }}</span>
          </div>
        </dd>
        -->
        <dd>
          <div :class="[$style.phone, $style.fzNumeric]">
            <span :class="$style.icon">
              <PhoneIcon alt="Phone" />
            </span>
            <a href="tel:0776200795">0776-20-0795</a>
          </div>
        </dd>
      </div>
    </dl>
    <p :class="[$style.open, $style.fzMedium]">
      <span>{{ $t('時間外は携帯電話番号がアナウンスされます') }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import PhoneIcon from '@/static/flow/responsive/phone.svg'

export default {
  components: { PhoneIcon }
}
</script>

<style module lang="scss">
@import '@/components/flow/flow_sp.scss';

// advisory
.open {
  margin-top: px2vw(20);
  display: flex;
  justify-content: center;

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $white;
    color: $green-1;
    padding: px2vw(20) px2vw(40);
    border-radius: px2vw(6);
  }
}

.daytime {
  margin-top: px2vw(20);
  display: flex;
  border-top: 1px solid $gray-4;
  border-bottom: 1px solid $gray-4;

  > * {
    padding: px2vw(30) px2vw(10);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
    flex-basis: 40%;
  }

  .link {
    flex-basis: 60%;

    > a {
      text-decoration: none;
    }
  }
}

.night {
  margin: px2vw(30) auto;
  padding-left: 0 !important;
  text-align: center;

  > li {
    list-style-type: none;

    &:not(:first-child) {
      margin-top: px2vw(20);
    }
  }
}

@include largerThan($small) {
  $vw: 960;

  .open {
    margin-top: px2vw(20, $vw);

    > span {
      padding: px2vw(20) px2vw(40, $vw);
      border-radius: px2vw(6, $vw);
    }
  }

  .daytime {
    margin-top: px2vw(20, $vw);

    > * {
      padding: px2vw(30) px2vw(10, $vw);
    }
  }

  .night {
    margin: px2vw(30, $vw) auto;

    > li {
      &:not(:first-child) {
        margin-top: px2vw(20, $vw);
      }
    }
  }
}
</style>
