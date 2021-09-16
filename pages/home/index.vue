<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="userInfo">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'home', query: { tab: 'tag' } }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="preview in articles"
            :key="preview.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: { username: preview.author.username },
                }"
                ><img :src="preview.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: { username: preview.author.username },
                  }"
                  class="author"
                  >{{ preview.author.username }}</nuxt-link
                >
                <span class="date">{{ preview.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: preview.favoritesCount }"
                :disabled="preview.isLoading"
                @click="onFavoriteClick(preview)"
              >
                <i class="ion-heart"></i> {{ preview.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: { slug: preview.slug },
              }"
            >
              <h1>{{ preview.title }}</h1>
              <p>{{ preview.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- pagination -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item ng-scope"
                :class="{ active: pageIndex === page }"
                v-for="pageIndex in totalPages"
                :key="'page-' + pageIndex"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: { page: pageIndex, tag: $route.query.tag, tab },
                  }"
                  >{{ pageIndex }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :to="{ name: 'home', query: { tag, tab: 'tag' } }"
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getArticles,
    getFeedArticles,
    favoriteArticle,
    dissArticle,
  } from '@/api/article'
  import { getTags } from '@/api/tag'
  import { mapState } from 'vuex'

  export default {
    name: 'HomeIndex',

    async asyncData({ query, store }) {
      // 每页展示数据的条数
      const limit = 5
      // 当前页数
      const page = parseInt(query.page || 1)
      const tag = query.tag
      const tab = query.tab || 'global_feed'
      const currentAction =
        tab === 'your_feed' && store.state.userInfo
          ? getFeedArticles
          : getArticles
      try {
        const { articles = [], articlesCount = 0 } = await currentAction({
          limit,
          tag,
          offset: (page - 1) * limit,
        })
        const tagsInfo = await getTags()
        articles.forEach((item) => (item.isLoading = false))
        return {
          articles,
          articlesCount,
          tags: tagsInfo.tags || [],
          limit,
          page,
          tag,
          tab,
        }
      } catch (error) {}
    },

    // 监听页码变化，重新请求ayncData
    // 防止 SPA 客户端更新数据后不会请求最新数据
    watchQuery: ['page', 'tag', 'tab'],

    computed: {
      ...mapState(['userInfo']),
      totalPages() {
        return Math.ceil(this.articlesCount / this.limit)
      },
    },

    methods: {
      async onFavoriteClick(article) {
        // 加锁
        try {
          article.isLoading = true
          if (article.favorited) {
            await dissArticle(article.slug)
            article.favoritesCount += -1
          } else {
            await favoriteArticle(article.slug)
            article.favoritesCount += 1
          }
          article.favorited = !article.favorited
          article.isLoading = false
        } catch (error) {
          console.log(error.errors.message)
        }
      },
    },
  }
</script>
