import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatar: null
  },
  getters: {
    getAvatar (state) {
      //запрос на url аватара
      //если файл существует то возвращаем url фото, иначе вернем null
      if (state.avatar) {
        return URL.createObjectURL(state.avatar)
      } else {
        return null
      }
    }
  },
  mutations: {
    setAvatar (state, value) {
      state.avatar = value
    }
  },
  actions: {
  },
  modules: {
  }
})
