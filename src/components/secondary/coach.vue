<template>
    <div class="coach-page">
        <div class="coach-header">
            <div class="start-game-button">Создать игру</div>
            <div class="coach-info">
                <div class="coach-info__title">Игры Бизнес-тренера</div>
                <div class="coach-info__name">Вася Щукин</div>
            </div>
        </div>
        <games></games>                                                                                                                        
    </div>
</template>

<script>
    import sendAjax from '../../utils/ajax';
    import games from '../../components/secondary/games';
    
    export default {
        name: "coach",
        data () {
            return {
            }
        },
        components: {
            games: games
        },
        methods: {

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

    .coach-page{
        width: 100%;
        align-items: center;
        flex-direction: column;
        .coach-header{
            margin-top: 49px;
            margin-bottom: 36px;
            width: 675px;
            height: 142px;
            padding-right: 32px;
            flex-direction: column;
            .start-game-button{
                align-self: center;
                align-items: center;
                justify-content: center;
                user-select: none;
                background: #C4C4C4;
                border-radius: 23.5px;
                width: 215px;
                height: 32px;
                margin-bottom: 47px;
            }
            .coach-info{
                align-self: flex-end;
                justify-content: flex-end;
                flex-direction: column;
                width: 268px;
                height: 63px;
                font-weight: bold;
                font-size: 24px;
                line-height: 28px;
                div{
                    align-self: flex-end;
                }
            }
        }
    }
</style>