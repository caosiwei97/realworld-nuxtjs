<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="toHTML(article.body)"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleEditor :article="article"></ArticleEditor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getArticleDetail } from '@/api/article'
  import MarkdownIt from 'markdown-it'
  import ArticleMeta from './components/article-meta'
  import ArticleEditor from './components/article-editor'

  export default {
    name: 'Article',
    components: {
      ArticleMeta,
      ArticleEditor,
    },
    middleware: 'authenticated',

    async asyncData({ params }) {
      const { article } = await getArticleDetail(params.slug)

      return {
        article,
      }
    },

    methods: {
      toHTML(mdString) {
        const md = new MarkdownIt()
        return md.render(mdString)
      },
    },
  }
</script>

<style></style>
