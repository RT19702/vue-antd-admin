import config from '@/config'

const state = {
  collapsed: false,
  ...config
}

const mutations = {
  SET_COLLAPSED: (state, collapsed) => {
    state.collapsed = collapsed
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
