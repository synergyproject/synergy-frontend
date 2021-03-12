import axios from 'axios'

export default {
    state: {
        coaches: {}   
    },

    getters: {
        GET_COACHES (state) {
            return state.coaches
        }
    },

    mutations: {
        SET_COACH (state, payload) {
            state.state.coaches.push(payload);
        },

        SET_LIST_OF_COACHES (state, payload) {
            state.coaches = payload;
        },
    },

    actions: {
        COACHES_FROM_SERVER ({ commit }, payload) {
            //payload в виде обьекта {sort, order, page}
            return axios
                .get(
                    `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/coaches?sort=${payload.sort}&order=${payload.order}&page=${payload.page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                .then((response) => {
                    commit("SET_LIST_OF_COACHES", response.data);
                    return response;
                })
                .catch((error) => {
                    throw error;
                });
        },

        INVITE_COACH ({ commit }, payload) {          
			return axios
				.post("http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/coaches/invitations", payload, {
				    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then((response) => {
					return response
				})
				.catch((error) => {
					return error.response;
				})
        },
        
        ADD_NEW_COACH ({ commit }, payload) { 
            return axios
            .post(`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/users/${payload.id}/roles`, payload.role, {
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
    }
}

