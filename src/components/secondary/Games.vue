<template>        

    <div class="games-main">

        <modal-window v-if="setOpen" @close='closeWindow' >
            <setting-up-game :id = "gameID" @closeChangeGame='closeWindow'>
            </setting-up-game>
        </modal-window>
        <div 
            class="game" 
            v-for="(item, index) in getGamesList" 
            :key="index"
        >


            <div class="game-left-wrapper">
                <!-- <div class="photo"></div> -->
                <img :src="item.logoUrl" class="photo">
                <div class="game-info-left">
                    <div class="game-info-left__name">
                        {{item.name}}
                    </div>
                    <div class="game-info-left__mentor">
                        <div class="title">
                            {{ $t('m_mentor') }} 
                        </div>
                        <div class="full-name">
                            {{item.mentor.firstName + ' ' + item.mentor.lastName}} 
                        </div>
                    </div>
                    <div class="game-info-left__coach">
                        <div class="title">
                            {{ $t('m_business_coach') }}
                        </div>
                        <div class="full-name">
                            {{item.coach.firstName + ' ' + item.coach.lastName}}
                        </div>
                    </div>
                    <div class="game-info-left__buttons">
                        <div class="game-button basic-buttons">
                            {{ $t('m_enter') }}
                        </div>
                        <div class="game-button basic-buttons" @click="openWindow" :idItem='item.id'>
                            {{ $t('m_edit') }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-info-right">
                <div class="info">
                    <div class="info-block">
                        <div class="title">
                            {{ $t('m_start_date') }}
                        </div>
                        <div class="content">
                            {{item.startDate}}
                        </div>
                    </div>
                    <div class="info-block"> 
                        <div class="title">
                            {{ $t('m_end_date') }}
                        </div>
                        <div class="content">
                            {{item.endDate}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            {{ $t('m_days_left') }}
                        </div>
                        <div class="content">
                            {{daysLeft(item.startDate, item.endDate)}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            {{ $t('m_active_players') }}
                        </div>
                        <div class="content">
                            {{item.activeUsersCount}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            {{ $t('m_banned_players') }}
                        </div>
                        <div class="content">
                            {{item.bannedUsersCount}}
                        </div>
                    </div> 
                </div>
                <div class="game-button">
                    {{$t(getGameStatus(item.startDate, item.endDate))}}
                </div>
            </div>    
        </div>
    </div>                                                                                                                               
</template>

<script>
    import SettingUpGame from '@/components/modal/SettingUpGame';
    import ModalWindow from '@/components/modal/ModalWindow';
    import { mapGetters, mapActions } from 'vuex';
    
    export default {
        name: "Games",

        data () {
            return {
                setOpen: false,
                gameID:""
            }
        },
        components: {
            SettingUpGame,
            ModalWindow 
        },
        computed: {
            ...mapGetters(['GET_GAMES', 'GET_GAMES_LIST']),

            getGamesList() {
                return  this.GET_GAMES_LIST.games
            }
        },

        mounted() {
            this.GAMES_FROM_SERVER();
            
        
        },

        methods: {
            ...mapActions(['GAMES_FROM_SERVER']),
            openWindow(e) {
                this.gameID = e.target.getAttribute('idItem');
                this.setOpen = true;
                
            },
            closeWindow () {
		  		this.setOpen = false			
            },

            // все даты в днях чтобы легче было отслеживать 
            calcCurrentDate: function() {
                let	date = new Date();
                let	currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                return Math.ceil((Date.parse(currentDate)) / 86400000);
            },

            daysLeft: function (startDate, endDate) {
                let startDateNumber = Math.ceil((Date.parse(startDate)) / 86400000),
                    endDateNumber = Math.ceil((Date.parse(endDate)) / 86400000),
                    currentDateNumber = this.calcCurrentDate();

                if (currentDateNumber < startDateNumber) {
                    return endDateNumber - startDateNumber
                } else if (endDateNumber >= startDateNumber && currentDateNumber <= endDateNumber) {
                    return endDateNumber - currentDateNumber;
                } else {
                    return 0
                }
            },

            getGameStatus: function(startDate, endDate) {
                let startDateNumber = Math.ceil((Date.parse(startDate)) / 86400000),
                    endDateNumber = Math.ceil((Date.parse(endDate)) / 86400000),
                    currentDateNumber = this.calcCurrentDate();

                if (currentDateNumber < startDateNumber) {
                    return "m_draft"
                } else if (currentDateNumber >= startDateNumber && currentDateNumber <= endDateNumber) {
                    return "m_active"
                } else {
                    return "m_finished"
                }
            }
        }
    }
</script>

