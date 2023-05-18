import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loginApi } from '@/api/user'
const user = {
  state: {
    token: '',
  },
  getters: {
    token: function (state) {
      if (state.token) {
        return state.token
      }
      state.token = JSON.parse(storage.get(ACCESS_TOKEN))
      return state.token
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      loginApi().then((res) => {
        console.log(
          '%c [ res ]-25',
          'font-size:15px; background:#14874a; color:#58cb8e;',
          res
        )
        // ...do some thing
        commit('SET_TOKEN', userInfo.token)
        storage.set(ACCESS_TOKEN, userInfo.token, 7 * 24 * 60 * 60 * 1000)
      })
    },
    logout({ commit }) {
      commit('SET_TOKEN', '')
    },
  },
}
export default user
