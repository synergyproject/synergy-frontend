import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: {firstName: 'Прокофий', surname: 'Кузнецов', email:'Prokofey_Kuznetsov@gmail.com', 
            usernameTelegram: '@Prokofey_Kuznetsov', phone: '+3801234567', birthday: '1999-05-10', avatar: null},
    games: [
      {photo: "url", name: "Название 1", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.22.2020", activePlayers: 6, bannedPlayers: 0},
      {photo: "url", name: "Название 2", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0},
      {photo: "url", name: "Название 3", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "11.13.1999", endDate: "05.17.2044", activePlayers: 6, bannedPlayers: 0},
      {photo: "url", name: "Название 4", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0},
      {photo: "url", name: "Название 5", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0},
      {photo: "url", name: "Название 6", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0}
    ]
  },

  getters: {
    //возвращаем url аватарки
    GET_AVATAR (state) {
      if (state.admin.avatar) {
        return URL.createObjectURL(state.admin.avatar)
      } else {
        return null
      }
    },
    //возварщаем обьект администратор
    GET_ADMIN (state) {
      return state.admin
    },
    // возвращаем массив игр
    GET_GAMES (state) {
      return state.games
    }
  },

  mutations: {
    //помещаем изображение в хранилище
    SET_AVATAR (state, value) {
      state.admin.avatar = value
    },
    //редактируем админа - в value передаем обьект с такими же ключами/значениями!
    SET_ADMIN (state, value) {
      Object.assign(state.admin, value)
    }
  },

  actions: {
    //запрашиваем аватарку у сервера
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
