import axios from 'axios'
export default {
    state: {      
        
// {
// 	push_id: 0,
// 	date: '10.12.2020 16.35.32',
// 	dayTascks: [
// 		{
// 			tack_id: `id_+ '' +${this.getDate()}`,
// 			description: this.desckInput,
// 			checked: false
// 		}
// 	]
// }

		todoList: [
			[
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
			],
			[
				{
					description: 'тут массив задач на следующий день и так до 56 днятут массив задач на следующий день и так до 56 днятут массив задач на следующий день и так до 56 днятут массив задач на следующий день и так до 56 днятут массив задач на следующий день и так до 56 днятут массив задач на следующий день и так до 56 днятут массив задач на следующий день и так до 56 дня',
					checked: false
				},
				{
					description: 'задача день 2',
					checked: false
				}
			]
		],
		//так как файлы не привязаны к цели или задаче то храним их просто в массиве,
		//где каждый эллемент массива files - массив файлов от текущего дня (индекса files)
		files: [

		],
		// status имеет 3 варианта: 0 - 'Активная', 1 - 'Просроченная', 2 - 'Выполненная'
		// reports - индекс массива равен дню в который был сделан отчет
		goals: [
			{
				name: 'Цель 1', 
				status: 0, 
				description: 'rr',
				reports: [
					'лол кек чебурек'
				]
			},
			{
				name: 'Цель 2', 
				status: 0, 
				description: 'Какаято цель номер ДВААААА',
				reports: [

				]
			},
			{
				name: 'Цель 3', 
				status: 0, 
				description: '',
				reports: [
					
				]
			}, 
			{
				name: 'Цель 4', 
				status: 0, 
				description: '',
				reports: [

				]
			}, 
			{
				name: 'Цель 5', 
				status: 0, 
				description: '',
				reports: [

				]
			}, 
			{
				name: 'Цель 6', 
				status: 0, 
				description: '',
				reports: [
					
				]
			}, 
			{
				name: 'Цель 7', 
				status: 0,  
				description: '',
				reports: [

				]
			}, 
			{
				name: 'Цель 8', 
				status: 0, 
				description: '',
				reports: [
					
				]
			}, 
			{
				name: 'Цель 9', 
				status: 0, 
				description: '',
				reports: [

				]
			}, 
			{
				name: 'Цель 10', 
				status: 0, 
				description: '',
				reports: [

				]
			}
		],
		//отображаем/скрываем меню выбора статуса цели
		statusMenu: [
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}, 
			{visible: false}
		]   
	},
	
	getters: {
		GET_TODOLIST (state) {
			return state.todoList
		},
		GET_GOALS (state) {
			return state.goals
		},
		GET_STATUS_MENU (state) {
			return state.statusMenu
		}
	},

	mutations: {
		SET_TODOLIST_CHECK (state, value) {			
			state.todoList[value.dayIndex][value.taskIndex].checked = !state.todoList[value.dayIndex][value.taskIndex].checked
		},
		SET_TODOLIST_DESCRIPTION (state, value) {
			//value в виде {dayIndex: number, tomorrowList: array}			
			for (let i = 0; i < value.tomorrowList.length; i++) {
				if (value.tomorrowList[i]) {
					state.todoList[value.dayIndex][i] = {
						description: value.tomorrowList[i],
						checked: false
					}
				} else {
					//если пользователь сохранил поле задачи пустым удаляем ее
					state.todoList[value.dayIndex].splice(i, 1)
				}
				
			}
		},
		SET_GOALS (state, value) {
			//меняем Имя Игры, описание или статус
			Object.assign(
				state.goals[value[0]], 
				value[1]
			)
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
		SET_STATUS_MENU (state, value) {
			//value приходит в виде {index: number, visible: boolean}
			state.statusMenu[value.index].visible = value.visible
		}
	},	
	actions: {
	
	}    
}