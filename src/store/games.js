import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

export default {
	state: {
      // games: [
      //   {
      //     photo: "url", 
      //     name: "Название 1", 
      //     description: "описание", 
      //     mentor: "Витя Маликов", 
      //     coach: "Витя Маликов", 
      //     startDate: "01.01.2020", 
      //     endDate: "01.22.2020", 
      //     activePlayers: 6, 
      //     bannedPlayers: 0
      //   },
      //   {
      //     photo: "url", 
      //     name: "Название 2", 
      //     description: "описание", 
      //     mentor: "Витя Маликов", 
      //     coach: "Витя Маликов", 
      //     startDate: "01.01.2020", 
      //     endDate: "01.04.2020", 
      //     activePlayers: 6, 
      //     bannedPlayers: 0
      //   },
      //   {
      //     photo: "url", 
      //     name: "Название 3", 
      //     description: "описание", 
      //     mentor: "Витя Маликов", 
      //     coach: "Витя Маликов", 
      //     startDate: "11.13.1999", 
      //     endDate: "05.17.2044", 
      //     activePlayers: 6, 
      //     bannedPlayers: 0
      //   },
      //   {
      //     photo: "url", 
      //     name: "Название 4", 
      //     description: "описание",
      //     mentor: "Витя Маликов", 
      //     coach: "Витя Маликов", 
      //     startDate: "01.01.2020", 
      //     endDate: "01.04.2020", 
      //     activePlayers: 6, 
      //     bannedPlayers: 0
      //   },
      //   {
      //     photo: "url", 
      //     name: "Название 5", 
      //     description: "описание", 
      //     mentor: "Витя Маликов", 
      //     coach: "Витя Маликов", 
      //     startDate: "01.01.2020", 
      //     endDate: "01.04.2020", 
      //     activePlayers: 6, 
      //     bannedPlayers: 0
      //   },
      //   {
      //     photo: "url", 
      //     name: "Название 6", 
      //     description: "описание", 
      //     mentor: "Витя Маликов", 
      //     coach: "Витя Маликов", 
      //     startDate: "01.01.2020", 
      //     endDate: "01.04.2020", 
      //     activePlayers: 6, 
      //     bannedPlayers: 0
      //   }
		// ],
		gamesData: {},
	},
   getters: {
      // возвращаем массив игр
      // 'GET_GAMES' (state) {
      //   return state.games
		// },
		'GET_GAMES_LIST'(state) {
			return state.gamesData
		}
	},
	mutations: {
		'SET_LIST_OF_GAMES'(state, payload) {
         state.gamesData = payload;
      },
	},
	actions: {
		'GAMES_FROM_SERVER'({commit}) {
			return axios.get('http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then((response) => {
				commit('SET_LIST_OF_GAMES', response.data)
				return response
			})
			.catch((error) => {
				throw error;
			})
		}
   }
}