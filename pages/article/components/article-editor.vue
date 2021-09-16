<template>
  <div>
    <form class="card comment-form" @submit.prevent="onPostComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="(comment, index) in comments" :key="'comment-' + index">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: { username: comment.author.username },
        }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: { username: comment.author.username },
        }" class="comment-author">{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { getComments, postComment } from '@/api/article'

  export default {
    name: 'ArticleEditor',

    props: {
      article: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        comments: [],
        comment: '',
      }
    },

    async mounted() {
      try {
        const { comments } = await getComments(this.article.slug)
        this.comments = comments.length
          ? comments
          : [
              {
                id: 1,
                createdAt: '2016-02-18T03:22:56.637Z',
                updatedAt: '2016-02-18T03:22:56.637Z',
                body: 'It takes a Jacobian',
                author: {
                  username: 'jake',
                  bio: 'I work at statefarm',
                  image: 'https://i.stack.imgur.com/xHWG8.jpg',
                  following: false,
                },
              },
            ]
      } catch (error) {}
    },

    methods: {
      async onPostComment() {
        try {
          await postComment(this.article.slug, {
            comment: {
              body: this.comment,
            },
          })
        } catch (error) {}
      },
    },
  }
</script>

<style></style>
