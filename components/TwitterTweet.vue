<template>
  <div>
    <!--<Tweet id="1253910475223363585"></Tweet>-->
    <template v-if="tweetList.length === 0">
      <div class="justify-center">
        <div>{{ $t('関連するツイートはありません') }}</div>
      </div>
    </template>
    <template v-else>
      <Tweet v-for="tweetId in tweetList" :key="tweetId" :id="tweetId">
        <div class="justify-center">
          <bounce-loader color="#0054c6" size="24px" />
        </div>
      </Tweet>
    </template>
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  components: {
    Tweet,
    BounceLoader
  },
  props: {
    tweetList: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: false
    }
  }
}
</script>
<style>
.justify-center {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
