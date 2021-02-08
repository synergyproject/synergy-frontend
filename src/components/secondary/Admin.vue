<template>
    <div class="admin">
        <div 
            class="return-link"
            @click="closeAdmin()"
        >
            Back
        </div>

        <div class="admin__header">
            <h1>{{ $t("m_administrator_account") }}</h1>
            <ul class="admin__menu">
                <li class="admin__menu-item" :class="{active:trainersList}" @click="trainersListOn()">
                    <span>
                        {{ $t("m_Business_Trainers_List") }}
                    </span>
                </li>
                <li class="admin__menu-item" :class="{active:gamesList}" @click="gamesListOn()">
                    <span>
                        {{ $t("m_games_List") }}
                    </span>
                </li>
                <li class="admin__menu-item" :class="{active:playersList}" @click="playersListOn()">
                    <span>
                        {{ $t("m_players_List") }}
                    </span>
                </li>
            </ul>
        </div>
        <trainers-list v-if="trainersList"></trainers-list>     
        <games-list v-if="gamesList"></games-list>  
        <players-list v-if="playersList"></players-list>                                                                                                         
    </div>
</template>

<script>
    import TrainersList from '@/components/secondary/AdminItems/TrainersList';
    import PlayersList from '@/components/secondary/AdminItems/PlayersList';
    import GamesList from '@/components/secondary/AdminItems/GamesList';
    
    export default {
        name: "Admin",

        data () {
            return {
                trainersList: false,
                gamesList:true,
                playersList:false,
                
            }
        },

        components: {
            GamesList,
            PlayersList,
            TrainersList
        },

        methods: {
            closeAdmin () {
                this.$emit('closeAdmin');
            },

            trainersListOn(){
                this.trainersList = true;
                this.gamesList = false;
                this.playersList=false;
            },

            gamesListOn(){
                this.trainersList = false;
                this.gamesList = true;
                this.playersList=false;
            },

            playersListOn(){
                this.trainersList = false;
                this.gamesList = false;
                this.playersList=true;
            }

        }
    }
</script>
