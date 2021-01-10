<template>
    <div class="coach-page">
        <div class="coach-header">
            <div class="start-game-button basic-buttons">
                Создать игру
            </div>
            <div class="coach-info">
                <div class="coach-info__title">
                    Бизнес-тренер:
                </div>
                <div class="coach-info__name">
                    {{coach}}
                </div>
            </div>
        </div>
        <games></games>                                                                                                                        
    </div>
</template>

<script>
    import Games from '@/components/secondary/Games';
    
    export default {
        name: "Coach",
        data () {
            return {
                coach: 'Вася Щукин'
            }
        },
        components: {
            Games: Games
        },
        methods: {

        }
    }
</script>
