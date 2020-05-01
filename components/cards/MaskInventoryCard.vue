<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <v-card-title>{{ $t('{title}', { title }) }}</v-card-title>
      <v-card-text>
        <div>
          <p class="Graph-Desc">
            {{ $t('(注)') }} {{ $t('こちらは現在開発中です。レイアウト等が変更になる可能性があります') }}<br />
            {{ $t('(注)') }} {{ $t('この情報は県庁から提供されているデータと、県民の皆様から寄せられた情報を元に提供しています') }}<br />
            {{ $t('(注)') }} {{ $t('ゲンキー株式会社への問い合わせはご遠慮ください') }}<br />
            {{ $t('更新日時：') }} {{ maskUpdateDate| dateFormatter }}
          </p>
        </div>
        <!--
        <v-row justify="space-around">
          <v-switch
            style="margin-left: 12px"
            v-for="(city, index) of citiesInFukui"
            :key="index"
            v-model="visibleOnMap"
            multiple
            :label="city"
            :value="city"
          ></v-switch>
        </v-row>
        -->
        <div id="map-wrapper">
          <client-only>
            <l-map
              id="map"
              ref="lMap"
              :center="center"
              :zoom="zoom"
              :options="mapOptions"
              @update:center="centerUpdate"
              @update:zoom="zoomUpdate"
            >
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-control-zoom position="bottomright" />
              <l-control position="topleft">
                <v-menu :offset-y="true">
                  <template v-slot:activator="{ on }">
                    <v-btn small v-on="on">
                      <v-icon small>mdi-near-me</v-icon> {{ $t('移動') }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      @click="moveToGPS"
                    >
                      <v-list-item-title>現在地へ</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item
                      v-for="(bounds, region) of regionInFukui"
                      :key="region"
                      @click="moveToRegion(bounds)"
                    >
                      <v-list-item-title>{{ region }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </l-control>
              <l-marker
                v-for="(genky, index) of genkyInFukui"
                :key="index"
                :lat-lng="[genky.緯度, genky.経度]"
                :icon="maskInventoryData.includes(genky.店舗名) ? redIcon : blueIcon"
              >
                <l-popup>
                  <div>
                    <h3>{{ genky.店舗名 }}｜{{ maskInventoryData.includes(genky.店舗名) ? "在庫なし" : "在庫あり" }}</h3><br />
                    <span class="text-no-wrap">営業時間: {{ genky.営業時間 }}</span>
                  </div>
                  <div>
                    {{ genky.所在地 }}
                    <v-btn 
                      :href="'http://maps.apple.com/?daddr='+genky.緯度+','+genky.経度+'&dirflg=d'"
                      target="_blank"
                      icon
                    >
                      <v-icon>mdi-map-legend</v-icon>
                    </v-btn>
                  </div>
                  <br />
                  <div>
                    <a
                      :href="'https://twitter.com/intent/tweet'
                        + '?url=https%3A%2F%2Fcovid19-fukui.com%2F'
                        + '&button_hashtag='
                        + hashTags[0]
                        + '&hashtags='
                        + hashTags.concat(genky.店舗名).slice(1).join(',')
                        + '&ref_src=twsrc%5Etfw'"
                      class="twitter-hashtag-button"
                      data-show-count="false"
                    >Tweet</a>
                    <script
                      async src="https://platform.twitter.com/widgets.js"
                      charset="utf-8">
                    </script>
                  </div>
                  <v-btn
                    small
                    outlined
                    :href="'https://twitter.com/search?q='
                      + '%23福井県マスク在庫'
                      + '%20%23' + genky.店舗名
                      + '&src=typed_query&f=live'
                    "
                    target="_blank"
                  >{{ $t('この店舗に関連するツイートを表示') }}
                  </v-btn>
                </l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </div>
        <v-dialog v-model="relatedTweet" scrollable width="90%" max-width="360px">
          <v-card>
            <!--
            <v-card-title>{{ $t('この店舗に関連するツイート') }}</v-card-title>
            <v-divider></v-divider>
            -->
            <v-card-text style="height: 500px;">
              <twitter-tweet :tweet-list="tweetList"></twitter-tweet>
            </v-card-text>
            <v-card-actions>
              <v-btn text outlined block @click="toggleRelatedTweet()">{{ $t( '閉じる') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div v-if="this.$route.query.embed != 'true'" class="footer-right">
          <v-btn icon :ripple="false" @click="toggleShareMenu">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              :aria-label="$t('{title}をシェア', { title })"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.59999 3.5H9.5L7 0.5L4.5 3.5H6.39999V11H7.59999V3.5ZM8.5 5.75H11.5C11.9142 5.75 12.25 6.08579 12.25 6.5V13.5C12.25 13.9142 11.9142 14.25 11.5 14.25H2.5C2.08579 14.25 1.75 13.9142 1.75 13.5V6.5C1.75 6.08579 2.08579 5.75 2.5 5.75H5.5V4.5H2.5C1.39543 4.5 0.5 5.39543 0.5 6.5V13.5C0.5 14.6046 1.39543 15.5 2.5 15.5H11.5C12.6046 15.5 13.5 14.6046 13.5 13.5V6.5C13.5 5.39543 12.6046 4.5 11.5 4.5H8.5V5.75Z"
                fill="#808080"
              />
            </svg>
          </v-btn>
          <div
            v-if="displayShare"
            class="DataView-Share-Buttons py-2"
            @click="stopClosingShareMenu"
          >
            <div class="Close-Button">
              <v-icon :aria-label="$t('閉じる')" @click="closeShareMenu">
                mdi-close
              </v-icon>
            </div>

            <h4>{{ $t('埋め込み用コード') }}</h4>

            <div class="EmbedCode">
              <v-icon
                v-if="isCopyAvailable()"
                class="EmbedCode-Copy"
                :aria-label="$t('クリップボードにコピー')"
                @click="copyEmbedCode"
              >
                far fa-clipboard
              </v-icon>
              {{ graphEmbedValue }}
            </div>

            <div class="Buttons">
              <button
                class="ButtonsButton"
                :aria-label="$t('Lineで{title}をシェア', { title })"
                @click="line"
              >
                <picture>
                  <source
                    srcset="/line.webp"
                    type="image/webp"
                    class="icon-resize line"
                  />
                  <img src="/line.png" alt="LINE" class="icon-resize line" />
                </picture>
              </button>

              <button
                class="ButtonsButton"
                :aria-label="$t('Twitterで{title}をシェア', { title })"
                @click="twitter"
              >
                <picture>
                  <source
                    srcset="/twitter.webp"
                    type="image/webp"
                    class="icon-resize twitter"
                  />
                  <img
                    src="/twitter.png"
                    alt="Twitter"
                    class="icon-resize twitter"
                  />
                </picture>
              </button>

              <button
                class="ButtonsButton"
                :aria-label="$t('facebookで{title}をシェア', { title })"
                @click="facebook"
              >
                <picture>
                  <source
                    srcset="/facebook.webp"
                    type="image/webp"
                    class="icon-resize facebook"
                  />
                  <img
                    src="/facebook.png"
                    alt="facebook"
                    class="icon-resize facebook"
                  />
                </picture>
              </button>
            </div>
          </div>
        </div>
        <div v-if="showOverlay" class="overlay">
          <div class="overlay-text">
            {{ $t('埋め込みコードをコピーしました') }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import TwitterTweet from '@/components/TwitterTweet.vue'
import GenkyLocations from '@/data/genky_locations.json'
import MaskInventory from '@/data/mask_inventory.json'
import axios from 'axios'
import format from 'date-fns/format'

export default {
  components: {
    TwitterTweet
  },
  filters: {
    dateFormatter: function (date) {
      return format(date, 'YYYY/MM/DD HH:mm')
    }
  },
  data() {
    const regionInFukui = {
      '嶺北北部': [[36.1152222, 136.1609285], [36.2271168, 136.2756708]],
      '福井市内': [[36.010266, 136.1780678], [36.0994464, 136.3253579]],
      '奥　　越': [[35.9733288, 136.4798565], [36.0750573, 136.5114535]],
      '嶺北南部': [[35.8377444, 136.0520882], [35.9808129, 136.3433536]],
      '嶺南東部': [[35.555878,135.9023407], [35.6493848,136.0746429]],
      '嶺南西部': [[35.4559145, 135.534236], [35.5042143, 135.7537516]]
    }
    const citiesInFukui = [
      'あわら市',
      '坂井市',
      '福井市',
      '永平寺町',
      '勝山市',
      '大野市',
      '越前町',
      '鯖江市',
      '越前市',
      '池田町',
      '南越前町',
      '敦賀市',
      '美浜町',
      '若狭町',
      '小浜市',
      'おおい町',
      '高浜町'
    ]
    const blueIcon = process.browser ? new this.$L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }) : undefined
    const redIcon = process.browser ? new this.$L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }) : undefined
    return {
      title: '県内のゲンキー店舗と在庫状況',
      titleId: 'mask-inventory-card',
      url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      zoom: 9,
      center: [35.875698, 135.981903],
      currentZoom: this.zoom,
      currentCenter: this.center,
      mapOptions: {
        zoomControl: false,
        minZoom: 8
      },
      attribution:
        '<a href="https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="_blank">国土地理院</a>',
      blueIcon: blueIcon,
      redIcon: redIcon,
      maskInventoryData: MaskInventory.data,
      maskUpdateDate: MaskInventory.date,
      hashTags: ['福井県マスク在庫'],
      //tweetList: ['1253910475223363585', '1252779322487652352'],
      tweetList: [],
      relatedTweet: false,
      displayShare: false,
      showOverlay: false,
      regionInFukui,
      citiesInFukui,
      visibleOnMap: citiesInFukui
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (this.$refs.lMap) {
      this.$refs.lMap.mapObject.fitBounds(
        [
          [35.4559145, 135.534236], [36.2271168, 136.5114535]
        ],
        { paddingTopLeft: [30, 30] }
      )
      }
    })
  },
  computed: {
    genkyInFukui: () => {
      return GenkyLocations.filter(genky => genky.IDg === '2')
    },
    /*
    citiesHaveGenky: () => {
      let cities = []
      GenkyLocations
        .filter(genky => genky.IDg === '2')
        .forEach(genky => cities.push(genky.所在地.match(/^福井県(.*郡)?(.+?[市町])/)[2]))
      return [...new Set(cities)]
    },
    isVisible() {
      return address => {
        for (const city of this.visibleOnMap) {
          return new RegExp(city).test(address) ? 'block' : 'none'
        }
      }
    },
    */
    getInventory: () => {
      return shopName => {
        const inventory = MaskInventory.data.filter(d => d.店舗名 === shopName)[0]
        if (inventory) {
          inventory.日時 = new Date(inventory.日時).toLocaleString()
          return inventory
        } else {
          return {
            "店舗名": shopName,
            "営業時間": ""
          }
        }
      }
    },
    graphEmbedValue() {
      const graphEmbedValue =
        '<iframe style="width: 100%; height: 600px;" src="' +
        this.permalink(true, true) +
        '" frameborder="0"></iframe>'
      return graphEmbedValue
    },
  },
  methods: {
    centerUpdate(center) {
      this.currentCenter = center
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    moveToGPS() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.$refs.lMap.mapObject.setView(
            [position.coords.latitude, position.coords.longitude],
            13
          )
        },
        error => {
          console.log(error)
        }
      )
    },
    moveToRegion(bounds) {
      console.log(this.$refs.lMap)
      this.$refs.lMap.mapObject.fitBounds(bounds, { padding: [20, 20] })
    },
    async toggleRelatedTweet(shopName) {
      if (shopName === undefined) {
        this.relatedTweet = false
      } else {
        const hashTags = this.hashTags.concat(shopName)
        //console.log(hashTags)
        this.tweetList = await this.searchRelatedTweet(shopName)
        console.log(this.tweetList)
        this.relatedTweet = true
      }
    },
    async searchRelatedTweet(shopName) {
      const tweetList = await axios
        .get(
          '/api/v1/tweet?shop=' + shopName,
        )
        .then((res) => {
          const tweetList = res.data.tweet
          return tweetList.map(t => t.tweet_id)
        })
        .catch((err) => {
          return []
        })
      return tweetList
    },
    openPopup(event) {
      this.$nextTick(() => {
        event.target.openPopup()
      })
    },
    toggleShareMenu(e) {
      e.stopPropagation()
      this.displayShare = !this.displayShare
    },
    closeShareMenu() {
      this.displayShare = false
    },
    isCopyAvailable() {
      return !!navigator.clipboard
    },
    copyEmbedCode() {
      const self = this
      navigator.clipboard.writeText(this.graphEmbedValue).then(() => {
        self.closeShareMenu()

        self.showOverlay = true
        setTimeout(() => {
          self.showOverlay = false
        }, 2000)
      })
    },
    stopClosingShareMenu(e) {
      e.stopPropagation()
    },
    permalink(host = false, embed = false) {
      let permalink = '/cards/' + this.titleId
      if (embed) {
        permalink = permalink + '?embed=true'
      }
      permalink = this.localePath(permalink)

      if (host) {
        permalink = location.protocol + '//' + location.host + permalink
      }
      return permalink
    },
    twitter() {
      const url =
        'https://twitter.com/intent/tweet?text=' +
        this.title +
        ' / ' +
        this.$t('福井県公認') + ' ' +
        this.$t('新型コロナウイルス感染症') + ' ' +
        this.$t('対策サイト') +
        '&url=' +
        this.permalink(true) +
        '&' +
        'hashtags=StopCovid19JP'
      window.open(url)
    },
    facebook() {
      const url =
        'https://www.facebook.com/sharer.php?u=' + this.permalink(true)
      window.open(url)
    },
    line() {
      const url =
        'https://social-plugins.line.me/lineit/share?url=' +
        this.permalink(true)
      window.open(url)
    }
  }
}
</script>
<style>
.v-overlay {
  z-index: 99999 !important;
}
.v-dialog__content {
  z-index: 100000 !important;
}
</style>
<style lang="scss" scoped>
#map-wrapper {
  height: 600px;
  @include lessThan($large) {
    height: 480px;
  }
  @include lessThan($medium) {
    height: 400px;
  }
  @include lessThan($small) {
    height: 400px;
  }
}

