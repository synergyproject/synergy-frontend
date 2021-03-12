<template>
    <div class="second-wrapper" v-cloak>
        <div 
            class="coach-page"
            v-if="coachPageVisible"
        >
            <div 
                class="coach-header"
                v-if="getHeaderVisible()"
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

            <games @openSetting='openSetting()'></games>

            <modal-window v-if="this.createGameShow" @close='closeWindow'>
                <create-game @closeGame='closeWindow'></create-game>
            </modal-window>                                                                                                                        
        </div>

        <setting-up-game 
            v-if="settingVisible" 
            @closeCH='closeSetting()' 
        >
        </setting-up-game>
    </div>
</template>

<script>
    import Games from '@/components/secondary/Games';
    import ModalWindow from '@/components/modal/ModalWindow';
    import CreateGame from '@/components/modal/CreateGame';
    import SettingUpGame from '@/components/modal/SettingUpGame';
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    
    export default {
        name: "Coach",
        
        data () {
            return {
                createGameShow: false,
                coachPageVisible: true,
                settingVisible: false
            }
        },

        components: {
            Games,
            ModalWindow,
            CreateGame,
            SettingUpGame
        },

        mounted () {
            this.USERS_FROM_SERVER() 
        },

        computed: {
            ...mapGetters([ 
                'GET_USER', 
                'GET_CHANGING_GAME' 
            ])           
		}, 

        methods: {
            ...mapMutations([ 'SET_CHANGING_GAME']),
            ...mapActions([ 'USERS_FROM_SERVER' ]),

            getHeaderVisible () {
                return this.GET_USER.roles.includes("COACH")
            },

            openSetting() {
                this.coachPageVisible = false;
                this.settingVisible = true
            },

            closeSetting() {
                this.coachPageVisible = true;
                this.settingVisible = false
            },

            openWindow() {
                this.createGameShow = true;
            },
            
            closeWindow () {
		  		this.createGameShow = false;
            }
        }
    }
</script>
