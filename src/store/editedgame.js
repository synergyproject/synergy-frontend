import axios from 'axios'

export default {
    state: {
        currentGame: {},
        currentGameId: 0
    },
    
    getters: {
        GET_CURRENT_GAME_ID (state) {
            return state.currentGameId;
        },

        GET_CURRENT_GAME (state) {
            return state.currentGame;
        }
    },

    mutations: {
        SET_CURRENT_GAME_ID (state, payload) {
            state.currentGameId = payload;
        },

        SET_CURRENT_GAME (state, payload) {
            state.currentGame = payload;
        },

        SET_CURRENT_GAME_URL (state, payload) {
            state.currentGame.logoUrl = payload;
        }
    },

    actions: {
        GET_GAME_BY_ID_FROM_SERVER ({ commit }, payload) {
            return axios
            .get(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    commit("SET_CURRENT_GAME", response.data);
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });       
        },
        
        CREATE_NEW_GAME ({ commit }, payload) {
            return axios
            .post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/`, payload, 
                {
				    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
					return response
				})
				.catch((error) => {
					throw error;
				})
        },

        SEND_EDITED_GAME ({ commit }, payload) {
            return axios
            .put(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameId}`, payload.data, 
                {
				    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
					return response
				})
				.catch((error) => {
					throw error;
				})
        },

        SEND_GAME_LOGO ({ commit }, payload) {
            let formData = new FormData();
            formData.append('file', payload.file);

			return axios
			.post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.id}/logo`, formData, 
                {
				    headers: {
                        'content-type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => {
                    commit("SET_CURRENT_GAME_URL", response.data);
					return response.data;
				})
				.catch(error => {
					throw error;
				});
		},

        INVITE_NEW_PLAYER ({ commit }, payload) { 
            return axios
            .post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.id}/invitations`, payload.email, {
				    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
					return response
				})
				.catch((error) => {
					throw error;
				})
        },

        DELETE_PLAYER ({ commit }, payload) { 
            return axios
            .delete(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameId}/users/${payload.userId}`, 
                {
				    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
                    // commit("SET_CURRENT_GAME", response.data);
					return response
				})
				.catch((error) => {
					throw error;
				})
        },

        CANSEL_INVITATION ({ commit }, payload) { 
            return axios
            .put(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameId}/invitations/cancel`, payload.email, {
				    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
                    // commit("SET_CURRENT_GAME", response.data);
					return response
				})
				.catch((error) => {
					throw error;
				})
        }    
    }    
}