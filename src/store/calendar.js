import axios from 'axios'
export default {
    state: {      
        todoList: [
			{
				reportSent: false,
				dayTascks: [
					{
						description: 'Поприветствовать коллег в общем чате',
						checked: false
					},
					{
						description: 'Заполнить календарь целей',
						checked: false
					},
					{
						description: 'Заполнить TO DO дист на завтра',
						checked: false
					},
					{
						description: 'какая то задача которую не видно',
						checked: false
					}
				]
			}	
		],
		
		files: [],
		
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
		GET_TODOLIST (state) {
			return state.todoList
		},

		GET_FILES (state) {
			return state.files
		},

		GET_TASKS (state) {
			return state.tasks
		}
	},

	mutations: {
		SET_FILES (state, value) {
			state.files.push(value)
		},

		SET_NEW_TODO_LIST (state, value) {
			state.todoList.push(value)
		},

		SET_TODOLIST_CHECK (state, value) {			
			state.todoList[value.dayIndex].dayTascks[value.taskIndex].checked = !state.todoList[value.dayIndex].dayTascks[value.taskIndex].checked
		},

		SET_TODOLIST_REPORTSENT (state, value) {
			//value в виде number (день игры)
			state.todoList[value].reportSent = true
		},

		SET_TODOLIST_DESCRIPTION (state, value) {
			//value в виде {dayIndex: number, tomorrowList: array}	     
			
			state.todoList[value.dayIndex] = {
				reportSent: false,
				dayTascks: []
			}

			for (let i = 0; i < value.tomorrowList.length; i++) {
				if (value.tomorrowList[i]) {		
					state.todoList[value.dayIndex].dayTascks.push({
						description: value.tomorrowList[i],
						checked: false
					})	
				} 			
			}
		},

		SET_GOALS_REPORTS (state, value) {
			//value в виде {dayIndex: number, reports: array}
			//индекс массива value.reports соответствует номеру цели и содержит отчет к ней
			//пустые элементы (нет отчета) тоже пушим чтоб отслеживать когда пропускали отчет
			//value.dayIndex - день игры
			for (let i = 0; i < value.reports.length; i++) {			
				state.goals[i].reports[value.dayIndex] = value.reports[i];
			}
		},

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
					console.log(error);
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
							console.log('актив респонс', response)
							return response.data;
						})
						.catch((error) => {
							console.log('актив error ', error);
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
							console.log('ДОНЕреспонс', response)
							return response.data;
						})
						.catch((error) => {
							console.log('ДОНЕ error ', error);
							return error;
						});
			}
		}	
	}    
}