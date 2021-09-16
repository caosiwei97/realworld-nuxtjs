import axios from 'axios'
import errorHandle from '@/utils/errorHandler'

class HttpRequest {
  constructor(baseURL, state) {
    this.baseURL = baseURL
    this.timeout = 10 * 1000
    this.state = state || null
  }

  get(url, params ={}, config = {}) {
    return this._createAxiosInstance({
      url,
      method: 'get',
      params,
      ...config,
    })
  }

  post(url, data = null, config = {}) {
    return this._createAxiosInstance({
      url,
      method: 'post',
      data,
      ...config,
    })
  }

  put(url, data = null, config = {}) {
    return this._createAxiosInstance({
      url,
      method: 'put',
      data,
      ...config,
    })
  }

  delete(url, params = {}, config = {}) {
    return this._createAxiosInstance({
      url,
      method: 'delete',
      params,
      ...config,
    })
  }

  _getDefaultConfig() {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
    }
  }

  _createAxiosInstance(options) {
    const instance = axios.create()
    this.configInterceptors(instance)
    return instance({
      ...this._getDefaultConfig(),
      ...options,
    })
  }

  configInterceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        if(this.state?.userInfo?.token) {
          config.headers.Authorization = `Token ${this.state.userInfo.token}`
        }
        return config
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      },
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // 对响应数据做点什么
        if (res.status === 200) return Promise.resolve(res.data)
        return Promise.reject(res)
      },
      (error) => {
        // 对响应错误做点什么
        if (process.client) return errorHandle(error)
      },
    )
  }
}
let request = null
const axiosPlugin = ({ store }) => {
  request = new HttpRequest(process.env.API_BASE_URL, store.state)
}

export { request }
export default axiosPlugin
