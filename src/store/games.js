import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
export default {
    state: {
      avatar: null,
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
        if (state.avatar) {
          return URL.createObjectURL(state.avatar)
        } else {
          return null
        }
      },
      // возвращаем массив игр
      GET_GAMES (state) {
        return state.games
      }
    },
  
    mutations: {
      //помещаем изображение в хранилище
      SET_AVATAR (state, value) {
        state.avatar = value
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
      },
    }
}