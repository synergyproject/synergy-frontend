import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

export default {
  state: {
    coaches: [
      {
        id: "999999",
        firstName:  "Дима",
        lastName: "Лопухин",
        games: ['Игра 1', 'Игра 2', 'Игра 3', 'Игра 4', 'Игра 5', 'Игра 6', 'Игра 7'],
        delete:"Y",
        licenses:"12"

      },
      {
        id: "999999",
        firstName:  "Лена",
        lastName: "Лисичкина",
        games: ['Игра 1'],
        delete:"N",
        licenses:"12"

      },
      {
        id: "999999",
        firstName:  "Лена",
        lastName: "Лисичкина",
        games: ['Игра 1'],
        delete:"N",
        licenses:"12"

      },
      {
        id: "999999",
        firstName:  "Лена",
        lastName: "Лисичкина",
        games: ['Игра 1'],
        delete:"N",
        licenses:"12"

      },
      {
        id: "66",
        firstName:  "Лена",
        lastName: "Лиси",
        games: ['Игра 1'],
        delete:"N",
        licenses:"12"

      },
      {
        id: "9",
        firstName:  "Aня",
        lastName: "Лисичкина",
        games: ['Игра 3'],
        delete:"N",
        licenses:"12"

      },
      {
        id: "999999",
        firstName:  "Лена",
        lastName: "Лисичкина",
        games: ['Игра 1'],
        delete:"N",
        licenses:"6"

      },

    ],
  
  },
  getters: {

    'GET_COACHES' (state) {
      return state.coaches
    },

  },
  mutations: {
    "SET_COACH"(state, payload) {
      state.state.coaches.push(payload);
    },

  },
  actions: {
    
  },
};