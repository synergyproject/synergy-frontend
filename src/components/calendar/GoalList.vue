<template>
    <div class="goal-list">
        <div class="header">
            {{ $t('m_goals_progress') }}
        </div>
        <div class="list-wrapper">
            <div 
                class="list-container" 
                v-for="(item, index) in sortedTasks" 
                :key="index"
            >    
                <div class="line"></div>
                <div class="goal-container">
                    <div class="goal-description-wrapper">
                        <div class="goal">
                            {{item.title}}
                        </div>
                        <div class="goal-description">
                            {{item.description}}
                        </div>
                    </div>
                    <div class="goal-status-wrapper">
                        <div
                            :style="{background: checkStyle(item.goalStatus)}" 
                            class="goal-status basic-buttons" 
                            @click="openSelectStatus(index)"
                        >
                            {{ $t(checkStatus(item.goalStatus)) }}
                        </div>
                        <img 
                            src="@/assets/img/arrow_down.png" 
                            class="arrow basic-buttons" 
                            v-if="!statusMenu[index].visible"
                            @click="openSelectStatus(index)"
                        >
                        <img 
                            src="@/assets/img/arrow_up.png" 
                            class="arrow arrow-up basic-buttons" 
                            v-else
                            @click="openSelectStatus(index)"
                        >



                        <div class="status-menu" v-if="statusMenu[index].visible">
                            <div 
                                :style="{background: goalStatus[0].backgroundColor}" 
                                class="goal-status basic-buttons" 
                                @click="selectStatus(item.number, 'ACTIVE')"
                            >
                                {{ $t('m_active') }}
                            </div>
                            <div 
                                :style="{background: goalStatus[2].backgroundColor}" 
                                class="goal-status basic-buttons" 
                                @click="selectStatus(item.number, 'DONE')" 
                            >
                                {{ $t('m_completed') }}
                            </div>
                        </div>




                    </div>
                </div>
                <div class="line"></div>
            </div>
        </div>

        <!-- оболочка на весь экран клик по которой закроет инфо по цели (и саму оболочку тоже) -->
        <div 
            class="status-menu-wrapper" 
            v-if="this.goalStatusWrapper"
            @click='closeSelectStatus()'
        ></div>    
    </div>  
</template>

<script>
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import arrow_down from '@/assets/img/arrow_down.png';
    import arrow_up from '@/assets/img/arrow_up.png';
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'GoalList',

		data () {
			return {                                                    
                goalStatus: [
                    {
                        backgroundColor: '#F0D267', 
                        status: 'm_active'  //ACTIVE
                    },
                    {
                        backgroundColor: '#FC916F', 
                        status: 'm_expired'   //FAIL
                    },
                    {
                        backgroundColor: '#8AD468', 
                        status: 'm_completed'    //DONE
                    }
                ],
                statusMenu: [
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}, 
                    {visible: false}
                ],
                goalStatusWrapper: false
			}
		},
         
		computed: {
            ...mapGetters([ 
				'GET_TASKS',
                'GET_SELECTED_GAME'
			]),
            
            sortedTasks () {
                if (this.GET_TASKS.goals) {
                    return this.GET_TASKS.goals.sort((a, b) => a.number > b.number ? 1 : -1)
                }
            }
		},
        			
	  	methods: {
            ...mapActions([
                'CHANGE_GOAL_STATUS',
                'GET_TASKS_FROM_SERVER'
            ]),

            checkStyle (goalStatus) {
                switch (goalStatus) {
                    case 'ACTIVE':                       
                    return this.goalStatus[0].backgroundColor;

                    case 'FAIL':
                    return this.goalStatus[1].backgroundColor;

                    case 'DONE':    
                    return this.goalStatus[2].backgroundColor;
                }
            },

            checkStatus (goalStatus) {
                switch (goalStatus) {
                    case 'ACTIVE':                       
                    return this.goalStatus[0].status;

                    case 'FAIL':
                    return this.goalStatus[1].status;

                    case 'DONE':    
                    return this.goalStatus[2].status;
                }
            },

            openSelectStatus (index) {
                this.goalStatusWrapper = true;
                this.statusMenu[index].visible = true
            },

            selectStatus (number, status) {
                this.CHANGE_GOAL_STATUS({
                        status: status,
                        goalNumber: number,
                        gameId: this.GET_SELECTED_GAME.id
                    })
                    .then(resolve => {
                        console.log('selectStatus резолв ', resolve);
                        this.GET_TASKS_FROM_SERVER(this.GET_SELECTED_GAME.id)
                        .then(resolve => {
                            console.log('GET_TASKS ', resolve);
                        })
                    })
                this.closeSelectStatus()
            },
            
            closeSelectStatus () {
                this.goalStatusWrapper = false;
                for (let i = 0; i < 10; i++) {
                    this.statusMenu[i].visible = false
                }
            }
        }      			
	}
</script>
