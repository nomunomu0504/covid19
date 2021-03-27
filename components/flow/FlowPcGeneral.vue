<template>
  <div :class="$style.Flow">
    <div :class="$style.FlowRow">
      <div :class="$style.FlowRowRowThree">
        <p :class="$style.FlowRowRowThreeGeneral">
          <img
            :class="$style.FlowRowRowThreeGeneralIcon"
            src="/flow/accessibility-24px.svg"
            aria-hidden="true"
            alt=" "
          />
          {{ $t('一般の方またはお子様') }}
        </p>
      </div>
    </div>
    <div :class="[$style.FlowRow, $style.FlowRowRowCheck]">
      <div :class="$style.FlowRowCondition">
        <p>
          <i18n
            tag="span"
            path="{cold}のような症状"
              :class="$style.FlowRowConditionSmall"
          >
            <template v-slot:cold>
              <span :class="$style.FlowRowConditionLarge">
                {{ $t('風邪') }}
              </span>
            </template>
          </i18n>
        </p>
        <img
          :class="$style.FlowRowConditionIcon"
          src="/flow/check_circle-24px.svg"
          aria-hidden="true"
          alt=" "
        />
      </div>
      <div :class="$style.FlowRowCondition">
        <p>{{ $t('発熱') }}</p>
        <img
          :class="$style.FlowRowConditionIcon"
          src="/flow/check_circle-24px.svg"
          aria-hidden="true"
          alt=" "
        />
      </div>
      <div :class="$style.FlowRowCondition">
        <p>{{ $t('咳') }}</p>
        <img
          :class="$style.FlowRowConditionIcon"
          src="/flow/check_circle-24px.svg"
          aria-hidden="true"
          alt=" "
        />
      </div>
    </div>
    <div :class="$style.FlowRow">
      <div :class="$style.FlowRowRowThree">
        <p :class="$style.FlowRowRowThreeGeneral">
          {{ $t('などの症状が続くとき') }}
        </p>
      </div>
      <div>
        <p>
          <span :class="$style.FlowRowEmphasis">{{
            $t('4日以上')
          }}</span>
          {{ $t('は必ずご相談ください') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.Flow {
  @include card-container($withDivider: true);

  display: flex;
  flex-direction: row;
  padding: 20px 20px !important;
  position: relative;
  color: $gray-2;

  &Row {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 36%;
    display: flex;
    flex-direction: column;
    text-align: center;

    &RowCheck {
      flex-basis: calc(28% - 20px);
      margin: 0 10px;
    }

    &RowThree {
      flex-grow: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;

      &General {
        &Icon {
          display: block;
          margin: auto;
          width: 44px;
          height: 44px;
        }
      }

      &CareTargetList {
        margin: 16px 0;
        text-align: left;
        list-style: none;

        &Item {
          display: flex;
          align-items: center;

          &Icon {
            display: inline-block;
            width: 30px;
            height: 30px;
          }
        }

        &Item + &Item {
          margin-top: 14px;
        }
      }
    }

    &Condition {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      padding: 10px;
      position: relative;
      border: 2px solid $green-1 !important;
      border-radius: 2px;
      background-color: $white;

      p {
        text-align: center;
        display: inline-block;
        margin: 0 !important; // FIXME: IEだとv-applicationのmarginが優先される
        font-size: calc(0.875rem + ((1vw - 7.68px) * 0.8929));
        font-weight: bold;

        @include largerThan($large) {
          font-size: 20px;
        }
      }

      &Large {
        font-size: calc(1rem + ((1vw - 7.68px) * 2.4876));

        @include largerThan($large) {
          font-size: 25px;
        }
      }

      &Small {
        font-size: 15px;
      }

      &Icon {
        position: absolute;
        left: -8px;
        top: -8px;
        width: 24px;
        height: 24px;
      }

      &::before {
        position: absolute;
        left: -4px;
        top: -4px;
        width: 20px;
        height: 20px;
        background-color: white;
        content: '';
      }
    }

    &Emphasis {
      font-size: 24px;
      font-weight: bold;
      border-bottom: solid 3px $green-1;

      &Day {
        font-size: 41px;
      }
    }
  }
}
</style>
