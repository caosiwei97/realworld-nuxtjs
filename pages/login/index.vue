<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link :to="{ name: 'login' }" v-if="!isLogin"
              >Have an account?</nuxt-link
            >
            <nuxt-link :to="{ name: 'register' }" v-else
              >Need an account?</nuxt-link
            >
          </p>

          <ul class="error-messages">
            <li v-for="(value, key) in errors" :key="key">
              {{ key }} {{ value }}
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                v-model="user.password"
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login, register } from '@/api/login'
  // 只在客户端加载 js-cookie
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    name: 'LoginAndRegister',
    middleware: 'unauthenticated',
    data() {
      return {
        user: {
          email: '',
          password: '',
          username: '',
        },
        errors: null,
      }
    },

    computed: {
      isLogin() {
        return this.$route.path === '/login'
      },
    },

    methods: {
      async onSubmit() {
        try {
          const methodName = this.isLogin ? login : register
          const res = await methodName({
            user: this.user,
          })
          // 处理登录状态: 同构保存
          this.$store.commit('updateUserInfo', res.user)
          // 存入浏览器cookie
          Cookie.set('userInfo', JSON.stringify(res.user))

          this.$nextTick(() => {
            this.$router.push('/')
          })
        } catch (error) {
          this.errors = error.errors
        }
      },
    },
  }
</script>

<style></style>
