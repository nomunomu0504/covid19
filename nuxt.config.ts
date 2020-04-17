import { Configuration } from '@nuxt/types'
import i18n from './nuxt-i18n.config'
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const environment = process.env.NODE_ENV || 'development'

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s | 福井県公認 新型コロナウイルス感染症対策サイト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'keywords',
        property: 'keywords',
        content: '福井県, コロナウイルス, 対策サイト, 福井高専, covid19, コロナ, 対策, 公認サイト, 公式, 動向, 陽性患者数, 陽性患者, お問い合わせ件数, 問い合わせ'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://covid19-fukui.com/'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@nomunomu0504'
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@nomunomu0504'
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: ''
      },
      {
        hid: 'note:card',
        property: 'note:card',
        content: 'summary_large_image'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-precomposed.png' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css'
      }
    ],
    script: [
      {
        src: 'https://platform.twitter.com/widgets.js',
        charset: 'utf-8',
        async: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/vue-chart.ts',
      ssr: true
    },
    {
      src: '@/plugins/axe',
      ssr: true
    },
    {
      src: '@/plugins/vuetify.ts',
      ssr: true
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: {
          memoryLimit: 2048,
          workers: 3
        },
        ignoreNotFoundWarnings: false
      }
    ],
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: `.env.${environment}` }],
    ['nuxt-i18n', i18n],
    'nuxt-svg-loader',
    'nuxt-purgecss',
    ['vue-scrollto/nuxt', { duration: 1000, offset: -72 }],
    '@nuxtjs/sitemap',
    '@nuxtjs/proxy',
    ['@nuxtjs/moment', ['ja']],
    '@nuxtjs/axios'
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: false
    }
  },
  googleAnalytics: {
    id: 'UA-58218127-9'
  },
  build: {
    postcss: {
      plugins: [
        autoprefixer({ grid: 'autoplace' }),
        purgecss({
          content: [
            './pages/**/*.vue',
            './layouts/**/*.vue',
            './components/**/*.vue',
            './node_modules/vuetify/dist/vuetify.js',
            './node_modules/vue-spinner/src/ScaleLoader.vue'
          ],
          whitelist: ['html', 'body', 'nuxt-progress', 'DataCard'],
          whitelistPatterns: [/(col|row)/]
        })
      ]
    }
    // https://ja.nuxtjs.org/api/configuration-build/#hardsource
    // hardSource: process.env.NODE_ENV === 'development'
  },
  manifest: {
    name: '福井県公認 新型コロナウイルス感染症対策サイト',
    theme_color: '#00a040',
    background_color: '#ffffff',
    display: 'standalone',
    Scope: '/',
    start_url: '/',
    splash_pages: null
  },
  generate: {
    fallback: true,
    routes() {
      const locales = ['ja']
      const pages = [
        '/cards/details-of-confirmed-cases',
        '/cards/hospital-beds-number-card',
        '/cards/number-of-inspection-persons',
        '/cards/pcr-inspection-reports-number-card',
        '/cards/attributes-of-confirmed-cases',
        '/cards/number-of-inspection-persons'
      ]

      const routes: string[] = []
      locales.forEach(locale => {
        pages.forEach(page => {
          if (locale === 'ja') {
            routes.push(page)
            return
          }
          const route = `/${locale}${page}`
          routes.push(route)
        })
      })
      return routes
    }
  },
  // /*
  // ** hot read configuration for docker
  // */
  watchers: {
    webpack: {
      poll: true
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://covid19-fukui.com/',
    generate: true,
    exclude: ['/contacts', '/parent', '/worker'],
    routes: [
      '/cards/details-of-confirmed-cases',
      '/cards/hospital-beds-number-card',
      '/cards/number-of-confirmed-cases',
      '/cards/pcr-inspection-reports-number-card',
      '/cards/attributes-of-confirmed-cases',
      '/cards/number-of-inspection-persons',
    ]
  },
  proxy: {
    '/pref': {
      target: 'https://www.pref.fukui.lg.jp',
      pathRewrite: {
        '^/pref': '/'
      }
    },
    '/api': {
      target: 'https://covid19-273411.appspot.com',
      pathRewrite: {
        '^/api': '/api'
      }
    }
  }
}

export default config
