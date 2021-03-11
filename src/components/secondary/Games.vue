<template>        

    <div class="games-main">
        <div 
            class="game" 
            v-for="(item, index) in getGamesList" 
            :key="index"
        >
            <div class="game-left-wrapper">
                <img :src="item.logoUrl" class="photo">
                <div class="game-info-left">
                    <div class="game-info-left__name">
                        {{item.name}}
                    </div>
                    <!-- <div class="game-info-left__mentor">
                        <div class="title">
                            {{ $t('m_mentor') }} 
                        </div>
                        <div class="full-name">
                            {{item.mentor.firstName + ' ' + item.mentor.lastName}} 
                        </div>
                    </div> -->
                    <div class="game-info-left__coach">
                        <div class="title">
                            {{ $t('m_business_coach') }}
                        </div>
                        <div class="full-name">
                            {{item.coach.firstName + ' ' + item.coach.lastName}}
                        </div>
                    </div>
                    <div class="game-info-left__buttons">
                        <div 
                            class="game-button basic-buttons"  
                            @click="sendID(item.id)"
                        >
                            {{ $t('m_enter') }}
                        </div>
                        <div 
                            class="game-button basic-buttons" 
                            @click="editGame(item.id)"
                            v-if="checkEditButtonVisible(item.coach.id, item.endDate)"
                        >
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
                <div class="game-status">
                    {{$t(getGameStatus(item.startDate, item.endDate))}}
                </div>
            </div>    
        </div>
    </div>                                                                                                                               
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    
    export default {
        name: "Games",

        data () {
            return {
                editGameButtonVisible: false
            }
        },

        computed: {
            ...mapGetters([
                'GET_GAMES', 
                'GET_GAMES_LIST', 
                'GET_SELECTED_GAME', 
                'GET_USER'
            ]),

            getGamesList() {
                return  this.GET_GAMES_LIST.games
            }
        },

        mounted() {
            this.GAMES_FROM_SERVER();
            this.USERS_FROM_SERVER();
            
        },

        methods: {
            ...mapMutations([ 
                'SET_CHANGING_GAME', 
                'SET_CURRENT_GAME_ID' 
            ]),
            ...mapActions([ 
                'GAMES_FROM_SERVER', 
                'SELECTED_GAMES_FROM_SERVER', 
                'USERS_FROM_SERVER' 
            ]),

            checkEditButtonVisible (id, endDate) {       
                let	date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                let currentDate = [year, month, day].join('-');
                let dateCheck = endDate > currentDate
                
                if (this.GET_USER.roles.includes('ADMIN') && dateCheck) {
                    return true
                } else if (this.GET_USER.roles.includes('COACH') && dateCheck) {
                    return this.GET_USER.id === id ? true : false
                }
            },

            editGame(id) {
                this.SET_CURRENT_GAME_ID(id)
                this.$emit('openSetting');               
            },

            closeWindow () {
		  		this.setOpen = false			
            },

            sendID(id){
                this.SELECTED_GAMES_FROM_SERVER(id)
                    .then(resolve => {
                        this.$router.push({ path: '/line'})
                    })
            },
           
            calcCurrentDate: function() {
                let	date = new Date();
                let	currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                return Math.ceil((Date.parse(currentDate)) / 86400000);
            },

            daysLeft: function (startDate, endDate) {
                let startDateNumber = Math.ceil((Date.parse(startDate)) / 86400000),
                    endDateNumber = Math.ceil((Date.parse(endDate)) / 86400000);
                    // currentDateNumber = this.calcCurrentDate();

                // if (currentDateNumber < startDateNumber) {
                //     return endDateNumber - startDateNumber
                // } else if (endDateNumber >= startDateNumber && currentDateNumber <= endDateNumber) {
                //     return endDateNumber - currentDateNumber;
                // } else {
                //     return 0
                // }
                if (endDateNumber >= startDateNumber) {
                    return endDateNumber - startDateNumber
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

