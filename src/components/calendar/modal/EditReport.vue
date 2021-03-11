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
                    v-for="(item, index) in getReports()"
                    :key="index"
                >
                    <div class="task-description">
                        <div class="content">
                            {{index+1}}. {{item}}
                        </div>
                    </div>
                    <div class="checkbox checked" 
                        v-if="todayList[index].done" 
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
                        v-if="index < getReports().length-1"  
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
                    v-for="(item, index) in GET_GOAL_DONE"
                    :key="index"
                >
                    <div 
                        class="goal__container-wrapper"
                    >
                        <div class="goal-name">
                            {{index+1}}. {{GET_TASKS.goals[index].title}}
                        </div>
                        <input 
                            type="text"
                            :placeholder="$t(placeholderInfo[0])"
                            maxlength="1000"
                            v-model="goalText[index]"
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
                    v-for="(item, index) in GET_REPORT_TOMORROW"
                    :key="index"
                >
                    <img 
                        class="cross"
                        src="@/assets/img/off_close.png"
                        @click="deleteTomorrowTask(index)"
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
                <!-- блок для добавления новой задачи -->
                <div class="tomorrow-list__container">
                    <input 
                        type="text"
                        maxlength="1000"
                        :placeholder="$t(placeholderInfo[1])"
                        v-model="newTask"
                    >
                </div>
                <div 
                    class="add-task basic-buttons"
                    @click="addTask()"
                >
                    {{ $t('m_add_task') }}
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
    import checked from '@/assets/img/checked.png';
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	export default {
        name: 'EditReport',

        props: {
            reportIndex: Number
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
                placeholderInfo: [
                    'm_enter_text',
                    'm_new_task'
                ],
                todayList: [],
                tomorrowList: [],
                goalText:[],
                newTask: ''
			}
        },

		computed: {
            ...mapGetters([ 
                'GET_TASKS',
                'GET_REPORT_TOMORROW',
                'GET_REPORT_TODAY',
                'GET_GOAL_DONE'
            ])
        },

        created() {
            //TO DO лист на сегодня
            if (!this.GET_REPORT_TODAY.length) {
                for (let i = 0; i < this.GET_TASKS.report.toDoTomorrow.length; i++) {
                    this.todayList.push({
                        done: false,
                        text: this.GET_TASKS.report.toDoTomorrow[i]
                    })
                }                   
            } else {
                this.todayList = this.GET_REPORT_TODAY
            }

            if (!this.GET_REPORT_TODAY.length) {
                let toDoTodayChecked = [];
                for (let i = 0; i < this.GET_TASKS.report.toDoTomorrow.length; i++) {
                    toDoTodayChecked.push({
                        done: false,
                        text: this.GET_TASKS.report.toDoTomorrow[i]
                    })                   
                }
                this.SET_REPORT_TODAY (toDoTodayChecked)
            }


            // Отчет по целям
            if (!this.GET_GOAL_DONE.length) {
                let goalDone = [];
                for (let i = 0; i < this.GET_TASKS.goals.length; i++) {
                    goalDone.push({
                        goalName: this.GET_TASKS.goals[i].title,
                        text: ''
                    })                   
                }
                this.SET_GOAL_DONE(goalDone)
            }
            for (let i = 0; i < this.GET_TASKS.goals.length; i++) {
                this.goalText.push(this.GET_GOAL_DONE[i].text)
            }


            //TO DO лист на завтра
            this.tomorrowList = this.GET_REPORT_TOMORROW
        },

	  	methods: {
            ...mapMutations([
                'SET_TODOLIST_REPORTSENT',
                'SET_REPORT_TOMORROW',
                'SET_REPORT_TODAY',
                'SET_GOAL_DONE'
            ]),

            getReports() {
                return this.GET_TASKS.report.toDoTomorrow
            },

            closeReport: function() {
                this.$emit('closeReport');                
            },

            checkTask: function(index) {
                this.todayList[index].done = !this.todayList[index].done
            },

            addTask: function () {
                if (this.newTask) {
                    this.tomorrowList.push(this.newTask)
                }
                this.newTask = ''
            },
            
            deleteTomorrowTask (index) {
                this.tomorrowList.splice(index, 1)
            },

            save: function() {
                switch (this.reportIndex) {
                    case 1:
                        this.SET_REPORT_TODAY(this.todayList)
                        break;
                    case 2:                        
                        let goalDone = [];
                        for (let i = 0; i < this.GET_TASKS.goals.length; i++) {
                            goalDone.push({
                                goalName: this.GET_TASKS.goals[i].title,
                                text: this.goalText[i]
                            })                   
                        }
                        this.SET_GOAL_DONE(goalDone)
                        break;
                    case 3:
                        if (this.newTask) {
                            this.tomorrowList.push(this.newTask)
                        }
                        this.SET_REPORT_TOMORROW (this.tomorrowList)
                        break;
                }
                this.closeReport();                
            }
        }      			
	}
</script>