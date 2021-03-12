<template>
    <div class="reports-wrapper">
        <div 
            class="report-sent-block" 
            v-if="getReportSent()"
        > 
            <div class="thankyou-message">
                {{ $t('m_Thank_you_for_report') }}
            </div>
            <div class="report-sent-block__body">
                <div class="report-sent-block__body-header">
                    {{ $t('m_your_to_do_list_for_tomorrow') }} 
                </div>
                <div class="report-sent-block__body-content">
                    <div 
                        class="content-container"
                        v-for="(item, index) in GET_TASKS.report.toDoTomorrow"
                        :key="index"
                    >
                        {{index+1 + '. '}} {{item}}
                    </div>
                </div>
            </div>
        </div>

        <div 
            class="fill-report-block" 
            v-if="!getReportSent()"
        >
            <div class="header report-header">
                {{ $t('m_fill_report') }}
            </div>
            <div class="info-message">
                {{ $t(reportInfoMessage)[this.GET_TASKS.report.lifeCounter-1] }}
            </div>
            <div 
                class="report-wrapper"
            >
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
                                <div 
                                    class="reports-content__item"
                                    v-for="(item, index) in GET_TASKS.report.toDoTomorrow"
                                    :key="index"
                                >
                                    <div :class="{ strikethrough: checkTodayDone(index) }">
                                        {{index+1}}. {{item}}
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

                                <div 
                                    class="reports-content__item"
                                    v-for="(item, index) in GET_TASKS.goals"
                                    :key="index"
                                >
                                    <div class="goal">
                                        {{item.title}}
                                    </div>
                                    <div class="report">
                                        {{checkGoalDoneText(index)}}
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
                                <div 
                                    class="reports-content__item"
                                    v-for="(item, index) in GET_REPORT_TOMORROW"
                                    :key="index"
                                >
                                    <div class="report">
                                        {{index+1}}. {{item}} 
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>

                </div>
                <div class="reports-footer">
                    <div 
                        class="sendreport-button basic-buttons"
                        @click="sendReport()"
                    >
                        {{ $t('m_send_report') }}
                    </div>
                    <div class="alert-message">
                        {{ $t(alertMessage) }}
                    </div>
                    <input 
                        id="loadFiles" 
                        type="file"
                        multiple
                        @change="onFileChanged" 
                    >
                    <label 
                        class="basic-buttons" 
                        for="loadFiles"
                    >
                        <img 
                            src="@/assets/img/ad_file.png" 
                            alt="" 
                            class="clip"
                        >
                        <div 
                            class="counter" 
                            v-if="checkFileCounter() > 0"
                        >
                            {{checkFileCounter()}}
                        </div>
                    </label>
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
                    >
                    </edit-report>
                </template>
            </modal>
        </div>     
    </div>  
</template>

<script>
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
                reportIndex: 0,
                modalVisible: false,
                reportSent: false,
                alertMessage: '',
                alertMessages: [
                    'm_alert_messages_1',
                    'm_alert_messages_2',
                    'm_alert_messages_3'
                ],
                goalDone: []
			}
		},

		components: {
            Modal: Modal,
            EditReport: EditReport
		},

		computed: {
            ...mapGetters([ 
                'GET_TASKS',
                'GET_FILES',
                'GET_SELECTED_GAME',
                'GET_GOAL_DONE',
                'GET_REPORT_TOMORROW',
                'GET_REPORT_TODAY'
            ])
        },

        mounted (){
            this.GET_TASKS_FROM_SERVER(this.GET_SELECTED_GAME.id)            
        },

	  	methods: {
            ...mapMutations([
                'SET_TODOLIST_REPORTSENT',
                'SET_FILES',
                'SET_NEW_TODO_LIST',
                'SET_GOAL_DONE',
                'SET_REPORT_TOMORROW'
            ]),

            ...mapActions([ 
				'GET_TASKS_FROM_SERVER',
                'SEND_REPORT',
                'SEND_FILES_TO_POST'
			]),

            closeModal: function () {
                this.modalVisible = false;
                this.reportIndex = 0;    		
            },
            
            getReportSent: function() {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                const tomorrowDate = date.toISOString().slice(0, 10);

                if (tomorrowDate === this.GET_TASKS.report.date) {
                    return true
                }
            },
            
            editReport: function(report) {
                this.reportIndex = report;
                this.modalVisible = true;
            },
            
            checkFileCounter() {
                return this.GET_FILES.length
            },

            onFileChanged (event) {
                let uploadedFile = event.target.files;
                let fileFormat = false;
                let totalFileSize = 0;
                
                // получаем общий размер загруженных файлов
                for (let i = 0; i < this.GET_FILES.length; i++) {
                    totalFileSize = totalFileSize + this.GET_FILES[i].size                    
                }
                for (let i = 0; i < uploadedFile.length; i++) {
                    totalFileSize = totalFileSize + uploadedFile[i].size                    
                }
                
                // определяем есть ли в загруженных файлах неверные форматы
                for (let i = 0; i < uploadedFile.length; i++) {
                    let format = uploadedFile[i].name.split(".").pop(); 
                    if (
                        format === 'jpg' || 
                        format === 'png' || 
                        format === 'pdf' || 
                        format === 'docx' || 
                        format === 'xlsx'
                    ) {
                        fileFormat = true;
                    }                
                }
                
                //если файлы подходят к требованиям сохраняем их в store, иначе выводим сообщение с ошибкой
                if (totalFileSize <= 26214400 && fileFormat) {
                    for (let i = 0; i < uploadedFile.length; i++) {
                        this.alertMessage = ''
                        this.SET_FILES(uploadedFile[i])                  
                    }
                } else if (totalFileSize > 26214400) {
                    this.alertMessage = this.alertMessages[0]
                } else if (!fileFormat) {
                    this.alertMessage = this.alertMessages[1]
                }  
            },

            sendReport: function() {
                if (this.GET_REPORT_TOMORROW.length) {
                    this.SEND_REPORT({
                        gameId: this.GET_SELECTED_GAME.id,
                        report: {
                            goalDone: this.GET_GOAL_DONE,
                            toDoTomorrow: this.GET_REPORT_TOMORROW,
                            todoToday: this.GET_REPORT_TODAY
                        }
                    })
                    .then(resolve => { 
                        if (this.GET_FILES.length) {
                            this.SEND_FILES_TO_POST({
                                gameId: this.GET_SELECTED_GAME.id,
                                postId: resolve,
                                files: this.GET_FILES
                            })
                        }
                        this.GET_TASKS_FROM_SERVER(this.GET_SELECTED_GAME.id)  
                    })    
                } else {
                    this.alertMessage = this.alertMessages[2]
                }                  
            },
            
            getTitle (number) {
                return this.GET_TASKS.goals.filter(function(val) {
                    return val.number === number+1;
                })[0].title;
            },

            getDescription (number) {
                return this.GET_TASKS.goals.filter(function(val) {
                    return val.number === number+1;
                })[0].description;
            },

            checkTodayDone (index) {
                if (this.GET_REPORT_TODAY.length) {
                    return this.GET_REPORT_TODAY[index].done
                } else {
                    return false
                }
            },

            checkGoalDoneText (index) {
                if (this.GET_GOAL_DONE.length) {
                    return this.GET_GOAL_DONE[index].text
                } else {
                    return ''
                }
            }

        }      			
	}
</script>