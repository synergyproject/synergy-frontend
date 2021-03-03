<template>
    <div class="edit-goal">
        <div class="header">
            {{ $t('m_edit_goal') }}
        </div>
        <input 
            type="text" 
            class="goal-name" 
            :placeholder="$t(placeholderName)"
            maxlength="20"
            v-model="name"
        >
        <textarea
            type="text" 
            class="goal-description"
            :placeholder="$t(placeholderDescription)"
            maxlength="1000"
            v-model="description"
        ></textarea>
        <div 
            class="save-button basic-buttons"
            v-if="name" 
            @click="saveGoal"
        >
            {{ $t('m_save') }}
        </div>
    </div>  
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
        name: 'EditGoal',

        props: {
			goalIndex: Number
		},

		data () {
			return {
				name: '',
                description: '',
                placeholderName: 'm_enter_the_name_of_the_goal',
                placeholderDescription: 'm_enter_a_description_of_the_goal'
			}
		},

		components: {
			
		},

		mounted () {
            this.name = this.GET_TASKS.goals.filter(val => {
                return val.number === (this.goalIndex + 1);
            })[0].title;
            this.description = this.GET_TASKS.goals.filter(val => {
                return val.number === (this.goalIndex + 1);
            })[0].description;
		},

		computed: {
            ...mapGetters([
                'GET_TASKS',
                'GET_SELECTED_GAME'
            ])
		},
        			
	  	methods: {
              ...mapActions([ 
				'GET_TASKS_FROM_SERVER',
				'UPDATE_GOAL'
			]),

            saveGoal: function() {
                this.UPDATE_GOAL({
                    goal: {
                        number: this.goalIndex+1,
                        title: this.name,
                        description: this.description                               
                    },
                    id: this.GET_SELECTED_GAME.id
                })
                .then(resolve => {               
                    this.GET_TASKS_FROM_SERVER(this.GET_SELECTED_GAME.id) 
                })
                this.$emit('closeEditGoal');
            }
        }      			
	}
</script>