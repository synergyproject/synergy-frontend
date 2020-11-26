import axios from 'axios'
export default {
    state: {
      user: {firstName: '', surname: '', email:'Prokofey_Kuznetsov@gmail.com', 
              usernameTelegram: '', phone: '', birthday: '', avatar: null},
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
        if (state.user.avatar) {
          return URL.createObjectURL(state.user.avatar)
        } else {
          return null
        }
      },
      //возварщаем обьект администратор
      GET_USER (state) {
        return state.user
      },
      // возвращаем массив игр
      GET_GAMES (state) {
        return state.games
      }
    },
  
    mutations: {
      //помещаем изображение в хранилище
      SET_AVATAR (state, value) {
        state.user.avatar = value
      },
      //редактируем админа - в value передаем обьект с такими же ключами/значениями!
      SET_USER (state, value) {
        Object.assign(state.user, value)
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
    
}