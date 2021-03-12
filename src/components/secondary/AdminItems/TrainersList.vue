<template>
    <div class="trainers-list">
        <div
            class="add-button basic-buttons"
            @click="openCreateCoach()"
        >
            + {{ $t('m_add_business_coach') }}
        </div>
        <div class="table">
            <ul class="table__header">
                <li class="table__header-item id">
                    <span
                        @click="changeOrder('id', orders.id)"
                    >
                        {{ $t("m_ID") }}
                    </span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                    >
                </li>
                <li class="table__header-item coach">
                    <span
                        @click="changeOrder('name', orders.name)"
                    >
                        {{ $t('m_business_coach') }}
                    </span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                    >
                </li>
                <li class="table__header-item games-list">
                    <span class="games-list-header">
                        {{ $t('m_games_List') }}
                    </span>
                    <!-- <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                    > -->
                </li>
                <li class="table__header-item delete">
                    <span
                        @click="changeOrder('status', orders.status)"
                    >
                        {{ $t('m_delete') }}
                    </span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                    >
                </li>
                <li class="table__header-item number">
                    <span
                        @click="changeOrder('licenses', orders.licenses)"
                    >
                        {{ $t('m_licenses_number') }}
                    </span>
                    <img 
                        src="@/assets/img/arrow_down.png" 
                        class="table__select" 
                    >
                </li>
            </ul>
            <ul class="table__list">
                <li 
                    class="table__list-row"
                    v-for="(coach, item) in GET_COACHES.users" 
                    :key="item" 
                >
                    <div class="table__list-item id">
                        {{coach.id}}
                    </div>
                    <div class="table__list-item coach">
                        {{coach.lastName}} {{coach.firstName}}
                    </div>
                    <div class="table__list-item games-list">
                        <div class="games-list-wrapper">
                            <div 
                                class="game"
                                v-for="(game, item) in coach.games" 
                                :key="item"
                            >
                                {{game.name}}
                            </div>
                        </div>                        
                    </div>
                    <div class="table__list-item delete">
                        {{coach.status === "LOCKED" ? $t('m_yes') : $t('m_no') }}
                    </div>
                    <div class="table__list-item number">
                        {{coach.licenses === null ? 0 : coach.licenses}} 
                    </div>
                </li>
            </ul>
        </div>

        <div class="pages-wrapper">
            <div 
                class="page"
                v-for="(item, index) in totalPages" 
                :key="index"
                @click="changePage(index)"
            >
                {{item}}
            </div>
        </div>

        <modal @close='closeModal' v-show="modalVisible" v-if="modalVisible">
            <template v-slot:modal-content>
                <add-trainer @closeModal='closeModal'></add-trainer>
            </template>  
        </modal>
                                                                                                                         
    </div>
</template>

<script>
    import Modal from '@/components/modal/Modal';
    import AddTrainer from '@/components/secondary/AdminItems/AddTrainer';
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "TrainersList",

        data () {
            return {
                modalVisible: false,
                //true = 'default', false = 'revert'
                orders: {
                    id: true,
                    name: true,
                    status: true,
                    licenses: true
                },
  				totalPages: [],
                coachDisplay: {
                    sort: 'id',
                    order: 'default',
                    page: 0
                }                     
            }
        },

        components: {
            Modal,
            AddTrainer
		},

        mounted () {
            this.COACHES_FROM_SERVER(this.coachDisplay)
            .then(resolve => {
                console.log('GET_COACHES.users', this.GET_COACHES.users);
                for (let i = 1; i <= this.GET_COACHES.totalPages; i++) {
                    this.totalPages.push(i)                           
                }
            })         
        },

        computed: {
            ...mapGetters([ 'GET_COACHES' ]),
         
		}, 

        methods: {
            ...mapMutations([ 'SET_COACHES', 'SET_PRIMARY_BLUR' ]),
            ...mapActions([ 'COACHES_FROM_SERVER' ]),
            
            changePage (index) {
                this.coachDisplay.page = index;
                this.COACHES_FROM_SERVER(this.coachDisplay)
            },

            openCreateCoach () {
                // this.SET_PRIMARY_BLUR(true);
                this.modalVisible = true;
            },
            
            changeOrder (sort, orderValue) {
                this.coachDisplay.sort = sort;
                this.coachDisplay.order = !orderValue ? 'default' : 'revert';
                this.orders[sort] = !orderValue;
                this.COACHES_FROM_SERVER(this.coachDisplay)
            },

            closeModal() {
                this.SET_PRIMARY_BLUR(false);
				this.modalVisible = false;	  	
            }
        }
    }
</script>
