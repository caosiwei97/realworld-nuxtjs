import { request } from '@/plugins/axios'

/**
 * 文章列表
 * @param {object} params tag author favorited limit offset
 * @returns
 */
export const getArticles = (params) => request.get('/api/articles', params)

/**
 * 文章详情
 * @returns
 */
export const getArticleDetail = (slug) => request.get(`/api/articles/${slug}`)

/**
 * 获取关注的文章列表
 * @param {object} params tag author favorited limit offset
 * @returns
 */
export const getFeedArticles = (params) =>
  request.get('/api/articles/feed', params)

/**
 * 发表文章
 * @returns
 */
export const postArticle = (data) => request.post('/api/articles', data)

/**
 * 点赞
 * @returns
 */

export const favoriteArticle = (slug) =>
  request.post(`/api/articles/${slug}/favorite`)
/**
 * 取消点赞
 * @returns
 */
export const dissArticle = (slug) =>
  request.delete(`/api/articles/${slug}/favorite`)

// 获取某篇文章下所有评论
export const getComments = (slug) =>
  request.get(`/api/articles/${slug}/comments`)

// 在某篇文章下发表评论
export const postComment = (slug, data) =>
  request.post(`/api/articles/${slug}/comments`, data)
