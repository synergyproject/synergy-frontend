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
                            Ментор:
                        </div>
                        <div class="mentor">
                            {{item.mentor.firstName + ' ' + item.mentor.lastName}}
                        </div>
                    </div>
                    <div class="game-info-left__coach">
                        <div class="coach-title">
                            Бизнес-тренер:
                        </div>
                        <div class="coach">
                            <!-- {{item.coach}} -->
                        </div>
                    </div>
                    <div class="game-info-left__buttons">
                        <div class="game-button basic-buttons">
                            Войти
                        </div>
                        <div class="game-button basic-buttons">
                            Настроить
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-info-right">
                <div class="info">
                    <div class="info-block">
                        <div class="title">
                            Дата старта:
                        </div>
                        <div class="content">
                            {{item.startDate}}
                        </div>
                    </div>
                    <div class="info-block"> 
                        <div class="title">
                            Дата окончания:
                        </div>
                        <div class="content">
                            {{item.endDate}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            Дней до конца:
                        </div>
                        <div class="content">
                            {{daysLeft(item.startDate, item.endDate)}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            Активных Игроков:
                        </div>
                        <div class="content">
                            {{item.activePlayers}}
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            Игроков в бане:
                        </div>
                        <div class="content">
                            {{item.bannedPlayers}}
                        </div>
                    </div> 
                </div>
                <div class="game-button basic-buttons">
                    Статистика
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

