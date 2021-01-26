<template>
	<div class="calendar-page">
		<side-bar></side-bar>
		<div class="calendar-wrapper">
			<weeks :dayIndex='dayIndex'></weeks>
			<reports :dayIndex='dayIndex'></reports>
			<goal-list></goal-list>
		</div>   
	</div>    
</template>

<script>
	import SideBar from '@/components/layouts/SideBar';
	import Weeks from '@/components/calendar/Weeks';
	import Reports from '@/components/calendar/Reports';
	import GoalList from '@/components/calendar/GoalList';
	import { mapGetters, mapActions } from 'vuex';

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
            ...mapGetters(['GET_USER'])           
		},
		mounted() {
			//если новый пользователь захочет перейти на эту страницу (например через адресную строку), 
			//не заполнив профиль - возвращаем его обратно на main к заполнению
			this.USERS_FROM_SERVER()
                .then(resolve => {
                    if (!this.GET_USER.firstName || !this.GET_USER.lastName || !this.GET_USER.phone) {
                        this.$router.push({ path: '/main'})
                    } 
			})
			
			//при создании компонента получаем текущую дату и от бекенда дату начала игры (gameStartDate)
			//  и вычисляем текущий день игры
			// let	date = new Date();
			// let	currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();			
			// this.dayIndex = Math.ceil((Date.parse(currentDate) - Date.parse(gameStartDate)) / 86400000);
			// пока что this.dayIndex установим в 0 для теста
			this.dayIndex = 0;
		},
		methods: {
			...mapActions(['USERS_FROM_SERVER'])
		}	    			
	}
</script>