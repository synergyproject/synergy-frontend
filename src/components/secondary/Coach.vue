<template>
    <div class="second-wrapper">
        <div 
            class="coach-page"
            v-if="!changePassVisisble"
        >
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
                <!-- временно скрыто до реализации сортировки по тренерам -->
                <!-- <div class="coach-info">
                    <div class="coach-info__title">
                        {{ $t('m_business_coach') }}
                    </div>
                    <div class="coach-info__name">
                        {{GET_USER.firstName}} {{GET_USER.lastName}}
                    </div>
                </div> -->
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

        <change-pass 
            class="change-pass"
            v-if="changePassVisisble"
            @closeChangePass='closeChangePass()'
        ></change-pass>
    </div>
</template>

<script>
    import Games from '@/components/secondary/Games';
    import ModalWindow from '@/components/modal/ModalWindow';
    import CreateGame from '@/components/modal/CreateGame';
    import ChangePass from '@/components/secondary/ChangePass';
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    
    export default {
        name: "Coach",

        props: {
			changePassVisisble: Boolean
        },
        
        data () {
            return {
                createGameShow: false,
                coachHeaderVisible: false
            }
        },

        components: {
            Games,
            ModalWindow,
            CreateGame,
            ChangePass
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
            },

            closeChangePass () {
                this.$emit('closeChangePass');
            }

        }
    }
</script>
