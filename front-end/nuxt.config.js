const API_URL = 'http://localhost:4242'

export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'suna-chatapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy'
  ],

  // Proxy to avoid CORS
  proxy: {
    '/api/': { target: API_URL, pathRewrite: {'^/api/': ''}, changeOrigin: true }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    proxyHeaders: true
  },

  // authentication configuration
  auth : {
    strategies: {
      local: {
        endpoints: {
          login: {
            url:`/api/users/login`,
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: `/api/users/me`,
            method: 'get',
            propertyName: 'user',
          },
          logout: true,
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/login?required', // User will be redirected to this path if login is required
      logout: '/login', // User will be redirected to this path if after logout, current route is protected
      home: '/user', // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    port: 8000 // default: 3000
  }
}
