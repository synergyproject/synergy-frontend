
import axios from 'axios'
let Storage = localStorage.getItem('GameSelected');
Storage ? JSON.parse(Storage): [];
export default {
    state: {
      selectedGame: Storage ? JSON.parse(Storage): {
        id:'', 
        name:'', 
        date:'',
          coach: {
              firstName: "",
              id: "",
              lastName: "",
              photo: ""
          }
        },
      game: {
        gameId: '123', 
        title: 'Великолепная Игра', 
        date: '15.07.2020',
        rating: [
          {
            userId: '11',
            firstName: 'Георгий',
            surname: 'Васергольштейн',
            avatar: null,  
            rating:'1'
          },          {
            userId: '33',
            firstName: 'Роман',
            surname: 'Васергольштейн',
            avatar: null,  
            rating:'2'
          },
          {
            userId: '4',
            firstName: 'Роман',
            surname: 'Каземиров',
            avatar: null,  
            rating:'3'
          },
          {
            userId: '99',
            firstName: 'Данил',
            surname: 'Ким',
            avatar: null,  
            rating:'4'
          },
          {
            userId: '7',
            firstName: 'Дмитрий',
            surname: 'Васергольштейн',
            avatar: null,  
            rating:'5'
          },
          {
            userId: '8',
            firstName: 'Георгий',
            surname: 'Васичкин',
            avatar: null,  
            role:'user'
        },

        ]
      },

      posts:[],

    },
    getters: {

      GET_USERIN (state) {
        return state.userIn
      },

      // возвращаем массив игр
      GET_POSTS (state) {
        return state.posts
      },
      
      // возвращаем данные по выбранной игре
      GET_GAME (state) {
        return state.game
      },

      GET_SELECTED_GAME (state) {
        return state.selectedGame
      }

    },
    mutations: {
      SET_SELECTED_GAME (state, payload) {
        state.selectedGame = payload;
        localStorage.setItem('GameSelected', JSON.stringify(state.selectedGame))
      },
      SET_LIST_OF_POSTS (state, payload) {
        state.posts = payload;
      },
      // SET_NEW_POST(state, payload){
      //   console.log(payload)
      //   state.posts.push(payload)
      //   console.log(state.posts)
      // }
    },
    actions: {
      "POSTS_FROM_SERVER"({ commit }, payload) {
        return axios
          .get(
            `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload}/feed`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            commit("SET_LIST_OF_POSTS", response.data.posts);
            return response;
          })
          .catch((error) => {
            throw error;
          });
      },
      "SELECTED_GAMES_FROM_SERVER"({ commit }, payload) {
        return axios
          .get(
            `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            commit("SET_SELECTED_GAME", response.data);
            return response;
          })
          .catch((error) => {
            throw error;
          });
      },

      'SEND_LIKE'({ commit}, payload) {

        return axios
          .post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameID}/feed/${payload.postID}/likes`, payload.info, {
            headers: {
              
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          // .then(response => {
          //   // console.log('posts', response)
          //   // commit("POSTS_FROM_SERVER", response.data.posts)
          //   return response
          // })
          .catch(error => {
            throw error;
          });
      },
      'DEL_LIKE'({ commit}, payload) {

        return axios
          .delete(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameID}/feed/${payload.postID}/likes`,  {
            headers: {
              
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          // .then(response => {
          //   // console.log('posts', response)
          //   // commit("POSTS_FROM_SERVER", response.data.posts)
          //   return response
          // })
          .catch(error => {
            throw error;
          });
      },    
      'SEND_POST'({ commit}, payload) {
        const formData = new FormData();
        formData.append('text', payload.text);
        // formData.append('files', payload.files);
        console.log('files', payload.files)
        payload.files.forEach(img => {
          formData.append('files', img)
          })

        return axios
          .post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameID}/feed`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          .then(response => {
            console.log('posts', response)
            // commit("SET_NEW_POST", response.data)
            return response
          })
          .catch(error => {
            throw error;
          });
      },  
      'DEL_POST'({ commit}, payload) {
        console.log('payload', payload)

        return axios
          .delete(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameID}/feed/${payload.postID}`,  {
            headers: {
              
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          .catch(error => {
            throw error;
          });
      },  
      'SEND_COMMENT'({ commit}, payload) {
        return axios
          .post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameID}/comments`, payload.info, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          })
          .catch(error => {
            throw error;
          });
      }, 
    },
  } 