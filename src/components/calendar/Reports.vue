<template>
    <div class="reports-wrapper">
        <div class="report-sent-block" v-if="getReportSent()"> 
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
                        v-for="(item, index) in getTomorrowTascks()"
                        :key="index"
                    >
                        {{index+1 + '. '}} {{item.description}}
                    </div>
                </div>
            </div>
        </div>

        <div class="fill-report-block" v-if="!getReportSent()">
            <div class="header report-header">
                {{ $t('m_fill_report') }}
            </div>
            <div class="info-message">
                {{ $t(reportInfoMessage)[0] }}
            </div>
            <div class="report-wrapper">
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
                                    v-for="(item, index) in GET_TODOLIST[dayIndex].dayTascks"
                                    :key="index"
                                >
                                    <div :class="{ strikethrough: item.checked }">
                                        {{index+1}}. {{getTodo(dayIndex, index)}}
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
                                    v-for="(item, index) in getGoals()"
                                    :key="index"
                                >
                                    <div class="goal">
                                        {{item.name}}
                                    </div>
                                    <div class="report">
                                        {{item.reports[0]}}
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
                                    v-for="(item, index) in GET_TODOLIST[dayIndex+1].dayTascks"
                                    :key="index"
                                >
                                    <div class="reports-content__item">
                                        {{index+1}}. {{getTodo(dayIndex+1, index)}} 
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
                        :dayIndex='dayIndex'
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
                ]
			}
		},
		components: {
            Modal: Modal,
            EditReport: EditReport
		},
		computed: {
            ...mapGetters(['GET_TODOLIST']),
            ...mapGetters(['GET_GOALS']),
            ...mapGetters(['GET_FILES'])           
        },
        created (){
            let list = this.GET_TODOLIST;
            
            //если на завтрашний день еще не существует обьекта в ToDo - создаём
            if (list.length <= this.dayIndex+1) {
                this.SET_NEW_TODO_LIST(
                    {
                        reportSent: false,
                        dayTascks: []
			        }
                )
            }
        },			
	  	methods: {
            ...mapMutations(['SET_TODOLIST_REPORTSENT']),
            ...mapMutations(['SET_NEW_TODO_LIST']),
            ...mapMutations(['SET_FILES']),

            closeModal: function () {
                this.modalVisible = false;
                this.reportIndex = 0;    		
            },
            
            getReportSent: function() {
                return this.GET_TODOLIST[this.dayIndex].reportSent
            },

            getTomorrowTascks: function() {
                return this.GET_TODOLIST[this.dayIndex+1].dayTascks 
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
                if (this.GET_TODOLIST[this.dayIndex+1].dayTascks.length) {
                    this.SET_TODOLIST_REPORTSENT(this.dayIndex)
                } else {
                    this.alertMessage = this.alertMessages[2]
                }               
            },

			getTodo: function(day, index) {
                //проверяем существует ли запись в массиве todo записи в текущем дне 
				if (this.GET_TODOLIST.length >= day + 1) {
                    if (this.GET_TODOLIST[day].dayTascks.length >= index + 1 ) {
                        return this.GET_TODOLIST[day].dayTascks[index].description
                    }
				}				
            },
            
            getGoals: function() {
                return this.GET_GOALS
            }
        }      			
	}
</script>