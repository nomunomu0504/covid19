<template>
  <div ref="Side" class="SideNavigation" tabindex="-1">
    <header class="SideNavigation-Header">
      <v-icon
        class="SideNavigation-OpenIcon"
        :aria-label="$t('サイドメニュー項目を開く')"
        @click="$emit('openNavi', $event)"
      >
        mdi-menu
      </v-icon>
      <h1 class="SideNavigation-HeaderTitle">
        <nuxt-link :to="localePath('/')" class="SideNavigation-HeaderLink">
          <img
            class="SideNavigation-HeaderLogo"
            src="/logo.svg"
            :alt="$t('福井県')"
          />
          <div class="SideNavigation-HeaderText">
            {{ $t('福井県公認 新型コロナウイルス') }}<br />
            {{ $t('対策サイト') }}
          </div>
        </nuxt-link>
      </h1>
    </header>

    <div :class="['SideNavigation-Body', { '-opened': isNaviOpen }]">
      <v-icon
        class="SideNavigation-CloseIcon"
        :aria-label="$t('サイドメニュー項目を閉じる')"
        @click="$emit('closeNavi', $event)"
      >
        mdi-close
      </v-icon>

      <nav class="SideNavigation-Menu">
        <MenuList :items="items" @click="$emit('closeNavi', $event)" />
        <div
          v-if="this.$i18n.locales.length > 1"
          class="SideNavigation-Language"
        />
      </nav>

      <footer class="SideNavigation-Footer">
        {{ $t('※') }}
        {{ $t('このサイトは福井高専卒のエンジニアが開設したものです') }}
        <br /><br />
        <div class="SideNavigation-Social">
          <a
            href="https://twitter.com/covid19_fukui"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/twitter.webp" type="image/webp" />
              <img src="/twitter.png" alt="Twitter" />
            </picture>
          </a>
          <a
            href="https://www.facebook.com/StopCovid19Fukui/"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/facebook.webp" type="image/webp" />
              <img src="/facebook.png" alt="Facebook" />
            </picture>
          </a>
          <a
            href="https://github.com/nomunomu0504/covid19"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/github.webp" type="image/webp" />
              <img src="/github.png" alt="GitHub" />
            </picture>
          </a>
        </div>
        <p class="SideNavigation-Copyright">
          supported by
        </p>
        <picture>
          <img src="/sakura.svg" alt="sakura internet" />
        </picture>
        <small class="SideNavigation-Copyright-license">
          Content on This Site is Licensed Under a
          <a
            rel="license"
            target="_blank"
            href="http://creativecommons.org/licenses/by/4.0/"
          >
            Creative Commons Attribution 4.0 International License </a
          >provided under<br />
          2020 Tokyo Metropolitan Government<br />
          © 2020 covid19-fukui.com
        </small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
// import LanguageSelector from '@/components/LanguageSelector.vue'
import MenuList from '@/components/MenuList.vue'

type Item = {
  icon?: string
  title: TranslateResult
  link: string
  divider?: boolean
}

