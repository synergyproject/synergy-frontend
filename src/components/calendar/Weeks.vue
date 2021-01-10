<template>
    <div class="weeks-wrapper">
        <div class="info-message">
            {{calendarInfoMessage}}
        </div>
        <div class="header goals-header">
            Календарь целей
        </div>
        <div class="goals-wrapper">
            <div class="goals">
                <div class="weeks">
                    <div class="week">
                        1 неделя
                    </div>
                    <div class="week">
                        2 неделя
                    </div>
                    <div class="week">
                        3 неделя
                    </div>
                    <div class="week">
                        4 неделя
                    </div>
                    <div class="week">
                        5 неделя
                    </div>
                    <div class="week">
                        6 неделя
                    </div>
                    <div class="week">
                        7 неделя
                    </div>
                    <div class="week">
                        8 неделя
                    </div>
                    <!-- слайдеp -->
                    <div 
                        class="slider"
                        :style="sliderPosition()"
                    ></div>
                </div>

                <div class="goals-container">
                    <!--блок цели. По клику на него открываем инфоокно про цель 
                        первый параметр номер линии (1 из 4х), второй номер самой цели. И так для каждого блока цели-->
                    <div class="goal goal-1"
                        @click="openGoalInfo(0, 0)"           
                    >
                        <div class="goal-content">
                            {{GET_GOALS[0].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(0)"
                        >
                    </div>
                    <!-- инфо блок с полной информацией о цели-->
                    <div 
                        class="goal-info" 
                        v-if="goalInfo[0]" 
                        @click="closeGoalInfo"
                    > 
                        <div class="goalName">
                            {{goalName}}
                        </div>
                        <div class="description">
                            Описание: <br>
                            {{description}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(currentGoal)"
                        >
                    </div>
                </div>

                <div class="goals-container">
                    <div 
                        class="goal goal-2"
                        @click="openGoalInfo(1, 1)"
                    >
                        <div class="goal-content">
                            {{GET_GOALS[1].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(1)"
                        >
                    </div>
                    <div 
                        class="goal goal-3"
                        @click="openGoalInfo(1, 2)"
                    >
                        <div class="goal-content">
                            {{GET_GOALS[2].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(2)"
                        >
                    </div>
                    <div 
                        class="goal-info" 
                        v-if="goalInfo[1]" 
                        @click="closeGoalInfo"
                    > 
                        <div class="goalName">
                            {{goalName}}
                        </div>
                        <div class="description">
                            Описание: <br>
                            {{description}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(currentGoal)"
                        >
                    </div>
                </div>

                <div class="goals-container">
                    <div 
                        class="goal goal-4"
                        @click="openGoalInfo(2, 3)"
                    >
                        <div class="goal-content">
                            {{GET_GOALS[3].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(3)"
                        >
                    </div>
                    <div 
                        class="goal goal-5"
                        @click="openGoalInfo(2, 4)"
                    >
                        <div class="goal-content">
                            {{GET_GOALS[4].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(4)"
                        >
                    </div>
                    <div 
                        class="goal goal-6"
                        @click="openGoalInfo(2, 5)"
                    >
                        <div class="goal-content">
                            {{GET_GOALS[5].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(5)"
                        >
                    </div>                   
                    <div 
                        class="goal goal-7"
                        @click="openGoalInfo(2, 6)"
                    >
                        <div class="goal-content">
                            {{GET_GOALS[6].name}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(6)"
                        >
                    </div>
                    <div 
                        class="goal-info" 
                        v-if="goalInfo[2]" 
                        @click="closeGoalInfo"
                    > 
                        <div class="goalName">
                            {{goalName}}
                        </div>
                        <div class="description">
                            Описание: <br>
                            {{description}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(currentGoal)"
                        >
                    </div>
                </div>



                
                <div class="goals-container">
                    <div class="goal-7"><!-- заглушка -->
                        <div 
                            class="goal goal-8"
                            @click="openGoalInfo(3, 7)"
                        >
                            <div class="goal-content">
                                {{GET_GOALS[7].name}}
                            </div>
                            <img 
                                src="@/assets/img/icon_pencil.png" 
                                class="pencil" 
                                @click="editGoal(7)"
                            >
                        </div>
                    </div>
                    <div class="goal-7"><!-- заглушка -->
                        <div 
                            class="goal goal-9"
                            @click="openGoalInfo(3, 8)"
                        >
                            <div class="goal-content">
                                {{GET_GOALS[8].name}}
                            </div>
                            <img 
                                src="@/assets/img/icon_pencil.png" 
                                class="pencil" 
                                @click="editGoal(8)"
                            >
                        </div>
                    </div>
                    <div class="goal-7"><!-- заглушка для отрисовки -->
                        <div 
                            class="goal goal-10"
                            @click="openGoalInfo(3, 9)"
                        >
                            <div class="goal-content">
                                {{GET_GOALS[9].name}}
                            </div>
                            <img 
                                src="@/assets/img/icon_pencil.png" 
                                class="pencil" 
                                @click="editGoal(9)"
                            >
                        </div>
                    </div>
                    <div class="goal-7"><!-- заглушка для отрисовки--></div>
                    <div 
                        class="goal-info" 
                        v-if="goalInfo[3]" 
                        @click="closeGoalInfo"
                    > 
                        <div class="goalName">
                            {{goalName}}
                        </div>
                        <div class="description">
                            Описание: <br>
                            {{description}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="editGoal(currentGoal)"
                        >
                    </div>
                </div>
            </div>		
        </div>

        <modal v-show="this.modalVisible" @close='closeModal' v-if="this.modalVisible">
            <template v-slot:modal-content>
                <edit-goal 
                    :goalIndex='goalIndex' 
                    @closeEditGoal='closeModal'
                ></edit-goal>
            </template>  
        </modal>

        <!-- оболочка на весь экран клик по которой закроет инфо по цели (и саму оболочку тоже) -->
        <div 
            class="goal-info-wrapper" 
            v-show="this.goalInfoWrapper"
            @click='closeGoalInfo'
        ></div>
    </div>  
</template>

<script>
	import axios from 'axios';
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import Modal from '@/components/modal/Modal';
    import EditGoal from '@/components/calendar/modal/EditGoal';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
        name: 'Weeks',
        props: {
			dayIndex: Number
		},
		data () {
			return {
				calendarInfoMessage: 'Ваши цели пока не указаны, заполните пожалуйста цели',
                goalIndex: 0,
                modalVisible: false,
                goalName: 'name',
                description: 'description',
                goalInfoWrapper: false,
                goalInfo: [
                    false,
                    false,
                    false,
                    false
                ],
                //в currentGoal хранится номер цели, для которой открыто расширенное инфокно.
                currentGoal: 0
			}
		},
		components: {
            Modal: Modal,
            EditGoal: EditGoal
		},
		computed: {
            ...mapGetters(['GET_AVATAR']),
            ...mapGetters(['GET_GOALS'])            
		},			
	  	methods: {
            //определяем позицию слайдера на компоненте weeks
            sliderPosition: function () {
                let position = this.dayIndex  * 18.7;
                return { left: position + 'px' }
            },
            //открываем модальное окно редактирования цели
            editGoal: function (index) {
                this.closeGoalInfo();
                this.goalIndex = index;
                this.modalVisible = true
            },
            closeModal: function () {
                this.closeGoalInfo();
				this.modalVisible = false	  	
            },
            //открываем инфоокно текущей цели (line - номер линии (1 из 4х) где должно появиться инфоокно, goal - номер цели)
            openGoalInfo: function (line, goal) {
                this.currentGoal = goal;
                this.goalInfoWrapper = true;
                this.goalInfo[line] = true;
                this.goalName = this.GET_GOALS[goal].name;
                this.description = this.GET_GOALS[goal].description;
            },
            closeGoalInfo: function () {
                this.goalInfoWrapper = false;
                for (let i = 0; i < this.goalInfo.length; i++) {
                    this.goalInfo[i] = false                  
                }
            }
        }    			
	}
</script>