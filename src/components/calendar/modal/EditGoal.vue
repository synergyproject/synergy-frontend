<template>
    <div class="edit-goal">
        <div class="header">
            Редактирование цели
        </div>
        <input 
            type="text" 
            class="goal-name" 
            placeholder="Введите название Цели..."
            v-model="name"
        >
        <textarea
            type="text" 
            class="goal-description"
            placeholder="Введите описание Цели..."
            v-model="description"
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
			goalIndex: Number
		},
		data () {
			return {
				name: '',
                description: ''
			}
		},
		components: {
			
		},
		mounted () {
            this.name = this.GET_GOALS[this.goalIndex].name;
            this.description = this.GET_GOALS[this.goalIndex].description;
            console.log(this.name, this.goalIndex)
		},	
		computed: {
            ...mapGetters(['GET_GOALS'])
		},			
	  	methods: {
            ...mapMutations(['SET_GOALS']),

            saveGoal: function() {
                if (this.name) {
                    this.SET_GOALS([
                        this.goalIndex,
                        {name: this.name}
                    ])
                } else {
                    let goalName = 'Цель ' + (this.goalIndex + 1)   
                    this.SET_GOALS([
                        this.goalIndex,
                        {name: goalName}
                    ])
                }
                this.SET_GOALS([
                    this.goalIndex, 
                    {description: this.description}
                ])
                this.$emit('closeEditGoal');
            }
        }      			
	}
</script>