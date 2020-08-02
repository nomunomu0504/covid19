<template>
  <div class="HeaderCard">
    <v-row>
      <v-col cols="auto" style="padding-top:0; padding-bottom:0">
        <h2 class="HeaderCard-heading breaking">
          <v-icon size="24" class="HeaderCard-heading-icon">
            mdi-information
          </v-icon>
          {{ $t('各種ご案内') }}
        </h2>
      </v-col>
      <v-col cols="auto" class="header-content">
        <a
          class="HeaderCard-heading-link"
          href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/covid19_dainihaboushi.html"
        >
          <img src="/header-01.jpg" alt="第2波防止への「挑戦」" />
        </a>
      </v-col>
      <v-col cols="auto" class="header-content">
        <a
          class="HeaderCard-heading-link"
          href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/cocoa_00138.html"
        >
          <img src="/header-02.jpg" alt="新型コロナウイルス接触確認アプリ" />
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { convertDateToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
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
.HeaderCard {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.HeaderCard-heading {
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
    @include text-link();
  }
}

.header-content {
  margin: 0 auto;
  padding: 10px;
}
</style>
