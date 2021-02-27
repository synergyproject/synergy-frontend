<template>
	<div class="calendar-page">
		<side-bar></side-bar>
		<div class="calendar-wrapper">
			<weeks :dayIndex='dayIndex'></weeks>
			<reports :dayIndex='dayIndex'></reports>
			<goal-list :dayIndex='dayIndex'></goal-list>
		</div>   
	</div>    
</template>

<script>
	import SideBar from '@/components/layouts/SideBar';
	import Weeks from '@/components/calendar/Weeks';
	import Reports from '@/components/calendar/Reports';
	import GoalList from '@/components/calendar/GoalList';
	import { mapGetters, mapActions, mapMutations } from 'vuex';

	export default {
		name: 'calendar',

		data () {
			return {
				dayIndex: 0
			}
		},

		components: {
			SideBar: SideBar,
			Weeks: Weeks,
			Reports: Reports,
			GoalList: GoalList
		},

		computed: {
            ...mapGetters([ 
				'GET_USER', 
				'GET_SELECTED_GAME',
				'GET_CURRENT_GAME'
			])           
		},

		beforeDestroy() {
            this.SET_TASKS('');
        },

		mounted() {
			
			//если новый пользователь захочет перейти на эту страницу (например через адресную строку), 
			//не заполнив профиль - возвращаем его обратно на main к заполнению
			this.USERS_FROM_SERVER()
                .then(resolve => {
					console.log('user ', resolve);
                    if (!this.GET_USER.firstName || !this.GET_USER.lastName || !this.GET_USER.phone) {
                        this.$router.push({ path: '/main' })
                    }
					
					this.GET_GAME_BY_ID_FROM_SERVER(this.GET_SELECTED_GAME.id)
					.then(resolve => {

						//проверка является ли пользовтель игроком, если нет не позволяем ему зайти в календарь
						let checkPlayerId = false;
						for (let i = 0; i < this.GET_CURRENT_GAME.activeUsers.length; i++) {
							console.log(this.GET_CURRENT_GAME.activeUsers[i].id);
							if (this.GET_USER.id === this.GET_CURRENT_GAME.activeUsers[i].id) {
								checkPlayerId = true
							}
						}
						if (!checkPlayerId) {
							this.$router.push({ path: '/main' })
						}

						let startDateNumber = Math.ceil((Date.parse(this.GET_CURRENT_GAME.startDate)) / 86400000);
						let	date = new Date();
						let	currentDate = Math.ceil((Date.parse(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())) / 86400000);
						if (currentDate > startDateNumber) {
							this.dayIndex = currentDate - startDateNumber
						}
					})
			})

            this.GET_TASKS_FROM_SERVER(this.GET_SELECTED_GAME.id)
            .then(resolve => {
                if (!resolve.goals[0].title) {
                    for (let i = 1; i <= 10; i++) {
                        let goalName = 'Цель ' + i;
                        this.UPDATE_GOAL({
                            goal: {
                                number: i,
                                title: goalName                               
                            },
                            id: this.GET_SELECTED_GAME.id
                        })
                        .then(resolve => {
                            this.GET_TASKS_FROM_SERVER(this.GET_SELECTED_GAME.id)
                        })     
                    }
                }               
            })		
		},
		
		methods: {
			...mapActions([ 
				'USERS_FROM_SERVER',
				'SET_CURRENT_GAME_ID',
				'GET_GAME_BY_ID_FROM_SERVER',
				'GET_TASKS_FROM_SERVER',
				'UPDATE_GOAL'
			]),
			
			...mapMutations([ 
                'SET_TASKS'
            ]),
		}	    			
	}
</script>