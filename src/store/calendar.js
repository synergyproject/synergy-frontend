import axios from 'axios'
export default {
    state: {      
        // каждый элемент массива todoList - массив задач на день
        // 
		todoList: [
			['Заполнить профиль',
			'Поприветствовать коллег в общем чате',
			'Заполнить календарь целей',
			'Заполнить TO DO дист на завтра',
			'какая то задача которую не видно'
			],
			['тут массив задач на следующий день и так до 56 дня']
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
					'нихрена не делал',
					''
				]
			},
			{
				name: 'Цель 2', 
				status: 1, 
				description: 'Какаято цель номер ДВААААААААААААААААААА',
				reports: [
					'эшельбе бехельме'
				]
			},
			{
				name: 'Цель 3', 
				status: 0, 
				description: '',
				reports: [
					'отчет к 3 цели '
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
					'pryvet'
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
		SET_TODOLIST (state, value) {
			
		},
		SET_GOALS (state, value) {
			Object.assign(
				state.goals[value[0]], 
				value[1]
			)
		},
		//value для SET_STATUS_MENU приходит в виде {index: number, visible: boolean}
		SET_STATUS_MENU (state, value) {
			state.statusMenu[value.index].visible = value.visible
		}
	},	
	actions: {
	
	}    
}