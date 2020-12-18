import axios from 'axios'
export default {
    state: {      
      // каждый элемент массива todoList - массив задач на день 
      //пока все массивы с заглушкой - данные прийдут от бекенда 
      todoList: [
          ['Заполнить профиль',
           'Поприветствовать коллег в общем чате',
           'Заполнить календарь целей',
           'Заполнить TO DO дист на завтра',
           'какая то задача которую не видно'
          ],
          ['тут массив задач на следующий день и так до 56 дня']
        ],

      //status имеет 3 варианта: 0 - 'Активная', 1 - 'Просроченная', 2 - 'Выполненная'
      goals: [
        {
          name: 'Цель 1', 
          status: 0, 
          description: ''
        },
        {
          name: 'Цель 2', 
          status: 0, 
          description: ''
        },
        {
          name: 'Цель 3', 
          status: 0, 
          description: ''
        }, 
        {
          name: 'Цель 4', 
          status: 0, 
          description: ''
        }, 
        {
          name: 'Цель 5', 
          status: 0, 
          description: ''
        }, 
        {
          name: 'Цель 6', 
          status: 0, 
          description: ''
        }, 
        {
          name: 'Цель 7', 
          status: 0,  
          description: ''
        }, 
        {
          name: 'Цель 8', 
          status: 0, 
          description: ''
        }, 
        {
          name: 'Цель 9', 
          status: 0, 
          description: ''
        }, 
        {
          name: 'Цель 10', 
          status: 0, 
          description: ''
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
 1     }
    },
  
    actions: {
     
    }    
}