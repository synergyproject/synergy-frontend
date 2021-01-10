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
		mounted() {
			//при создании компонента получаем текущую дату и от бекенда дату начала игры (gameStartDate) и вычисляем текущий день игры
			// let gameStartDate = '2020-12-01';
			// let	date = new Date();
			// let	currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();			
			// this.dayIndex = Math.ceil((Date.parse(currentDate) - Date.parse(gameStartDate)) / 86400000);

			// пока что this.dayIndex установим в 0 для теста
			this.dayIndex = 0;
		}    			
	}
</script>