.footer-right {
  text-align: end;
}

.DataView-Share-Buttons {
  position: absolute;
  padding: 8px;
  right: -4px;
  bottom: 1.5em;
  width: 240px;
  border: solid 1px $gray-4;
  background: $white !important;
  border-radius: 8px;
  text-align: left;
  font-size: 1rem;
  z-index: 9998;

  > * {
    padding: 4px 0;
  }

  > .Close-Button {
    display: flex;
    justify-content: flex-end;
    color: $gray-3;

    button {
      border-radius: 50%;
      border: 1px solid #fff;

      &.focus {
        border: 1px dotted #707070;
        outline: none;
      }
    }
  }

  > .EmbedCode {
    position: relative;
    padding: 4px;
    padding-right: 30px;
    color: rgb(3, 3, 3);
    border: solid 1px #eee;
    border-radius: 8px;
    font-size: 12px;

    .EmbedCode-Copy {
      position: absolute;
      top: 0.3em;
      right: 0.3em;
      color: $gray-3;
    }

    button {
      border-radius: 50%;
      border: solid 1px #eee;

      &:focus {
        border: 1px dotted #707070;
        outline: none;
      }
    }
  }

  > .Buttons {
    display: flex;
    justify-content: center;
    margin-top: 4px;

    .icon-resize {
      border-radius: 50%;
      font-size: 30px;

      &.twitter {
        color: #fff;
        background: #2a96eb;
      }

      &.facebook {
        color: #364e8a;
      }

      &.line {
        color: #1cb127;
      }
    }

    .ButtonsButton {
      width: 30px;
      height: 30px;
      margin-left: 4px;
      margin-right: 4px;

      &:focus {
        border-radius: 50%;
        border: 1px dotted #707070;
        outline: none;
      }
    }
  }
}

.overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  opacity: 0.8;

  > .overlay-text {
    text-align: center;
    padding: 2em;
    width: 60%;
    background: $gray-2;
    border-radius: 8px;
    color: $white !important;
  }
}
</style>
