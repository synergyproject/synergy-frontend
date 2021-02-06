<template>
    <div class="coach-page">

        <div 
            class="coach-header"
            v-if="coachHeaderVisible"
        >
            <div 
                class="start-game-button basic-buttons" 
                @click="openWindow()"
            >
                {{ $t('m_create_game') }}
            </div>
            <div class="coach-info">
                <div class="coach-info__title">
                    {{ $t('m_business_coach') }}
                </div>
                <div class="coach-info__name">
                    {{GET_USER.firstName}} {{GET_USER.lastName}}
                </div>
            </div>
        </div>
        <div 
            class="games-header"
            v-else
        >
            {{ $t('m_games') }}
        </div>

        <games></games>

        <modal-window v-if="this.createGameShow" @close='closeWindow'>
            <create-game @closeGame='closeWindow'></create-game>
        </modal-window>                                                                                                                        
    </div>
</template>

<script>
    import Games from '@/components/secondary/Games';
    import ModalWindow from '@/components/modal/ModalWindow';
    import CreateGame from '@/components/modal/CreateGame';
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    
    export default {
        name: "Coach",

        data () {
            return {
                coach: 'Вася Щукин',
                createGameShow: false,
                coachHeaderVisible: false
            }
        },

        components: {
            Games,
            ModalWindow,
            CreateGame
        },

        mounted () {
            //"создать игру" и имя тренера отображаем только если зашел тренер
            this.USERS_FROM_SERVER()
                .then(resolve => {
                    this.coachHeaderVisible = this.GET_USER.roles.includes('COACH')
                })    
        },

        computed: {
            ...mapGetters([ 'GET_USER' ])           
		}, 

        methods: {
            ...mapMutations([ 'SET_PRIMARY_BLUR' ]),
            ...mapActions([ 'USERS_FROM_SERVER' ]),

            openWindow() {
                this.createGameShow = true;
                this.SET_PRIMARY_BLUR(true);
            },
            
            closeWindow () {
		  		this.createGameShow = false;
                this.SET_PRIMARY_BLUR(false);	  		
            }
        }
    }
</script>
