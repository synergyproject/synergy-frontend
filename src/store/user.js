import axios from 'axios'
export default {
    state: {
      user: {
        firstName: '', 
        surname: 'Petrovich', 
        email:'Prokofey_Kuznetsov@gmail.com', 
        usernameTelegram: '', 
        phone: '+380501234567', 
        birthday: '', 
        avatar: null
      }
    },
    getters: {
      GET_AVATAR (state) {
        if (state.user.avatar) {
          return URL.createObjectURL(state.user.avatar)
        } else {
          return null
        }
      },
      GET_USER (state) {
        return state.user
      }
    },
  
    mutations: {
      SET_AVATAR (state, value) {
        state.user.avatar = value
      },
      SET_USER (state, value) {
        Object.assign(state.user, value)
      }
    },
  
    actions: {
      //запрашиваем аватарку у сервера
      // FETCH_AVATAR ({commit}) {
      //   return axios('http://some-url', {
      //     method: "GET"
      //   })
      //   .then((avatar) => {
      //     commit('SET_AVATAR', avatar);
      //     return avatar;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     return error;
      //   })
      // }
    }   
}