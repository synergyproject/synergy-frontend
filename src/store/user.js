import axios from 'axios'
export default {
    state: {
        users: {},
        //В таком виде приходит обьект users
        // {
        //     "dateOfBirth": "string",
        //     "email": "string",
        //     "firstName": "string",
        //     "gender": "string",
        //     "id": 0,
        //     "lastName": "string",
        //     "phone": "string",
        //     "photo": "string",
        //     "roles": [
        //       "string"
        //     ],
        //     "status": "string",
        //     "telegram": "string",
        //     "telegramChatId": 0
        // }
        currentLanguage: 'Eng'
    },
    getters: {
        GET_USER (state) {
            return state.users
        },
        GET_CURRENT_LANGUAGE (state) {
            return state.currentLanguage
        }
    },
  
    mutations: {
        SET_AVATAR (state, value) {
            state.user.avatar = value
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
        },
        "SET_LIST_OF_USERS"(state, payload) {
            state.users = payload;
        },

    },
  
    actions: {
        'USERS_FROM_SERVER'({ commit }) {
            return axios
                .get(
                    "http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/users",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                )
                .then((response) => {
                    commit("SET_LIST_OF_USERS", response.data);
                    return response;
                })
                .catch((error) => {
                    throw error;
                });
        },
        
        'SEND_USER'({ commit }, payload) {           
			return axios
				.put("http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/users", payload, {
				    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => {
                    commit("SET_LIST_OF_USERS", response.data)
					return response
				})
				.catch(error => {
					throw error;
				});
        },
        
        'SEND_AVATAR'({ commit }, payload) {
            let formData = new FormData();
            formData.append('file', payload);

			return axios
				.post("http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/users/photo", formData, {
				    headers: {
                        'content-type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then(response => {
                    
                    commit("SET_LIST_OF_USERS", response.data)
					return response
				})
				.catch(error => {
					throw error;
				});
		}


    }   
}