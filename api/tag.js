import { request } from '@/plugins/axios'

/**
 * 获取文章标签
 * @returns 
 */
export const getTags = () => request.get('/api/tags')
