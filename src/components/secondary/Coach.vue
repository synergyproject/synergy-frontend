<template>
    <div class="coach-page">
        <div class="coach-header">
            <div class="start-game-button basic-buttons">
                {{ $t('m_create_game') }}
            </div>
            <div class="coach-info">
                <div class="coach-info__title">
                    {{ $t('m_business_coach') }}
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
