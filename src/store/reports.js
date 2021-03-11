import axios from 'axios'
export default {
    state: {
		reportToday: [],     	
		reportTomorrow: [],
		files: [],
		goalDone: []
	},
	
	getters: {
		GET_FILES (state) {
			return state.files
		},

		GET_REPORT_TOMORROW (state) {
			return state.reportTomorrow
		},

		GET_REPORT_TODAY (state) {
			return state.reportToday
		},

		GET_GOAL_DONE (state) {
			return state.goalDone
		}
	},

	mutations: {
		SET_FILES (state, value) {
			state.files.push(value)
		},
		
		SET_REPORT_TOMORROW (state, value) {
			state.reportTomorrow = value
		},

		SET_REPORT_TODAY (state, value) {
			state.reportToday = value
		},

		SET_GOAL_DONE (state, value) {
			state.goalDone = value
		}
	},
		
	actions: {
		SEND_REPORT ({ commit }, payload) {
            return axios
                .put(
                    `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/games/${payload.gameId}/reports`, payload.report,
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
        }		
		
	}    
}