<template>
    <div class="trainers-list">
        <div
            class="add-button basic-buttons"
            @click="openCreateCoach()"
        >
            {{ $t('m_add_business_coach') }}
        </div>
        <div class="table">
            <ul class="table__header">
                <li class="table__header-item id">
                    <span>{{ $t("m_ID") }}</span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                        @click="select()"
                    >
                </li>
                <li class="table__header-item coach">
                    <span>{{ $t('m_business_coach') }}</span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                        @click="select()"
                    >
                </li>
                <li class="table__header-item games-list">
                    <span>{{ $t('m_games_List') }}</span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                        @click="select()"
                    >
                </li>
                <li class="table__header-item delete">
                    <span>{{ $t('m_delete') }}</span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                        @click="select()"
                    >
                </li>
                <li class="table__header-item number">
                    <span>{{ $t('m_licenses_number') }}</span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                        @click="select()"
                    >
                </li>
            </ul>
            <ul class="table__list">
                <li 
                    class="table__list-row"
                    v-for ="(coach) in GET_COACHES" 
                    :key = "coach.id" 
                >
                    <div class="table__list-item id">{{coach.id}}</div>
                    <div class="table__list-item coach">{{coach.firstName}} {{coach.lastName}}</div>
                    <div class="table__list-item games-list">{{coach.games.join(", ")}} </div>
                    <div class="table__list-item delete">{{coach.delete=="Y" ? $t('m_yes') : $t('m_no') }}</div>
                    <div class="table__list-item number">{{coach.licenses}} </div>
                </li>
            </ul>
        </div>
                                                                                                                     
    </div>
</template>

<script>

    import { mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        name: "TrainersList",
        data () {
            return {

                
            }
        },
        components: {
            
        },
        computed: {
            ...mapGetters(['GET_COACHES']),
         
		}, 
        methods: {
            ...mapMutations(['SET_COACHES']),
            openCreateCoach(){

            },
            select(){

            }
        }
    }
</script>
