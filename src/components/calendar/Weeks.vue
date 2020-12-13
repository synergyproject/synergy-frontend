<template>
    <div class="weeks-wrapper">
        <div class="info-message">{{calendarInfoMessage}}</div>
        <div class="header goals-header">Календарь целей</div>
        <div class="goals-wrapper">
            <div class="goals">
                <div class="weeks">
                    <div class="week">1 неделя</div>
                    <div class="week">2 неделя</div>
                    <div class="week">3 неделя</div>
                    <div class="week">4 неделя</div>
                    <div class="week">5 неделя</div>
                    <div class="week">6 неделя</div>
                    <div class="week">7 неделя</div>
                    <div class="week">8 неделя</div>	
                </div>
                <div class="goals-container">
                    <div class="goal goal-1">
                        <div class="goal-content">цель 1</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(0)">
                    </div>
                </div>
                <div class="goals-container">
                    <div class="goal goal-2">
                        <div class="goal-content">цель 2</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(1)">
                    </div>
                    <div class="goal goal-3">
                        <div class="goal-content">цель 3</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(2)">
                    </div>
                </div>
                <div class="goals-container">
                    <div class="goal goal-4">
                        <div class="goal-content">цель 4</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(3)">
                    </div>
                    <div class="goal goal-5">
                        <div class="goal-content">цель 5</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(4)">
                    </div>
                    <div class="goal goal-6">
                        <div class="goal-content">цель 6</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(5)">
                    </div>
                    <div class="goal goal-7">
                        <div class="goal-content">цель 7</div>
                        <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(6)">
                    </div>
                </div>
                <div class="goals-container">
                    <div class="goal-7"><!-- заглушка -->
                        <div class="goal goal-8">
                            <div class="goal-content">цель 8</div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(7)">
                        </div>
                    </div>
                    <div class="goal-7"><!-- заглушка -->
                        <div class="goal goal-9">
                            <div class="goal-content">цель 9</div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(8)">
                        </div>
                    </div>
                    <div class="goal-7"><!-- заглушка для отрисовки -->
                        <div class="goal goal-10">
                            <div class="goal-content">цель 10</div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal(9)">
                        </div>
                    </div>
                    <div class="goal-7"><!-- заглушка для отрисовки--></div>							
                </div>
            </div>		
        </div>
        <modal v-show="this.modalVisible" @close='closeModal'>
            <template v-slot:modal-content>
                <edit-goal :goal='goalIndex'>  </edit-goal>
            </template>  
        </modal>
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
		data () {
			return {
				calendarInfoMessage: 'Ваши цели пока не указаны, заполните пожалуйста цели',
                dayIndex: 0,
                goalIndex: 0,
                modalVisible: false
			}
		},
		components: {
            Modal: Modal,
            EditGoal: EditGoal
		},
		mounted () {
			//при создании компонента получаем текущую дату и от бекенда дату начала игры и вычисляем
			//текущий день который будет равен нужному индексу массива todoList
			// let gameStartDate = '2020-12-01';
			// let	date = new Date();
			// let	currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();			
			// this.dayIndex = Math.ceil((Date.parse(currentDate) - Date.parse(gameStartDate)) / 86400000);

			// пока что this.dayIndex установим в 0 для теста
			this.dayIndex = 0;
		},	
		computed: {
            ...mapGetters(['GET_AVATAR'])            
		},			
	  	methods: {
            editGoal: function (index) {
                this.goalIndex = index;
                this.modalVisible = true
            },
            closeModal: function () {
				this.modalVisible = false	  	
			}
        }      			
	}
</script>