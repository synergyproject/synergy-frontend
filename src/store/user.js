import axios from 'axios'
export default {
    state: {
        user: {
            firstName: 'Prokofey', 
            surname: 'Kuznetsov', 
            email:'Prokofey_Kuznetsov@gmail.com', 
            usernameTelegram: '@ahtung', 
            phone: '+380501234567', 
            birthday: '1999-09-25', 
            avatar: null
        },
        currentLanguage: 'Eng'
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
        },
        GET_CURRENT_LANGUAGE (state) {
            return state.currentLanguage
        }
    },
  
    mutations: {
        SET_AVATAR (state, value) {
            state.user.avatar = value
        },
        SET_USER (state, value) {
            Object.assign(state.user, value)
        },
        SET_CURRENT_LANGUAGE (state, value) {
            switch (value) {
                case 'en':
                    state.currentLanguage = 'Eng';
                    break;
                case 'ru':
                    state.currentLanguage = 'Рус';
                    break;
            }
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