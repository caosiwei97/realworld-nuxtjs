const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
  userInfo: null,
})

export const mutations = {
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

export const actions = {
  // 服务端被调用
  nuxtServerInit({ commit }, { req }) {
    let userInfo = null

    if (req.headers.cookie) {
      // 解析客户端cookie数据，直接返回
      // 防止因为客户端刷新页面丢失状态
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        userInfo = parsed.userInfo ? JSON.parse(parsed.userInfo) : userInfo
      } catch (error) {
        console.log(error)
      }
    }

    commit('updateUserInfo', userInfo)
  },
}
