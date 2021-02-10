import axios from 'axios'
export default {
    state: {
      userIn: {
        userId: '47',
        firstName: 'Валентин', 
        surname: 'Добровольский', 
        email:'Prokofey_Kuznetsov@gmail.com', 
        usernameTelegram: '', 
        phone: '', 
        birthday: '', 
        avatar: null,  
        role:'user'
      },
      game: {
        gameId: '123', 
        title: 'Великолепная Игра', 
        date: '15.07.2020',
        rating: [
          {
            userId: '11',
            firstName: 'Георгий',
            surname: 'Васергольштейн',
            avatar: null,  
            rating:'1'
          },          {
            userId: '33',
            firstName: 'Роман',
            surname: 'Васергольштейн',
            avatar: null,  
            rating:'2'
          },
          {
            userId: '4',
            firstName: 'Роман',
            surname: 'Каземиров',
            avatar: null,  
            rating:'3'
          },
          {
            userId: '99',
            firstName: 'Данил',
            surname: 'Ким',
            avatar: null,  
            rating:'4'
          },
          {
            userId: '7',
            firstName: 'Дмитрий',
            surname: 'Васергольштейн',
            avatar: null,  
            rating:'5'
          },
          {
            userId: '8',
            firstName: 'Георгий',
            surname: 'Васичкин',
            avatar: null,  
            rating:'6'
          },

        ]
      },

      posts:[
        {
          postId:'1',
          autor: {firstName: 'Иван', surname: 'Иванов', avatar: null, userId: '17'},
          date: '01.09.2020',
          selfPost: true,
          postСhanges: false,
          likes: '12',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et /  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et / Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et /Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit am e enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eadskvjbv',
          comments: [
            {
                id:'1/1',
                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
            },

          ],
          goals: [

          ],
          todos: [

          ],
          files:[
            '@/assets/img/test.png',
            '@/assets/img/test.png',
            '@/assets/img/test.pdf',
            '@/assets/img/test.docx',
            '@/assets/img/test.png',

          ]



        },
        {
          postId:'2',
          autor: {firstName: 'Валерия', surname: 'Клименко', avatar: null, userId: '24'},
          date: '03.09.2020',
          selfPost: false,
          postСhanges: false,
          likes: '0',
          text: '',
          comments: [
            {
                id:'1/1',
                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
            },
            {
                id:'1/2',
                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
            }
          ],
          goals: [
            {
              name: 'Назвние сколько поместится',
              report:'Lorem ipsum dolor sit amet,  ipsum dolor sit amet...'
            },
            {
              name: 'Назвние сколько поместится',
              report:'Lorem ipsum dolor sit amet,  ipsum dolor sit amet...'
            },
            {
              name: 'Назвние сколько поместится',
              report:'Lorem ipsum dolor sit amet,  ipsum dolor sit amet...'
            },
            {
              name: 'Назвние сколько поместится',
              report:'Lorem ipsum dolor sit amet,  ipsum dolor sit amet...'
            },
            {
              name: 'Назвние сколько поместится',
              report:'Lorem ipsum dolor sit amet,  ipsum dolor sit amet...'
            },
            {
              name: 'Назвние сколько поместится',
              report:'Lorem ipsum dolor sit amet,  ipsum dolor sit amet...'
            }
          ],
          todos: [
            'Lorem ipsum dolor sit amet,  ipsum dolor sit amet,met,  ipsum dolor sit amet',
            'Lorem ipsum dolor sit amet,  ipsum dolor sit amet,met,  ipsum dolor sit amet',
            'Lorem ipsum dolor sit amet,  ipsum dolor sit amet,met,  ipsum dolor sit amet',
            'Lorem ipsum dolor sit amet,  ipsum dolor sit amet,met,  ipsum dolor sit amet',
            'Lorem ipsum dolor sit amet,  ipsum dolor sit amet,met,  ipsum dolor sit amet',
            'Lorem ipsum dolor sit amet,  ipsum dolor sit amet,met,  ipsum dolor sit amet'
          ],
          files:[
            '@/assets/img/test.png',
            '@/assets/img/test.pdf',
            '@/assets/img/test.docx',
            '@/assets/img/test.docx',
          ]



        },
        {
          postId:'3',
          autor: {
            firstName: 'Валентин', 
            surname: 'Добровольский', 
            avatar: null, 
            userId: '47'
          },
          date: '15.09.2020',
          selfPost: true,
          postСhanges: true,
          likes: '9',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          comments: [
            {
                id:'1/1',
                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
            },
            {
                id:'1/2',
                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
            },
            {
              id:'1/3',
              text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
          }
          ],
          goals: [
          ],
          todos: [
          ],
          files:[
          ]
        }
      ],

    },
    getters: {
      // //возвращаем url аватарки
      // GET_AVATAR (state) {
      //   if (state.user.avatar) {
      //     return URL.createObjectURL(state.user.avatar)
      //   } else {
      //     return null
      //   }
      // },
      //возварщаем обьект администратор
      GET_USERIN (state) {
        return state.userIn
      },
      // возвращаем массив игр
      GET_POSTS (state) {
        return state.posts
      },
      // возвращаем данные по выбранной игре
      GET_GAME (state) {
        return state.game
      },

    },




  

  

    
}