<template>
  <div class="NewsList">
    <page-header class="mb-3">
      <v-icon size="24" class="NewsList-heading-icon">
        mdi-information
      </v-icon>
      {{ $t('福井新聞社の速報（RSS）') }}
    </page-header>
    <ul class="NewsList-list">
      <li v-for="(item, i) in $store.state.info" :key="i" class="NewsList-list-item">
        <a
          class="NewsList-list-item-anchor"
          :href="item.link"
          target="_blank"
          rel="noopener"
        >
          <time
            class="NewsList-list-item-anchor-time px-2"
            :datetime="formattedDate(item.published_at)"
          >
            {{ item.published_at }}
          </time>
          <p class="NewsList-list-item-anchor-link">
            {{ item.title }}
            <v-icon
              v-if="!isInternalLink(item.link)"
              class="NewsList-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PageHeader from '@/components/PageHeader.vue'
import StaticCard from '@/components/StaticCard.vue'
import Fukuishimbun from '@/data/fukuishimbun.json'
import { convertDateToISO8601Format } from '@/utils/formatDate.ts'

export default Vue.extend({
  components: {
    PageHeader,
    StaticCard
  },
  head(): MetaInfo {
    return {
      title: this.$t('福井新聞社の速報（RSS）') as string
    }
  }, 
  methods: {
    isInternalLink(path: string): boolean {
      return !/^https?:\/\//.test(path)
    },
    formattedDate(dateString: string) {
      return convertDateToISO8601Format(dateString)
    }
  },
  async created() {
    try {
      const res = await axios.get('/api/v1/rss/fukuishimbun', {timeout: 5000})
      const info = res.data.info.map((e: any) => {
      return {title: e.title, link: e.link, published_at: moment.unix(e.published_at).format('YYYY/MM/DD HH:mm') }
      })
      this.$store.commit('setInfo', info)
    } catch(error) {
      //console.log(error)
      this.$store.commit('setInfo', Fukuishimbun.info)
    }
  }
})
</script>

<style lang="scss">
.NewsList {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.NewsList-heading {
  display: flex;
  align-items: center;

  @include card-h2();

  margin-bottom: 12px;
  color: $gray-2;
  margin-left: 12px;

  &-icon {
    margin: 10px;
  }
}

.NewsList .NewsList-list {
  padding-left: 0;
  list-style-type: none;

  &-item {
    &-anchor {
      display: inline-block;
      text-decoration: none;
      margin: 5px;
      font-size: 16px;

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