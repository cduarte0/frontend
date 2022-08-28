export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Caritas - Gestão de Projectos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Caritas - Gestão de Projectos' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    ['vue-wait/nuxt', { useVuex: true }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth',
            method: 'post',
            propertyName: 'accessToken',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
          logout: { url: '/auth', method: 'delete' },
          user: { url: '/auth/me', method: 'get', propertyName: null },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      home: '/users',
    },
    plugins: ['~/plugins/authRefreshToken.js'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: '/api/',
    baseURL:'http://localhost:8080',
  },
  proxy: {
    '/api':'http://localhost:8080',
  },

   router: {
     middleware: ['auth'],
   },

  pwa: {
    manifest: {
      lang: 'en',
    },
    icon: {
      fileName: 'icon.png',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
