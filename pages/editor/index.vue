<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter.exact="article.tagList.push($event.target.value)"
                />
                <div class="tag-list" v-for="tag in article.tagList" :key="tag">
                  {{ tag }}
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { postArticle } from '@/api/article'

  export default {
    name: 'Editor',
    middleware: 'authenticated',
    data() {
      return {
        article: {
          title: '',
          description: '',
          body: '',
          tagList: [],
        },
      }
    },

    methods: {
      async onSubmit() {
        try {
          await postArticle({
            article: this.article,
          })
          this.$router.push('/')
        } catch (error) {}
      },
    },
  }
</script>

<style></style>
