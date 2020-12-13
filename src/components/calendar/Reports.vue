<template>
    <div class="reports-wrapper">
        <div class="header report-header">Заполните отчет</div>
        <div class="info-message">{{reportInfoMessage}}</div>
        <div class="report-wrapper">
            <div class="reports">

                <div class="reports-item-wrapper">
                    <div class="reports-item">
                        <div class="reports-item-header">
                            <div class="heading">
                                <div>TO DO лист на сегодня</div>
                                <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal1()">
                            </div>
                            <div class="heading-message">Отметь галочками выполненые пункты</div>
                        </div>
                        <div class="reports-content">
                            <div class="reports-content__item">
                                1. {{getTodo(dayIndex, 0)}} 
                            </div>
                            <div class="reports-content__item">
                                2. {{getTodo(dayIndex, 1)}}
                            </div>
                            <div class="reports-content__item">
                                3. {{getTodo(dayIndex, 2)}}
                            </div>
                            <div class="reports-content__item">
                                4. {{getTodo(dayIndex, 3)}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reports-item-wrapper">
                    <div class="reports-item">
                        <div class="reports-item-header">
                            <div class="heading">
                                <div>Отчет по целям</div>
                                <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal1()">
                            </div>
                            <div class="heading-message">Что ты сегодня сделал для достижения целей</div>
                        </div>
                        <div class="reports-content">
                            <div class="reports-content__item">
                                <div class="goal">{{GET_GOALS[0].goal}}</div>
                                <div class="report">{{GET_GOALS[0].report}}</div>
                            </div>
                            <div class="reports-content__item">
                                <div class="goal">{{getGoalReport(1, true)}}</div>
                                <div class="report">{{getGoalReport(1, false)}}</div>
                            </div>
                            <div class="reports-content__item">
                                <div class="goal">{{getGoalReport(2, true)}}</div>
                                <div class="report">{{getGoalReport(2, false)}}</div>
                            </div>
                            <div class="reports-content__item">
                                <div class="goal">{{getGoalReport(3, true)}}</div>
                                <div class="report">{{getGoalReport(3, false)}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reports-item-wrapper">
                    <div class="reports-item">
                        <div class="reports-item-header">
                            <div class="heading">
                                <div>TO DO лист на завтра</div>
                                <img src="@/assets/img/icon_pencil.png" class="pencil" @click="editGoal1()">
                            </div>
                            <div class="heading-message">Заполнить обязательно</div>
                        </div>
                        <div class="reports-content">
                            <div class="reports-content__item">
                                1. {{getTodo(dayIndex + 1, 0)}} 
                            </div>
                            <div class="reports-content__item">
                                2. {{getTodo(dayIndex + 1, 1)}}
                            </div>
                            <div class="reports-content__item">
                                3. {{getTodo(dayIndex + 1, 2)}}
                            </div>
                            <div class="reports-content__item">
                                4. {{getTodo(dayIndex + 1, 3)}}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="sendreport-button basic-buttons">
                Отправить отчет
                <img src="@/assets/img/ad_file.png" alt="" class="clip">
            </div>
        </div>
        <div></div>
    </div>  
</template>

<script>
	import axios from 'axios';
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import ad_file from '@/assets/img/ad_file.png';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
		name: 'Reports',
		data () {
			return {
				reportInfoMessage: 'у вас осталось 3 попытки',
				dayIndex: 0
			}
		},
		components: {
			
		},
		mounted () {
			//при создании компонента получаем текущую дату и от бекенда дату начала игры и вычисляем
			//текущий день который будет равен нужному индексу массива todoList
			// let gameStartDate = '2020-12-01';
			// let	date = new Date();
			// let	currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();			
			// this.dayIndex = Math.ceil((Date.parse(currentDate) - Date.parse(gameStartDate)) / 86400000);

			// пока что this.dayIndex установим в 0 для теста
			this.dayIndex = 0
		},	
		computed: {
            ...mapGetters(['GET_TODOLIST']),
            ...mapGetters(['GET_GOALS'])          
		},			
	  	methods: {
			getTodo: function(day, index) {
                //проверяем существует ли запись в массиве todo записи в текущем дне 
				if (this.GET_TODOLIST.length >= day + 1) {
                    if (this.GET_TODOLIST[day].length >= index + 1 ) {
                        return this.GET_TODOLIST[day][index]
                    }
				}				
            },
            getGoalReport: function(index, goal) {
                //в зависимости от текущего дня игры выводим соответствующую цель и отчет к ней
                //если параметр goal - true вернем цель, иначе отчет к этой цели
                if (index === 1) {
                    if (this.dayIndex <= 28) {
                        return goal ? this.GET_GOALS[1].goal : this.GET_GOALS[1].report
                    } else {
                        return goal ? this.GET_GOALS[2].goal : this.GET_GOALS[2].report
                    }
                } else if (index === 2) {
                    if (this.dayIndex <= 14) {
                        return goal ? this.GET_GOALS[3].goal : this.GET_GOALS[3].report
                    } else if (this.dayIndex > 14 && this.dayIndex <= 28) {
                        return goal ? this.GET_GOALS[4].goal : this.GET_GOALS[4].report
                    } else if (this.dayIndex > 28 && this.dayIndex <= 42) {
                        return goal ? this.GET_GOALS[5].goal : this.GET_GOALS[5].report
                    } else if (this.dayIndex > 42) {
                        return goal ? this.GET_GOALS[6].goal : this.GET_GOALS[6].report
                    } 
                } else if (index === 3) {
                     if (this.dayIndex <= 14) {
                        return goal ? this.GET_GOALS[7].goal : this.GET_GOALS[7].report
                    } else if (this.dayIndex > 14 && this.dayIndex <= 28) {
                        return goal ? this.GET_GOALS[8].goal : this.GET_GOALS[8].report
                    } else if (this.dayIndex > 28) {
                        return goal ? this.GET_GOALS[9].goal : this.GET_GOALS[9].report
                    }
                }
            }
        }      			
	}
</script>