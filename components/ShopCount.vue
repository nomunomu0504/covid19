<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <v-card-title>{{ $t('店舗ごとの投稿ツイート数') }}</v-card-title>
      <v-card-text>
        <div>
          <p class="Graph-Desc">
            {{ $t('(注)') }}
            {{ $t('一部集計結果が異なる場合があります') }}
          </p>
        </div>
        <v-data-table
          :ref="'displayedTable'"
          :headers="headers"
          :items="$store.state.shop"
          :items-per-page="-1"
          :hide-default-footer="true"
          :height="240"
          :fixed-header="true"
          :mobile-breakpoint="0"
          class="cardTable"
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      headers: [
        { text: '店舗名', align: 'left', sortable: true, value: 'shop' },
        { text: 'ツイート数', align: 'right', sortable: true, value: 'num' }
      ]
    }
  },
  async created() {
    try {
      const res = await axios.get('/api/v1/tweetCount', { timeout: 5000 })
      const shop = res.data.shopList.map((e: any) => {
        return {
          shop: e.name,
          num: e.num
        }
      })
      this.$store.commit('setShop', shop)
    } catch (error) {
      // console.log(error)
      this.$store.commit('setShop', [
        {
          shop: 'ゲンキーこうのとり大橋北店',
          num: 2
        }
      ])
    }
  }
})
</script>

<style lang="scss">
.TweetCountList {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.TweetCountList-heading {
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
.Graph-Desc {
  margin: 10px 0;
  font-size: 12px;
  color: $gray-3;
}
</style>
