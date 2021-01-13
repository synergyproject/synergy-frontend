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
            @click="saveGoal"
        >
            {{ $t('m_save') }}
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
                description: '',
                placeholderName: 'm_enter_the_name_of_the_goal',
                placeholderDescription: 'm_enter_a_description_of_the_goal'
			}
		},
		components: {
			
		},
		mounted () {
            this.name = this.GET_GOALS[this.goalIndex].name;
            this.description = this.GET_GOALS[this.goalIndex].description;
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