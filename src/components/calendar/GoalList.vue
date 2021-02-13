<template>
    <div class="goal-list">
        <div class="header">
            {{ $t('m_goals_progress') }}
        </div>
        <div class="list-wrapper">
            <div 
                class="list-container" 
                v-for="(item, index) in GET_GOALS" 
                :key="index"
            >    
                <div class="line"></div>
                <div class="goal-container">
                    <div class="goal-description-wrapper">
                        <div class="goal">
                            {{item.name}}
                        </div>
                        <div class="goal-description">
                            {{item.description}}
                        </div>
                    </div>
                    <div class="goal-status-wrapper">
                        <div
                            :style="{background: goalStatus[GET_GOALS[index].status].backgroundColor}" 
                            class="goal-status basic-buttons" 
                            @click="selectStatus(index)"
                        >
                            {{ $t(goalStatus[GET_GOALS[index].status].status) }}
                        </div>
                        <img 
                            src="@/assets/img/arrow_down.png" 
                            class="arrow basic-buttons" 
                            v-if="!GET_STATUS_MENU[index].visible"
                            @click="selectStatus(index)"
                        >
                        <img 
                            src="@/assets/img/arrow_up.png" 
                            class="arrow arrow-up basic-buttons" 
                            v-else
                            @click="selectStatus(index, 0)"
                        >
                        <div class="status-menu" v-show="GET_STATUS_MENU[index].visible">
                            <div 
                                :style="{background: goalStatus[0].backgroundColor}" 
                                class="goal-status basic-buttons" 
                                @click="selectStatus(index, 0)"
                            >
                                {{ $t('m_active') }}
                            </div>
                            <div
                                :style="{background: goalStatus[1].backgroundColor}" 
                                class="goal-status basic-buttons" 
                                @click="selectStatus(index, 1)"
                            >
                                {{ $t('m_expired') }}
                            </div>
                            <div 
                                :style="{background: goalStatus[2].backgroundColor}" 
                                class="goal-status basic-buttons" 
                                @click="selectStatus(index, 2)" 
                            >
                                {{ $t('m_completed') }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
            </div>
        </div>    
    </div>  
</template>

<script>
	import axios from 'axios';
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import arrow_down from '@/assets/img/arrow_down.png';
    import arrow_up from '@/assets/img/arrow_up.png';
	import { mapMutations, mapGetters } from 'vuex';

	export default {
		name: 'GoalList',

		data () {
			return {
                //запрашивая в хранилище GET_GOALS[index].status - получаем номер элемента массива goalStatus с нужным цветом и текстом кнопки для текущей цели                                                     
                goalStatus: [
                    {
                        backgroundColor: '#F0D267', 
                        status: 'm_active'
                    },
                    {
                        backgroundColor: '#FC916F', 
                        status: 'm_expired'
                    },
                    {
                        backgroundColor: '#8AD468', 
                        status: 'm_completed'
                    }
                ]
			}
		},
	
		computed: {
            ...mapGetters(['GET_TODOLIST']),
            ...mapGetters(['GET_GOALS']),
            ...mapGetters(['GET_STATUS_MENU'])           
		},
        			
	  	methods: {
            ...mapMutations(['SET_GOALS']),
            ...mapMutations(['SET_STATUS_MENU']),

			selectStatus: function(goalIndex, statusIndex) {
                //если какие либо меню еще были открыты кроме goalIndex- закроем их в этом цикле
                this.GET_STATUS_MENU.forEach((element, index) => { 
                    if (goalIndex !== index) 
                        this.SET_STATUS_MENU(
                            {
                                index: index, 
                                visible: false
                            }
                        )                          
                });
                //проверяем если мы передали statusIndex то мы не просто открыли меню, а уже выбрали новый статус - то меняем его
                if (statusIndex >= 0) {                  
                    this.SET_GOALS([
                        goalIndex,
                        {status: statusIndex}
                    ])
                }
                //в итоге меняем статус меню на противоположный                         
                this.SET_STATUS_MENU(
                    {
                        index: goalIndex, 
                        visible: !this.GET_STATUS_MENU[goalIndex].visible
                    }
                )  
            }
        }      			
	}
</script>
