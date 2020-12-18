<template>
	<div class="calendar-page">
		<side-bar></side-bar>
		<div class="calendar-wrapper">
			<weeks></weeks>
			<reports></reports>
			<goal-list></goal-list>
			<modal v-show="this.modalVisible" @close='closeModal'>
				ТЕСТ
			</modal>
		</div>   
	</div>    
</template>

<script>
	import axios from 'axios';
	import Modal from '@/components/modal/Modal';
	import SideBar from '@/components/layouts/SideBar';
	import Weeks from '@/components/calendar/Weeks';
	import Reports from '@/components/calendar/Reports';
	import GoalList from '@/components/calendar/GoalList';
	import icon_pencil from '@/assets/img/icon_pencil.png';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
		name: 'calendar',
		data () {
			return {
				modalVisible: false
			}
		},
		components: {
			Modal: Modal,
			SideBar: SideBar,
			Weeks: Weeks,
			Reports: Reports,
			GoalList: GoalList
		},
		mounted() {

		},	
		computed: {
			
		},			
	  	methods: {
			closeModal: function () {
				this.modalVisible = false;	  		
			}
        }      			
	}
</script>