<template>
    <div class="games-main">
        <div class="game" v-for="(item, index) in games">
            <div class="photo"></div>
            <div class="game-info-left">
                <div class="game-info-left__name">{{item.name}}</div>
                <div class="game-info-left__description">{{item.description}}</div>
                <div class="game-info-left__mentor">
                    <div class="mentor-title">Ментор:</div>
                    <div class="mentor">{{item.mentor}}</div>
                </div>
                <div class="game-info-left__coach">
                    <div class="coach-title">Бизнес-тренер:</div>
                    <div class="coach">{{item.coach}}</div>
                </div>
                <div class="game-info-left__buttons">
                    <div class="button">Войти</div>
                    <div class="button">Настроить</div>
                </div>
            </div>
            <div class="game-info-right">
                <div class="info">
                    <div class="info-block">
                        <div class="title">Дата старта:</div>
                        <div class="content">{{item.startDate}}</div>
                    </div>
                    <div class="info-block"> 
                        <div class="title">Дата окончания:</div>
                        <div class="content">{{item.endDate}}</div>
                    </div>
                    <div class="info-block">
                        <div class="title">Дней до конца:</div>
                        <div class="content">{{daysLeft(item.startDate, item.endDate)}}</div>
                    </div>
                    <div class="info-block">
                        <div class="title">Активных Игроков:</div>
                        <div class="content">{{item.activePlayers}}</div>
                    </div>
                    <div class="info-block">
                        <div class="title">Игроков в бане:</div>
                        <div class="content">{{item.bannedPlayers}}</div>
                    </div> 
                </div>
                <div class="button">Статистика</div>
            </div>    
        </div>
    </div>                                                                                                                               
</template>

<script>
    import sendAjax from '../../utils/ajax';
    
    export default {
        name: "games",
        data () {
            return {
                games: [
                    {photo: "url", name: "Название 1", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.22.2020", activePlayers: 6, bannedPlayers: 0},
                    {photo: "url", name: "Название 2", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0},
                    {photo: "url", name: "Название 3", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "11.13.1999", endDate: "05.17.2044", activePlayers: 6, bannedPlayers: 0},
                    {photo: "url", name: "Название 4", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0},
                    {photo: "url", name: "Название 5", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0},
                    {photo: "url", name: "Название 6", description: "описание", mentor: "Витя Маликов", coach: "Витя Маликов", startDate: "01.01.2020", endDate: "01.04.2020", activePlayers: 6, bannedPlayers: 0}
                ]
            }
        },
        components: {

        },
        methods: {
            daysLeft: function (startDate, endDate) {
                let date1 = new Date(startDate),
                    date2 = new Date(endDate);
                    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    $fontf: 'Roboto', sans-serif;

    *{
        display: flex;
        font-family: $fontf;
        color: #000000;
    }

    .games-main{
        flex-direction: column;
        max-height: 641px;
        padding-right: 20px;
        overflow-y: auto;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 12px;
        }            
        /* Track */
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
            -webkit-border-radius: 10px;
            border-radius: 10px;
        }            
        /* Handle */
        &::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 10px;
            background: #C4C4C4;; 
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
        }
        .game{
            width: 675px;
            height: 187px;
            margin-bottom: 40px;
            .photo{
                width: 183px;
                height: 187px;
                background: #C4C4C4;
            }
            .button{
                width: 100px;
                height: 32px;
                align-items: center;
                justify-content: center;
                border: 1px solid #747474;
                box-sizing: border-box;
                border-radius: 100px;
                font-size: 12px;
            }
            .game-info-left{
                width: 220px;
                margin-left: 39px;
                flex-direction: column;
                .game-info-left__name{
                    align-items: center;
                    height: 28px;
                    font-weight: bold;
                    font-size: 24px;
                    margin-bottom: 8px;
                }
                .game-info-left__description{
                    height: 21px;
                    font-size: 18px;
                    color: #626060;
                    margin-bottom: 22px;
                }
                .game-info-left__mentor{
                    height: 22px;
                    margin-bottom: 9px;
                    align-items: center;
                    .mentor-title{
                        margin-right: 8px;
                        font-size: 12px;
                    }
                    .mentor{
                        height: 14px;
                        background: #C4C4C4;
                        border-radius: 15px;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 8px 4px 8px;
                        font-size: 12px;
                    }
                }
                .game-info-left__coach{
                    height: 22px;
                    margin-bottom: 23px;
                    align-items: center;
                    .coach-title{
                        margin-right: 8px;
                        font-size: 12px;
                    }
                    .coach{
                        height: 14px;
                        background: #C4C4C4;
                        border-radius: 15px;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 8px 4px 8px;
                        font-size: 12px;
                    }
                }
                .game-info-left__buttons{
                    justify-content: space-between;
                }
            }
            .game-info-right{
                flex-direction: column;
                align-items: flex-end;
                justify-content: space-between;
                width: 157px;
                margin-left: 76px;
                .info{
                    margin-top: 36px;
                    flex-direction: column;
                    align-items: flex-end;
                    .info-block{
                        margin-bottom: 4px;
                        .title{
                            font-weight: 400;
                            font-size: 10px;
                            margin-right: 4px;
                        }
                        .content{
                            font-weight: 500;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>