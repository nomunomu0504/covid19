export default {
  strategy: 'prefix_except_default',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected'
  },
  defaultLocale: 'ja',
  vueI18n: {
    fallbackLocale: 'ja',
    formatFallbackMessages: true,
    silentTranslationWarn: true
  },
  vueI18nLoader: true,
  lazy: true,
  langDir: 'assets/locales/',
  locales: [
    {
      code: 'ja',
      name: '日本語',
      iso: 'ja-JP',
      file: 'ja.json',
      description: 'Japanese'
    },
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
      file: 'en.json',
      description: 'English'
    },
    {
      code: 'ja-basic',
      name: 'やさしい にほんご',
      iso: 'ja-JP',
      file: 'ja-Hira.json',
      description: 'Easy Japanese'
    }
    // {
    //   code: 'zh-cn',
    //   name: '简体中文',
    //   iso: 'zh-CN',
    //   file: 'zh_CN.json',
    //   description: 'Simplified Chinese'
    // },
    // {
    //   code: 'zh-tw',
    //   name: '繁體中文',
    //   iso: 'zh-TW',
    //   file: 'zh_TW.json',
    //   description: 'Traditional Chinese'
    // },
    // {
    //   code: 'ko',
    //   name: '한국어',
    //   iso: 'ko-KR',
    //   file: 'ko.json',
    //   description: 'Korean'
    // },
    // {
    //   code: 'pt-BR',
    //   name: 'Portuguese',
    //   iso: 'pt-BR',
    //   file: 'pt_BR.json',
    //   description: 'Portuguese'
    // },
    // {
    //   code: 'th',
    //   name: 'ภาษาไทย',
    //   iso: 'th',
    //   file: 'th.json',
    //   description: 'Thai'
    // },
    // {
    //   code: 'vi',
    //   name: 'Tiếng Việt',
    //   iso: 'vi',
    //   file: 'vi.json',
    //   description: 'Vietnamese'
    // }
  ]
}
