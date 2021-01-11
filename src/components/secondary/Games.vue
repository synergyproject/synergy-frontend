<template>
    <div class="games-main">
        <div 
            class="game" 
            v-for="(item, index) in getGamesList" 
            :key="index"
        >
            <div>
                <div class="photo"></div>
                <div class="game-info-left">
                    <div class="game-info-left__name">
                        <!-- {{item.name}} -->
                    </div>
                    <div class="game-info-left__description">
                        <!-- {{item.description}} -->
                    </div>
                    <div class="game-info-left__mentor">
                        <div class="mentor-title">
                            {{ $t('m_mentor') }}
                        </div>
                        <div class="mentor">
                            {{item.mentor.firstName + ' ' + item.mentor.lastName}}
                        </div>
                    </div>
                    <div class="game-info-left__coach">
                        <div class="coach-title">
                            {{ $t('m_business_coach') }}
                        </div>
                        <div class="coach">
                            <!-- {{item.coach}} -->
                        </div>
                    </div>
                    <div class="game-info-left__buttons">
                        <div class="game-button basic-buttons">
                            {{ $t('m_enter') }}
                        </div>
                        <div class="game-button basic-buttons">
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
                            {{item.activePlayers}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            {{ $t('m_banned_players') }}
                        </div>
                        <div class="content">
                            {{item.bannedPlayers}}
                        </div>
                    </div> 
                </div>
                <div class="game-button basic-buttons">
                    {{ $t('m_statistics') }}
                </div>
            </div>    
        </div>
    </div>                                                                                                                               
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    
    export default {
        name: "Games",
        data () {
            return {
            }
        },
        components: {

        },
        computed: {
            ...mapGetters(['GET_GAMES', 'GET_GAMES_LIST']),
            getGamesList() {
                return this.GET_GAMES_LIST.games
            }
        },
        methods: {
            ...mapActions(['GAMES_FROM_SERVER']),
            daysLeft: function (startDate, endDate) {
                let date1 = new Date(startDate),
                    date2 = new Date(endDate);
                    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            }
        },
        mounted() {
            this.GAMES_FROM_SERVER()
            console.log(this.GET_GAMES_LIST.games, 'this.GET_GAMES_LIST.games');
        }
    }
</script>

