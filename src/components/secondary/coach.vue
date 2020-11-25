<template>
    <div class="coach-page">
        <div class="coach-header">
            <div class="start-game-button basic-buttons">Создать игру</div>
            <div class="coach-info">
                <div class="coach-info__title">Бизнес-тренер:</div>
                <div class="coach-info__name">{{coach}}</div>
            </div>
        </div>
        <games></games>                                                                                                                        
    </div>
</template>

<script>
    import games from '@/components/secondary/games';
    
    export default {
        name: "coach",
        data () {
            return {
                //инфу про тренера будем получать из хранилища
                coach: 'Вася Щукин'
            }
        },
        components: {
            games: games
        },
        methods: {

        }
    }
</script>
