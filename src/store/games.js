export default {
    state: {
      games: [
        {
          photo: "url", 
          name: "Название 1", 
          description: "описание", 
          mentor: "Витя Маликов", 
          coach: "Витя Маликов", 
          startDate: "01.01.2020", 
          endDate: "01.22.2020", 
          activePlayers: 6, 
          bannedPlayers: 0
        },
        {
          photo: "url", 
          name: "Название 2", 
          description: "описание", 
          mentor: "Витя Маликов", 
          coach: "Витя Маликов", 
          startDate: "01.01.2020", 
          endDate: "01.04.2020", 
          activePlayers: 6, 
          bannedPlayers: 0
        },
        {
          photo: "url", 
          name: "Название 3", 
          description: "описание", 
          mentor: "Витя Маликов", 
          coach: "Витя Маликов", 
          startDate: "11.13.1999", 
          endDate: "05.17.2044", 
          activePlayers: 6, 
          bannedPlayers: 0
        },
        {
          photo: "url", 
          name: "Название 4", 
          description: "описание",
          mentor: "Витя Маликов", 
          coach: "Витя Маликов", 
          startDate: "01.01.2020", 
          endDate: "01.04.2020", 
          activePlayers: 6, 
          bannedPlayers: 0
        },
        {
          photo: "url", 
          name: "Название 5", 
          description: "описание", 
          mentor: "Витя Маликов", 
          coach: "Витя Маликов", 
          startDate: "01.01.2020", 
          endDate: "01.04.2020", 
          activePlayers: 6, 
          bannedPlayers: 0
        },
        {
          photo: "url", 
          name: "Название 6", 
          description: "описание", 
          mentor: "Витя Маликов", 
          coach: "Витя Маликов", 
          startDate: "01.01.2020", 
          endDate: "01.04.2020", 
          activePlayers: 6, 
          bannedPlayers: 0
        }
      ]
    },
  
    getters: {
      // возвращаем массив игр
      GET_GAMES (state) {
        return state.games
      }
    },
  
    mutations: {

    },
  
    actions: {

    },
    
}