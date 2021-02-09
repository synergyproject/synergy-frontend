import axios from 'axios'

export default {
    state: {
        // игры приходят в таком виде
        // "{"
        //   games":[
        //   {
        //     "id":2,
        //     "logoUrl":"https://synergy-net.s3.eu-central-1.amazonaws.com/game/2.jpg",
        //     "name":"Phasmophobia",
        //     "description":"Phasmophobia is a 4 player online.",
        //     "mentor":{"id":3,"password":"$2a$10$3bZrqyz6cLAzS67UlRn/vedy/rLIA0YX2SDgQAoADEkP.qbaJ45bm","firstName":"Alina","lastName":"Zubkova","email":"alinna135@gmail.com","gender":"FEMALE","status":"ACTIVE","phone":"+380634167525","dateOfBirth":"1991-12-01","telegram":"@Fine02","telegramChatId":null,"photo":"https://synergy-net.s3.eu-central-1.amazonaws.com/profile/9.jpg","roles":["COACH","PLAYER"]},
        //     "coach":{"id":13,"password":"$2a$10$3bZrqyz6cLAzS67UlRn/vedy/rLIA0YX2SDgQAoADEkP.qbaJ45bm","firstName":"Иван","lastName":"Горячих","email":"morgotianin@gmail.com","gender":"MALE","status":"ACTIVE","phone":"+380663137126","dateOfBirth":null,"telegram":null,"telegramChatId":null,"photo":"https://synergy-net.s3.eu-central-1.amazonaws.com/profile/8.jpg","roles":["COACH","PLAYER"]},
        //     "activeUsersCount":6,
        //     "bannedUsersCount":4,
        //     "startDate":"2021-01-28",
        //     "endDate":"2021-03-28"
        //   }
        gamesData: {}
    },
    
    getters: {
        "GET_GAMES_LIST"(state) {
            return state.gamesData;
        },

        // GET_INVITATION_PARAMETERS(state) {
        //   return state.invitationsParameters;
        // },

        "GET_GAME_BY_ID": state => id =>{
            const game = state.gamesData.games.find(item => item.id==id )
            return game;
        },

        // GET_INVITATION_PARAMETERS(state) {
        //   return state.invitationsParameters;
        // },
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
        }
        // SET_INVITATION_PARAMETERS(state, payload) {
        //   state.invitationsParameters = payload;
        // },

    },

    actions: {
        "GAMES_FROM_SERVER"({ commit }) {
        return axios
            .get(
                "http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games",
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