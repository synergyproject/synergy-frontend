import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatar: null
  },
  getters: {
    //получаем url аватарки
    GET_AVATAR (state) {
      if (state.avatar) {
        return URL.createObjectURL(state.avatar)
      } else {
        return null
      }
    }
  },
  mutations: {
    SET_AVATAR (state, value) {
      //помещаем изображение в хранилище
      state.avatar = value
    }
  },
  actions: {
    //запрашиваем данные у сервера
    FETCH_AVATAR ({commit}) {
      return axios('http://some-url', {
        method: "GET"
      })
      .then((avatar) => {
        commit('SET_AVATAR', avatar);
        return avatar;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    }
  },
  modules: {
  }
})
