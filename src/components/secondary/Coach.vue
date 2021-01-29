<template>
    <div class="coach-page">
        <div class="coach-header">
            <div class="start-game-button basic-buttons" @click="openWindow()">
                {{ $t('m_create_game') }}
            </div>
            <modal-window v-if="this.createGameShow" @close='closeWindow'  >
                <create-game @closeGame='closeWindow'>
                </create-game>
            </modal-window>
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
    import ModalWindow from '@/components/modal/ModalWindow';
    import CreateGame from '@/components/modal/CreateGame';
    export default {
        name: "Coach",
        data () {
            return {
                coach: 'Вася Щукин',
                createGameShow: false,
            }
        },
        components: {
            Games,
            ModalWindow,
            CreateGame
        },
        methods: {
            openWindow() {
                this.createGameShow = true
            },
            
            closeWindow () {
		  		this.createGameShow = false	  		
            },
        }
    }
</script>
