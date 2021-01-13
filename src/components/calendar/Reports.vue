<template>
    <div class="reports-wrapper">
        <div class="header report-header">
            {{ $t('m_fill_report') }}
        </div>
        <div class="info-message">
            {{ $t(reportInfoMessage)[0] }}
        </div>

        <div class="report-wrapper">
            <!-- если цели не заполнены - блокируем раздел отчетов -->
            <div class="goals-filled-wrapper" v-if="checkGoalsFull()"></div> 

            <div class="reports">
                <div class="reports-item-wrapper">
                    <div class="reports-item">
                        <div class="reports-item-header">
                            <div class="heading">
                                <div>
                                    {{ $t('m_to_do_list_for_today') }}
                                </div>
                                <img 
                                    src="@/assets/img/icon_pencil.png" 
                                    class="pencil"
                                    @click="editReport(1)" 
                                >
                            </div>
                            <div class="heading-message">
                                {{ $t('m_check_the_completed_boxes') }}
                            </div>
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
                                <div>
                                    {{ $t('m_goal_report') }}
                                </div>
                                <img 
                                    src="@/assets/img/icon_pencil.png" 
                                    class="pencil" 
                                    @click="editReport(2)"
                                >
                            </div>
                            <div class="heading-message">
                                {{ $t('m_what_have_you_done_today') }}
                            </div>
                        </div>
                        <div class="reports-content">
                            <div class="reports-content__item">
                                <div class="goal">
                                    {{GET_GOALS[0].name}}
                                </div>
                                <div class="report">
                                    {{GET_GOALS[0].reports[0]}}
                                </div>
                            </div>
                            <div class="reports-content__item">
                                <div class="goal">
                                    {{getGoalReport(1, true)}}
                                </div>
                                <div class="report">
                                    {{getGoalReport(1, false)}}
                                </div>
                            </div>
                            <div class="reports-content__item">
                                <div class="goal">
                                    {{getGoalReport(2, true)}}
                                </div>
                                <div class="report">
                                    {{getGoalReport(2, false)}}
                                </div>
                            </div>
                            <div class="reports-content__item">
                                <div class="goal">
                                    {{getGoalReport(3, true)}}
                                </div>
                                <div class="report">
                                    {{getGoalReport(3, false)}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="reports-item-wrapper">
                    <div class="reports-item">
                        <div class="reports-item-header">
                            <div class="heading">
                                <div>
                                    {{ $t('m_to_do_list_for_tomorrow') }}
                                </div>
                                <img 
                                    src="@/assets/img/icon_pencil.png" 
                                    class="pencil" 
                                    @click="editReport(3)"
                                >
                            </div>
                            <div class="heading-message">
                                {{ $t('m_required_fields') }}
                            </div>
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
                {{ $t('m_send_report') }}
                <img 
                    src="@/assets/img/ad_file.png" 
                    alt="" 
                    class="clip"
                >
                <div 
                    class="counter" 
                    v-if="fileCounter > 0"
                >
                    {{fileCounter}}
                </div>
            </div>
        </div>
        <div></div>

        <!--в зависимости от reportIndex открываем соответствуещее одно из 3 окон
            редактирования тоду листов или целей-->
        <modal v-show="this.modalVisible" @close='closeModal'>
            <template v-slot:modal-content>
                <edit-report 
                    v-if="reportIndex > 0" 
                    @closeReport='closeModal'
                    :reportIndex='reportIndex'
                    :dayIndex='dayIndex'
                >
                </edit-report>
            </template>
        </modal> 
    </div>  
</template>

<script>
    import axios from 'axios';
    import Modal from '@/components/modal/Modal';
    import EditReport from '@/components/calendar/modal/EditReport';
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import ad_file from '@/assets/img/ad_file.png';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
        name: 'Reports',
        props: {
            dayIndex: Number
		},
		data () {
			return {
                reportInfoMessage: 'm_attempts_left',
                fileCounter: 2,
                reportIndex: 0,
                modalVisible: false
			}
		},
		components: {
            Modal: Modal,
            EditReport: EditReport
		},
		computed: {
            ...mapGetters(['GET_TODOLIST']),
            ...mapGetters(['GET_GOALS'])          
        },			
	  	methods: {
            closeModal: function () {
                this.modalVisible = false;
                this.reportIndex = 0;    		
            },

            checkGoalsFull: function () {
                //если не все цели заполнены - раздел отчеты не доступен (заблюрен ?)
                let goals = this.GET_GOALS,
                    goalsFilled = false;
                for (let i = 0; i < goals.length; i++) {
                    goalsFilled = goals[i].description ? false : true;
                }
                return goalsFilled;
            },

            editReport: function(report) {
                this.reportIndex = report;
                this.modalVisible = true;
            },

			getTodo: function(day, index) {
                //проверяем существует ли запись в массиве todo записи в текущем дне 
				if (this.GET_TODOLIST.length >= day + 1) {
                    if (this.GET_TODOLIST[day].length >= index + 1 ) {
                        return this.GET_TODOLIST[day][index].description
                    }
				}				
            },
            
            getGoalReport: function(index, goal) {
                // в зависимости от текущего дня игры выводим соответствующую цель и отчет к ней
                // просроченные цели не выводим!! 
                // если параметр goal - true вернем цель, иначе отчет к этой цели
                if (index === 1) {
                    if (this.dayIndex <= 28) {
                        return goal ? this.GET_GOALS[1].name : this.GET_GOALS[1].reports[0]
                    } else {
                        return goal ? this.GET_GOALS[2].name : this.GET_GOALS[2].reports[0]
                    }
                } else if (index === 2) {
                    if (this.dayIndex <= 14) {
                        return goal ? this.GET_GOALS[3].name : this.GET_GOALS[3].reports[0]
                    } else if (this.dayIndex > 14 && this.dayIndex <= 28) {
                        return goal ? this.GET_GOALS[4].name : this.GET_GOALS[4].reports[0]
                    } else if (this.dayIndex > 28 && this.dayIndex <= 42) {
                        return goal ? this.GET_GOALS[5].name : this.GET_GOALS[5].reports[0]
                    } else if (this.dayIndex > 42) {
                        return goal ? this.GET_GOALS[6].name : this.GET_GOALS[6].reports[0]
                    } 
                } else if (index === 3) {
                     if (this.dayIndex <= 14) {
                        return goal ? this.GET_GOALS[7].name : this.GET_GOALS[7].reports[0]
                    } else if (this.dayIndex > 14 && this.dayIndex <= 28) {
                        return goal ? this.GET_GOALS[8].name : this.GET_GOALS[8].reports[0]
                    } else if (this.dayIndex > 28) {
                        return goal ? this.GET_GOALS[9].name : this.GET_GOALS[9].reports[0]
                    }
                }
            }
        }      			
	}
</script>