export default Vue.extend({
  components: {
    // LanguageSelector,
    MenuList
  },
  props: {
    isNaviOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    items(): Item[] {
      return [
        {
          icon: 'mdi-chart-timeline-variant',
          title: this.$t('福井県内の最新感染動向'),
          link: this.localePath('/')
        },
        {
          icon: 'CovidIcon',
          title: this.$t('新型コロナウイルス感染症が心配な方はこちら'),
          link: this.localePath('/flow')
        },
        {
          icon: 'SurgicalMaskIcon',
          title: this.$t('県あっせんマスクについて'),
          link: this.localePath('/mask'),
          divider: true
        },
        {
          icon: 'mdi-information',
          title: this.$t('福井新聞社の速報（RSS）'),
          link: this.localePath('/rss-news')
        },
        {
          icon: 'mdi-information',
          title: this.$t('福井県内のお知らせ一覧'),
          link: this.localePath('/news')
        },
        {
          icon: 'mdi-information',
          title: this.$t('国内のお知らせ一覧'),
          link: this.localePath('/japan-news'),
          divider: true
        },
        {
          icon: 'mdi-account-multiple',
          title: this.$t('福井県民の皆様へ'),
          link:
            'https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html#'
        },
        {
          icon: 'ParentIcon',
          title: this.$t('保護者の皆様へ'),
          link: 'https://www.pref.fukui.lg.jp/doc/kyousei/korona_kyouiku.html'
        },
        {
          icon: 'mdi-domain',
          title: this.$t('企業・はたらく皆様へ'),
          link:
            'https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html#kigyou'
        },
        {
          icon: 'mdi-domain',
          title: this.$t('医療機関の皆様へ'),
          link:
            'https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html#iryou',
          divider: true
        },
        {
          title: this.$t(
            '新型コロナウイルス感染拡大防止に係る施設利用について'
          ),
          link:
            'https://www.pref.fukui.lg.jp/doc/013710/sports-shisetsu-covid19/sports-shisetsu-covid19.html'
        },
        {
          title: this.$t(
            '新型コロナウイルス感染拡大防止に伴うイベントの中止・延期について'
          ),
          link: 'https://www.city.fukui.lg.jp/fukusi/iryou/kensen/p021724.html'
        },
        {
          title: this.$t('新型コロナウイルスにおける各種相談窓口はこちら'),
          link: 'https://www.pref.fukui.lg.jp/doc/kouho/navi.html',
          divider: true
        },
        {
          title: this.$t('当サイトについて'),
          link: this.localePath('/about')
        },
        {
          title: this.$t('福井県庁公式サイト'),
          link: 'https://www.pref.fukui.lg.jp/'
        }
      ]
    }
  },
  watch: {
    $route: 'handleChageRoute'
  },
  methods: {
    handleChageRoute() {
      // nuxt-link で遷移するとフォーカスが残り続けるので $route を監視して SideNavigation にフォーカスする
      return this.$nextTick().then(() => {
        const $Side = this.$refs.Side as HTMLEmbedElement | undefined
        if ($Side) {
          $Side.focus()
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  height: 100%;
  background: $white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);

  &:focus {
    outline: 1px dotted $gray-3;
  }
}

.SideNavigation-Header {
  height: 64px;
  padding-left: 52px;
  @include largerThan($small) {
    height: auto;
    padding: 20px;
  }
  @include lessThan($small) {
    display: flex;
  }
  @include lessThan($tiny) {
    padding-left: 44px;
  }
}

.SideNavigation-OpenIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-CloseIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-HeaderTitle {
  width: 100%;
  font-size: 13px;
  color: #707070;
  @include largerThan($small) {
    margin: 0;
    margin-top: 10px;
  }
}

.SideNavigation-HeaderLink {
  display: flex;
  align-items: center;
  padding-right: 10px;
  @include lessThan($small) {
    height: 64px;
  }
  @include lessThan($tiny) {
    justify-content: space-between;
  }
  &:link,
  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:hover,
  &:focus {
    font-weight: bold;
  }

  &:focus {
    outline: dotted $gray-3 1px;
  }

  @include largerThan($small) {
    display: block;
    padding: 15px 0;
  }
}

.SideNavigation-HeaderLogo {
  @include lessThan($tiny) {
    width: 100px;
  }
}

.SideNavigation-HeaderText {
  margin: 10px 0 0 0;
  @include lessThan($small) {
    margin: 0 0 0 10px;
  }

  @include lessThan($tiny) {
    margin: 0;
  }
}

.SideNavigation-Body {
  padding: 0 20px 20px;
  background-color: $white;
  @include lessThan($small) {
    display: none;
    padding: 0 36px 36px;
    &.-opened {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      display: block !important;
      width: 100%;
      z-index: z-index-of(opened-side-navigation);
      background-color: $white;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

.SideNavigation-Menu {
  @include lessThan($small) {
    padding-top: 50px;
  }
}

.SideNavigation-Language {
  padding-top: 20px;
}

.SideNavigation-LanguageLabel {
  display: block;
  margin-bottom: 5px;
  font-size: 0.85rem;
}

.SideNavigation-Footer {
  padding-top: 20px;
  background-color: $white;
}

.SideNavigation-Social {
  display: flex;
}

.SideNavigation-SocialLink {
  border: 1px dotted transparent;
  border-radius: 30px;
  color: $gray-3;

  &:link,
  &:hover,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:focus {
    color: inherit;
    text-decoration: none;
    border: 1px dotted $gray-3;
    outline: none;
  }

  & + & {
    margin-left: 10px;
  }

  img {
    width: 30px;
  }
}

.SideNavigation-Copyright {
  display: block;
  margin-top: 15px;
  color: $gray-1;
  font-size: 14px;
  line-height: 1.3;
  font-weight: bold;
  &-license {
    display: block;
    margin-top: 10px;
    font-size: 8px;
    line-height: 1.2;
    color: $gray-1;
    font-weight: bold;
  }
}

.SideNavigation-LicenseLink {
  &:focus {
    outline: 1px dotted $gray-3;
  }
}
</style>
