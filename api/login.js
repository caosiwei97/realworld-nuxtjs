import { request } from '@/plugins/axios'

export const login = (data) => request.post('/api/users/login', data)
export const register = (data) => request.post('/api/users', data)
