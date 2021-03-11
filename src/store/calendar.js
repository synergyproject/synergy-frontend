import axios from 'axios'
export default {
    state: {     	
	
		tasks: {}
		// {
		// 	"goals": [
		// 	  {
		// 		"description": "string",
		// 		"endDate": "string",
		// 		"goalStatus": "string",
		// 		"id": 0,
		// 		"number": 0,
		// 		"startDate": "string",
		// 		"title": "string"
		// 	  }
		// 	],
		// 	"reports": [
		// 	  {
		// 		"date": "string",
		// 		"id": 0,
		// 		"lifeCounter": 0,
		// 		"toDoTomorrow": [
		// 		  "string"
		// 		]
		// 	  }
		// 	]
		// }
	},
	
	getters: {
		GET_TASKS (state) {
			return state.tasks 
		}
	},

	mutations: {
		SET_TASKS (state, value) {
			state.tasks = value
		}
	},
		
	actions: {
		GET_TASKS_FROM_SERVER ({ commit }, payload) {
            return axios
                .get(
                    `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload}/tasks`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    commit("SET_TASKS", response.data);
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });       
        },

		UPDATE_GOAL ({ commit }, payload) {
            return axios
                .put(
                    `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.id}/goals`, payload.goal,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });       
        },
		
		CHANGE_GOAL_STATUS ({ commit }, payload) {
            switch (payload.status) {
				case 'ACTIVE':
					return axios
						.put(
							`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameId}/goals/${payload.goalNumber}/active`, '',
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem("token")}`
								}
							}
						)
						.then((response) => {
							return response.data;
						})
						.catch((error) => {
							return error;
						});  
			
				case 'DONE':
					return axios
						.put(
							`http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameId}/goals/${payload.goalNumber}/done`, '',
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem("token")}`
								}
							}
						)
						.then((response) => {
							return response.data;
						})
						.catch((error) => {
							return error;
						});
			}
		}
		
	}    
}