export default {
  env: {
    API_BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'http://113.31.147.162:3001'
        : 'http://localhost:3001',
  },

  router: {
    // linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 重置路由
      routes.length = 0
      const newRoutes = [
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              name: 'home',
              path: '',
              component: resolve(__dirname, 'pages/home'),
            },
            {
              name: 'login',
              path: '/login',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              name: 'register',
              path: '/register',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              name: 'profile',
              path: '/profile/:username',
              component: resolve(__dirname, 'pages/profile'),
            },
            {
              name: 'settings',
              path: '/settings',
              component: resolve(__dirname, 'pages/settings'),
            },
            {
              name: 'editor',
              path: '/editor',
              component: resolve(__dirname, 'pages/editor'),
            },
            {
              name: 'article',
              path: '/article/:slug',
              component: resolve(__dirname, 'pages/article'),
            },
          ],
        },
      ]
      routes.push(...newRoutes)
    },
  },

  head: {
    link: [
      { rel: 'favicon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: '/css/main.css' },
      {
        rel: 'stylesheet',
        href: '//cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css',
      },
      {
        rel: 'stylesheet',
        href: '/css/font.css',
      },
    ],
  },

  plugins: ['~/plugins/axios.js', '~/plugins/dayjs.js'],
}
