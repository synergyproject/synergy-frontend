import axios from 'axios'

export default {
    state: {
        gamesData: {},
        changingGame:{
            changing: false,
            gameID:''    
        }
    },
    
    getters: {
        "GET_GAMES_LIST"(state) {
            return state.gamesData;
        },

        "GET_GAME_BY_ID": state => id =>{
            const game = state.gamesData.games.find(item => item.id==id )
            return game;
        },
        
        GET_CHANGING_GAME (state) {
            return state.changingGame
        }
    },

    mutations: {
        "SET_LIST_OF_GAMES"(state, payload) {
            state.gamesData = payload;
        },

        "ADD_LIST_OF_GAMES"(state, payload) {
            state.gamesData.games.push(payload)
        },
        
        "SET_GAME_BY_ID"(state, payload) {
            state.gamesData.games = state.gamesData.games.map(item =>item.id == payload.id ? item = payload : item = item)
        },

        SET_CHANGING_GAME (state, payload){
            payload == '' ? state.changingGame.gameID = '' : state.changingGame.gameID = payload 
            payload == '' ? state.changingGame.changing = false : state.changingGame.changing = true
        }
    },

    actions: {
        "GAMES_FROM_SERVER"({ commit }) {
            return axios
                .get(
                    "http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/users",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    commit("SET_LIST_OF_GAMES", response.data);
                    return response;
                })
                .catch((error) => {
                    throw error;
                });
            }
    }    
}