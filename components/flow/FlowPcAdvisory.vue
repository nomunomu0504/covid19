<template>
  <div :class="$style.Advisory">
    <div :class="$style.AdvisoryContainer">
      <div :class="$style.AdvisoryContents">
        <div class="mt-4 px-4">
          {{ $t('まずは') }}<br>
          <i18n
            path="{doctor}または{hospital}へ{phone}"
          >
            <template v-slot:doctor>
              <div>
                <strong :class="$style.AdvisoryContentsEmphasis">
                  {{ $t('かかりつけ医') }}
                </strong>
              </div>
            </template>
            <template v-slot:hospital>
              <div>
                <strong :class="$style.AdvisoryContentsEmphasis">
                  {{ $t('最寄りの医療機関') }}
                </strong>
              </div>
            </template>
            <template v-slot:phone>
              <div>
                <strong :class="$style.AdvisoryContentsEmphasis">
                  {{ $t('電話相談') }}
                </strong>
              </div>
            </template>
          </i18n>
          <!--
          <strong :class="$style.AdvisoryContentsEmphasis">{{ $t('かかりつけ医') }}</strong><br>
          {{ $t('または') }}<br>
          <strong :class="$style.AdvisoryContentsEmphasis">{{ $t('最寄りの医療機関') }}</strong><br>
          {{ $t('へ') }}<br>
          <strong :class="$style.AdvisoryContentsEmphasis">{{ $t('電話相談') }}</strong>
          -->
        </div>
        <div class="mt-4 px-4">
          <v-divider class="mx-2"></v-divider>
        </div>
        <div class="mt-4 px-4">
          {{ $t('かかりつけ医がない場合') }}<br>
          {{ $t('受診先に迷う場合は') }}
        </div>
        <div class="mt-4">
          <span :class="$style.AdvisoryContentsTitle">{{
            $t('受診・相談センター')
          }}</span>
        </div>
        <div :class="[$style.AdvisoryContentsColsSentense, 'mt-2']">
          {{ $t('電話相談窓口') }}
        </div>
        <div>
          <span>{{ $t('7:00~21:00') }}</span>
        </div>
        <div
          :class="[
            $style.AdvisoryTelephoneArea,
            $style.AdvisoryBlockCentering,
            'mt-1'
          ]"
        >
          <a :class="$style.AdvisoryTelephone" href="tel:0776200795">
            <img
              :class="$style.AdvisoryTelephoneIcon"
              src="/flow/phone-24px.svg"
              aria-hidden="true"
              :alt="$t('電話番号')"
            />
            0776-20-0795
          </a>
        </div>
        <div>
          <div :class="[$style.AdvisoryBoxContainer, $style.AdvisoryWhiteBox]">
            <span :class="$style.AdvisoryWhiteBoxSentense">
              {{ $t('時間外は携帯電話番号がアナウンスされます') }}
            </span>
          </div>
        </div>
      </div>

      <!--
      <div :class="$style.AdvisoryContents">
        <div class="py-8">
          <div :class="$style.AdvisoryContentsTitle2">
            {{ $t('時間外も対応') }}
          </div>
          <div
            :class="[
              $style.AdvisoryLink,
              $style.AdvisoryBlockCentering,
              'mt-4'
            ]"
          >
            <a
              href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona-denwa.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ $t('各管轄地域の保健所の電話番号はこちら') }}</span>
              <v-icon size="18">
                mdi-open-in-new
              </v-icon>
            </a>
          </div>
        </div>
      </div>
      -->

      <!--
      <div :class="$style.AdvisoryContents">
        <div class="pt-8">
          <div :class="$style.AdvisoryContentsTitle2">
            {{ $t('総合相談電話窓口') }}
          </div>
          <span>{{ $t('8:30~17:15') }}</span>
        </div>
        <div class="mt-1">
          <span :class="$style.AdvisoryContentsSubTitle">
            {{ $t('平日のみ') }}
          </span>
        </div>
        <div
          :class="[
            $style.AdvisoryTelephoneArea,
            $style.AdvisoryBlockCentering,
            'mt-1'
          ]"
        >
          <a :class="$style.AdvisoryTelephone" href="tel:0776200250">
            <img
              :class="$style.AdvisoryTelephoneIcon"
              src="/flow/phone-24px.svg"
              aria-hidden="true"
              :alt="$t('電話番号')"
            />
            0776-20-0250
          </a>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<style module lang="scss">
.Advisory {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: $gray-2;

  &Container {
    background-color: $gray-5;
    border-radius: 4px;
    height: 100%;
    //padding: 30px 20px 20px 20px;
    margin-bottom: 10px;
    text-align: center;
  }

  &Contents {
    width: 100%;
    font-weight: bold;
    position: absolute;
    transform: translate(0%, 20%);

    &:not(:first-child) {
      border-top: 0.5px solid $gray-4;
    }

    &Title {
      font-size: 26px;
      line-height: 28px;
    }

    &Title2 {
      font-size: 24px;
      font-weight: bolder;
    }

    &SubTitle {
      font-size: 18px;
    }

    &ColsSentense {
      line-height: 18px;
    }

    &Emphasis {
      font-size: 26px;
      font-weight: bolder;
      line-height: 28px;
    }
  }

  &BlockCentering {
    display: flex;
    justify-content: center;
  }

  &Link {
    line-height: 22px;
    text-align: left;

    a {
      color: rgba(0, 0, 0, 0.87);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &TelephoneArea {
    display: inline-flex;
  }

  &Telephone {
    display: flex;
    align-items: center;
    font-size: 27px;
    font-weight: bold;

    &:link,
    &:visited,
    &:hover,
    &:active,
    &:focus {
      color: inherit;
      text-decoration: none;
      outline: 1px dotted $gray-3;
    }

    &Icon {
      display: inline-block;
      margin-right: 5px;
      width: 26px;
      height: 26px;
    }
  }

  &BoxContainer {
    border-radius: 4px;
    text-align: center;
    padding: 20px 10px;
    margin: 24px auto;
  }

  &WhiteBox {
    background-color: $white;
    max-width: 200px;
    padding: 10px;

    &Sentense {
      color: $green-1;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
