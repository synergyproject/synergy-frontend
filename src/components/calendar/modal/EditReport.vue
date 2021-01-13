<template>
    <div class="edit-report">
        <div class="edit-report__left">
            <div class="edit-report__left-head">
                {{ $t(headlines[reportIndex-1]) }}:
            </div>
            <div class="edit-report__left-general">
                {{ $t(generalInfo[reportIndex-1]) }}
            </div>
            <div 
                class="edit-report__left-button basic-buttons"
                @click="save()"
            >
                {{ $t('m_save') }}
            </div>
        </div>

        <div class="edit-report__right">
            <!-- TO DO лист на сегодня -->
            <div 
                class="edit-report__right-wrapper"
                v-if="reportIndex === 1"
            >
                <div 
                    class="today-list__container"
                    v-for="(item, index) in GET_TODOLIST[dayIndex]"
                    :key="index"
                >
                    <div class="task-description">
                        <div class="content">
                            {{index+1}}. {{item.description}}
                        </div>
                    </div>
                    <div class="checkbox checked" 
                        v-if="item.checked" 
                        @click="checkTask(index)"
                    >
                        <img src="@/assets/img/checked.png">
                    </div>
                    <div 
                        class="checkbox" 
                        v-else 
                        @click="checkTask(index)"
                    >
                    </div>
                    <div 
                        class="line"
                        v-if="index < GET_TODOLIST[dayIndex].length-1"  
                    ></div> 
                </div> 
            </div>

            <!-- Отчет по целям -->
            <div 
                class="edit-report__right-wrapper"
                v-else-if="reportIndex === 2"
            >
                <div 
                    class="goal__container"
                    v-for="(item, index) in GET_GOALS"
                    :key="index"
                >
                    <!-- выводим только активные цели(status цели = 0) ???-->
                    <div 
                        v-if="item.status === 0"
                        class="goal__container-wrapper"
                    >
                        <div class="goal-name">
                            {{index+1}}. {{item.name}}
                        </div>
                        <input 
                            type="text"
                            placeholder="Введите текст..."
                            maxlength="1000"
                            v-model="reports[index]"
                        >
                    </div>
                </div>
            </div>

            <!-- TO DO лист на завтра: -->
            <div 
                class="edit-report__right-wrapper"
                v-else
            >
                <div 
                    class="tomorrow-list__container"
                    v-for="(item, index) in GET_TODOLIST[dayIndex+1]"
                    :key="index"
                >
                    <div class="taskIndex">
                        {{index+1 + '. '}}
                    </div>
                    <input 
                        type="text"
                        maxlength="1000"
                        v-model="tomorrowList[index]"
                    >
                </div>
                <div class="tomorrow-list__container">
                    <input 
                        type="text"
                        maxlength="1000"
                        placeholder="Добавить задачу +"
                        v-model="newTask"
                    >
                </div>
            </div>

        </div>
    </div>  
</template>

<script>
    import axios from 'axios';
    import checked from '@/assets/img/checked.png';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
        name: 'EditReport',
        props: {
            reportIndex: Number,
            dayIndex: Number
		},
		data () {
			return {
				headlines: [
                    'm_to_do_list_for_today',
                    'm_send_report',
                    'm_to_do_list_for_tomorrow'
                ],
                generalInfo: [
                    'm_edit_report_generalInfo_1',
                    'm_edit_report_generalInfo_2',
                    'm_edit_report_generalInfo_3'
                ],
                //в reports записываем отчеты к цели в текущем дне
                //индекс массива reports соответствует номеру текущей цели
                reports: [],
                //список задач на завтра
                tomorrowList: [],
                newTask: ''
			}
		},
		components: {
			
        },   
		computed: {
            ...mapGetters(['GET_TODOLIST']),
            ...mapGetters(['GET_GOALS']) 
        },
        created() {
            let goals = this.GET_GOALS,
                list = this.GET_TODOLIST;
            for (let i = 0; i < goals.length; i++) {
                this.reports[i] = goals[i].reports[this.dayIndex]
            }
            for (let i = 0; i < list[this.dayIndex+1].length; i++) {
                this.tomorrowList[i] = list[this.dayIndex+1][i].description
            }
        },			
	  	methods: {
            ...mapMutations(['SET_TODOLIST_CHECK']),
            ...mapMutations(['SET_TODOLIST_DESCRIPTION']),
            ...mapMutations(['SET_GOALS_REPORTS']),

            closeReport: function() {
                this.$emit('closeReport');                
            },
            checkTask: function(index) {
                this.SET_TODOLIST_CHECK (
                    {
                        dayIndex: this.dayIndex,
                        taskIndex: index
                    }
                )
            },
            save: function() {
                switch (this.reportIndex) {
                    case 1:
                        // записываем состояние сразу в store при клике на чекбокс
                        // не верно? записывать только по кнопке save?
                        break;
                    case 2:                        
                        this.SET_GOALS_REPORTS(
                            {
                                dayIndex: this.dayIndex, 
                                reports: this.reports
                            }
                        )
                        break;
                    case 3:
                        if (this.newTask) {
                            this.tomorrowList.push(this.newTask)
                        }
                        this.SET_TODOLIST_DESCRIPTION (
                            {
                                dayIndex: this.dayIndex+1,
                                tomorrowList: this.tomorrowList
                            }
                        )
                        break;
                }
                this.closeReport();                
            }
        }      			
	}
</script>