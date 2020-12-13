<template>
	<div class="side-bar-wrapper">
		<div class="side-bar">
			<div class="side-bar-button basic-buttons">WTF?</div>
			<div class="avatar-mini"></div>
			<div class="cabinet basic-buttons menu-item" @click="openCabinet">
				<div>Кабинет</div>
				<div>игрока</div>
			</div>
			<div class="basic-buttons menu-item">Лента</div>
			<div class="basic-buttons menu-item">Мои Цели</div>
		</div>
	</div>     
</template>

<script>
import axios from 'axios';

	export default {
		name: 'SideBar',
		data () {
			return {
                
			}
		},
		components: {
			
	    },			
	  	methods: {
			openCabinet() {
				this.$router.push({ path: '/main'})
			}
        }      
			
	}
</script>