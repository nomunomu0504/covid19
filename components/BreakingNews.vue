<template>
  <div class="BreakingNews">
    <v-row>
      <v-col cols="auto" style="padding-top:0;padding-bottom:0">
        <h2 class="BreakingNews-heading breaking">
          <v-icon size="24" class="BreakingNews-heading-icon">
            mdi-information
          </v-icon>
          {{ $t('速報') }}
          <a class="BreakingNews-heading-link" :href="this.localePath('/news')">
            {{ $t('過去のお知らせはこちら') }}
          </a>
        </h2>
      </v-col>
      <v-spacer />
      <v-col cols="auto" style="padding-top:0;padding-bottom:0">
        <v-btn
          depressed
          bottom
          color="#ffe200"
          href="https://www.pref.fukui.lg.jp/doc/kenkou/covid19_chiji.html"
          target="_blank"
        >
          <v-icon left small>
            mdi-bullhorn
          </v-icon>
          <span style="font-weight: bold; white-space: normal;">{{
            $t('福井県緊急事態宣言について')
          }}</span>
          <v-icon right small>
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <ul class="BreakingNews-list">
      <li
        v-for="(item, i) in items.slice(0, 3)"
        :key="i"
        class="BreakingNews-list-item"
      >
        <a
          ref="noopener"
          class="BreakingNews-list-item-anchor"
          :href="item.url"
          target="_blank"
        >
          <time
            class="BreakingNews-list-item-anchor-time px-2"
            :datetime="formattedDate(item.date)"
          >
            {{ item.date }}
          </time>
          <span class="BreakingNews-list-item-anchor-link">
            {{ item.text }}
            <v-icon
              v-if="!isInternalLink(item.url)"
              class="BreakingNews-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { convertDateToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    isInternalLink(path: string): boolean {
      return !/^https?:\/\//.test(path)
    },
    formattedDate(dateString: string) {
      return convertDateToISO8601Format(dateString)
    }
  }
})
</script>

<style lang="scss">
.BreakingNews {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.BreakingNews-heading {
  display: flex;
  align-items: center;

  @include card-h2();

  margin-bottom: 12px;
  color: $gray-2;
  margin-left: 12px;

  &-icon {
    margin: 10px;
  }

  &-link {
    flex: 0 1 auto;
    padding-left: 8px;

    @include text-link();
  }
}

.breaking {
  color: #ff50a0 !important;
}

.BreakingNews .BreakingNews-list {
  padding-left: 0;
  list-style-type: none;

  &-item {
    margin-bottom: 10px;
    &-anchor {
      display: inline-block;
      text-decoration: none;
      margin: 5px;
      font-size: 14px;

      @include lessThan($medium) {
        display: flex;
        flex-wrap: wrap;
      }

      &-time {
        flex: 0 0 90px;

        @include lessThan($medium) {
          flex: 0 0 100%;
        }

        color: $gray-1;
      }

      &-link {
        flex: 0 1 auto;
        display: inline;

        // @include text-link();

        @include lessThan($medium) {
          padding-left: 8px;
        }
      }

      &-ExternalLinkIcon {
        margin-left: 2px;
        color: $gray-3 !important;
      }
    }
  }
}

.link-color {
  color: #006ca8 !important;
}

.breaking-content {
  margin-left: 14px;
}
</style>
