<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: { username: article.author.username },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: { username: article.author.username },
        }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.updatedAt | date }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{ actice: article.author.following }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{ actice: article.favorited }"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'ArticleMeta',

    props: {
      article: Object,
      required: true,
    },

    // 增加SEO
    head() {
      return {
        title: `${this.article.title} - realworld`,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: this.article.description,
          },
        ],
      }
    },
  }
</script>

<style></style>
