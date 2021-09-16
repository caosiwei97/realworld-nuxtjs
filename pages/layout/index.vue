<template>
  <div>
    <!-- header -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" :to="{ name: 'home' }">Home</nuxt-link>
          </li>

          <template v-if="userInfo">
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{ name: 'editor' }">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{ name: 'settings' }">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link
                class="nav-link active"
                :to="{ name: 'profile', params: { username: 'robot' } }"
              >
                <img
                  class="user-pic"
                  :src="userInfo.image"
                  v-if="userInfo.image"
                />
                {{ userInfo.username }}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{ name: 'login' }"
                >Sign in</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{ name: 'register' }"
                >Sign out</nuxt-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- nuxt-child -->
    <nuxt-child></nuxt-child>
    <!-- footer -->
    <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'LayoutIndex',

    computed: {
      ...mapState(['userInfo']),
    },
  }
</script>

<style></style>
