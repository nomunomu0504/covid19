<template>
  <div class="WhatsNewJapan">
    <h3 class="WhatsNewJapan-heading">
      <v-icon size="24" class="WhatsNewJapan-heading-icon">
        mdi-information
      </v-icon>
      {{ $t('最新のお知らせ（国内）') }}
      <a class="WhatsNew-heading-link" :href="this.localePath('/japan-news')">
        {{ $t('一覧はこちらから') }}
      </a>
    </h3>
    <ul class="WhatsNewJapan-list">
      <li
        v-for="(item, i) in items.slice(0, 3)"
        :key="i"
        class="WhatsNewJapan-list-item"
      >
        <a
          class="WhatsNewJapan-list-item-anchor"
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <time
            class="WhatsNewJapan-list-item-anchor-time px-2"
            :datetime="formattedDate(item.date)"
          >
            {{ item.date }}
          </time>
          <span class="WhatsNewJapan-list-item-anchor-link">
            {{ item.text }}
            <v-icon
              v-if="!isInternalLink(item.url)"
              class="WhatsNewJapan-item-ExternalLinkIcon"
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
.WhatsNewJapan {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.WhatsNewJapan-heading {
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
    font-size: 12px;
  }
}

.WhatsNewJapan .WhatsNewJapan-list {
  padding-left: 0;
  list-style-type: none;

  &-item {
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

        @include text-link();

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
</style>
