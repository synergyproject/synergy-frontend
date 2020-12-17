<template>
    <div class="edit-goal">
        <div class="header">
            Редактирование цели
        </div>
        <input 
            type="text" 
            class="goal-name" 
            placeholder="Введите название Цели..."
        >
        <textarea
            type="text" 
            class="goal-description"
            placeholder="Введите описание Цели..."
        ></textarea>
        <div 
            class="save-button basic-buttons" 
            @click="saveGoal"
        >
            Сохранить
        </div>
    </div>  
</template>

<script>
	import axios from 'axios';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
        name: 'EditGoal',
        props: {
			goal: Number
		},
		data () {
			return {
				
			}
		},
		components: {
			
		},
		mounted () {

		},	
		computed: {
                     
		},			
	  	methods: {
            saveGoal: function() {
                console.log(this.goal)
            }
        }      			
	}
</script>