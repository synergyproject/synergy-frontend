<template>
    <div class="set_game">
    	<div
            class="cross" 
            @click="close()"
		>				
            <img src="@/assets/img/off_close.png">
            
		</div>
        <modal-window v-if="this.modalVisible" @close='closeWindow'>
            <div class="avatar-window">
                <div>
                    <div class="avatar-requirements">
                        <img 
                            :src="changeGame.logoUrl" 
                            class="avatar-img" 
                            v-if="changeGame.logoUrl"
                        > 
                        <div 
                            class="decor decor-left-top" 
                            v-if="!changeGame.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-left-bottom" 
                            v-if="!changeGame.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-top" 
                            v-if="!changeGame.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-bottom" 
                            v-if="!changeGame.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>    
                        <div class="avatar-requirements-info">
                            {{ $t('m_photo_info') }}
                        </div>
                    </div>
                    <input 
                        id="loadPhoto" 
                        type="file" 
                        @change="loadPhoto"
                    >
                    <label 
                        class="load-button basic-buttons" 
                        for="loadPhoto"
                    >
                        {{ $t('m_upload_photo') }}
                    </label>
                </div>
            </div>
                
        </modal-window>        
        <h2 class="set_game__header">{{ $t("m_set_game") }}</h2>
        <div class="set_game__content">
                <!-- отображение / загрузка аватара -->
            <div class="avatar">
                <div v-if="this.changeGame.logoUrl">
               
                    <img 
                        :src="this.changeGame.logoUrl"
                        
                        class="avatar-img"
                    >
                    <img 
                        src="@/assets/img/icon_pencil.png" 
                        class="pencil edit_avatar" 
                        @click="loadLogo()"
                    > 
                </div>                        
                <img 
                    v-else
                    src="@/assets/img/icon_pencil.png" 
                    class="pencil" 
                    @click="loadLogo()"
                >    
            </div>
            <div class="set_game__info">
                <div class="set_game__container">
                    <div class="set_game__container-head">
                        {{ $t("m_game_name") }}
                    </div>
                    <input 
                        type="text" 
                        maxlength="200" 
                        v-model="changeGame.name"
						placeholder="Введите название"
                        
                    >
                    <div  class="set_game__container-star" :class="{ redAlert: redAlertName }">
                        *
                    </div>
                    <div class="set_game__container-error" :class="{ redAlert: redAlertName }">
                        <img src="@/assets/img/icon_attention.png">
                        <span>
                            {{ $t("m_error_game_name") }}
                        </span>
                    </div>
                </div>

               <div class="set_game__container">
                    <div class="set_game__container-head">
                        {{ $t("m_game_description") }}
                    </div>
                    <textarea
                        maxlength="1000" 
                        v-model="changeGame.description"
                    >
                    </textarea>
                </div>
                <div class="set_game__container">
                    <div class="set_game__container-head">
                        {{ $t("m_game_startDate") }}
                    </div>
                    <input 
                        type="date" 
                        class="start-date" 
                        v-model="changeGame.startDate"
                        @change="changeDate"
                    >

                    <div 
                        class="set_game__container-star" 
                        :class="{ redAlert: redAlertDate }"
                    >
                        *
                    </div>
                    <div class="set_game__container-error" :class="{ redAlert: redAlertDate}">
                        <img src="@/assets/img/icon_attention.png">
                        <span>
                            {{ $t("m_error_game_startDate") }}
                        </span>
                    </div>
                </div>
                <div class="set_game__container">
                    <div class="set_game__container-head">
                        {{ $t("m_game_endDate") }}
                    </div>
                    <input 
                        type="date" 
                        class="end-date" 
                        v-model="changeGame.endDate"
                        disabled
                    >
                    
                    <div class="set_game__container-after">
                        {{ $t("m_8_weeks") }}
                    </div>
                </div>

            </div>  
        </div> 
        	
        <hr />
        <div class="set_game__players">
            <h2 class="set_game__players-head">
                {{ $t("m_players_List") }}
            </h2>
            <div class="set_game__players-licenses">
                {{ $t("m_licenses_available") }} {{changeGame.licensesAvailable}}
            </div>
            <div class="set_game__players-add">
                <input
                    type="text"
                    maxlength="64"
                    autocomplete="off"
                    placeholder="youremail@gmail.com"
                >
                <div class="confirm-button basic-buttons">
                    {{ $t("m_add_player") }}
                </div>
            </div>
            <ul v-show = "changeGame.players.length" class="set_game__players-list">
                <li  class="set_game__players-item" v-for ="(item, num) in changeGame.players" :key = "num">
                    <div class="set_game__players-name">
                        {{item.firstName}} {{item.lastName}}
                    </div>
                    <div class="set_game__players-options">
                        <div  class="status" :style="{backgroundImage:`url(${item.status==='ACTIVE' ? activeImg : item.status==='BAN' ? banImg: item.status==='OUT' ? outImg: '' })`}"></div>
                        <div class="del-button basic-buttons">
                            {{ $t("m_del") }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="set_game-buttons">
            <div class="confirm-button basic-buttons" @click ="chengeGame">
                {{ $t("m_save_settings") }}
            </div>
            <div class="finish-button basic-buttons" >
                {{ $t("m_finish_game") }}
            </div>
        </div>

    </div>

</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    import ModalWindow from '@/components/modal/ModalWindow';
    import active from '@/assets/img/active.png';
    import ban from '@/assets/img/ban.png';
    import out from '@/assets/img/not authorized.png';

    export default {
        name: 'SettingUpGame',
        props:['id'],
        data () {
            return {
                activeImg: active,
                banImg: ban,
                outImg: out,
                changeGame: {
                    id:'',
                    logoUrl: '',
                    name: '',
                    description: '',
                    mentor: {},
                    coach: {},
                    startDate: '',
                    endDate: '',
                    activeUsersCount: '',
                    bannedUsersCount: '', 
                    licensesAvailable: '7',
                    // players: [],
                    players: [
                        {
                            dateOfBirth: "2020-01-31",
                            email: "morgotianin@gmail.com",
                            firstName: "Иван",
                            gender: "MALE",
                            id: '13',
                            lastName: "Горячих",
                            phone: "+380663137126",
                            photo: '',
                            roles: ["COACH", "PLAYER"],
                            status: "ACTIVE",
                            telegram: "@telegrammmm"
                        },
                                                {
                            dateOfBirth: "2020-01-31",
                            email: "morgotianin@gmail.com",
                            firstName: "Андрей",
                            gender: "MALE",
                            id: '14',
                            lastName: "Горячих",
                            phone: "+380663137126",
                            photo: '',
                            roles: ["COACH", "PLAYER"],
                            status: "BAN",
                            telegram: "@telegrammmm"
                        },
                        {
                            dateOfBirth: "2020-01-31",
                            email: "morgotianin@gmail.com",
                            firstName: "Иван",
                            gender: "MALE",
                            id: '13',
                            lastName: "Горячих",
                            phone: "+380663137126",
                            photo: '',
                            roles: ["COACH", "PLAYER"],
                            status: "OUT",
                            telegram: "@telegrammmm"
                        },
                            {
                            dateOfBirth: "2020-01-31",
                            email: "morgotianin@gmail.com",
                            firstName: "Иван",
                            gender: "MALE",
                            id: '13',
                            lastName: "Горячих",
                            phone: "+380663137126",
                            photo: '',
                            roles: ["COACH", "PLAYER"],
                            status: "OUT",
                            telegram: "@telegrammmm"
                        },                            
                        {
                            dateOfBirth: "2020-01-31",
                            email: "morgotianin@gmail.com",
                            firstName: "Иван",
                            gender: "MALE",
                            id: '13',
                            lastName: "Горячих",
                            phone: "+380663137126",
                            photo: '',
                            roles: ["COACH", "PLAYER"],
                            status: "OUT",
                            telegram: "@telegrammmm"
                        },                            
                        {
                            dateOfBirth: "2020-01-31",
                            email: "morgotianin@gmail.com",
                            firstName: "Иван",
                            gender: "MALE",
                            id: '13',
                            lastName: "Горячих",
                            phone: "+380663137126",
                            photo: '',
                            roles: ["COACH", "PLAYER"],
                            status: "OUT",
                            telegram: "@telegrammmm"
                        }
                    ]
                },
                activeDecorColor: '#BCC0C9',
                modalVisible:false,
                redAlertName: false,
                redAlertDate: false,
                photoRedAlertActive: false
            }
        },
        components: {
            ModalWindow 
        },
        computed: {
            ...mapGetters(["GET_GAMES_LIST"]),  
            ...mapGetters([ 'GET_CHANGING_GAME']),         
		},
        mounted() {
            // this.GAMES_FROM_SERVER()
            // console.log('тест1',this.id)
            // this.changeGame.id= this.GET_GAME_BY_ID(this.id).id
            // this.changeGame.logoUrl = this.GET_GAME_BY_ID(this.id).logoUrl
            // this.changeGame.name= this.GET_GAME_BY_ID(this.id).name
            // this.changeGame.description = this.GET_GAME_BY_ID(this.id).description
            // this.changeGame.mentor= this.GET_GAME_BY_ID(this.id).mentor
            // this.changeGame.coach = this.GET_GAME_BY_ID(this.id).coach
            // this.changeGame.startDate= this.GET_GAME_BY_ID(this.id).startDate
            // this.changeGame.endDate = this.GET_GAME_BY_ID(this.id).endDate
            // this.changeGame.activeUsersCount= this.GET_GAME_BY_ID(this.id).activeUsersCount
            // this.changeGame.bannedUsersCount = this.GET_GAME_BY_ID(this.id).bannedUsersCount
            // this.GET_GAME_BY_ID(this.id).licensesAvailable ? this.changeGame.licensesAvailable= this.GET_GAME_BY_ID(this.id).licensesAvailable : this.changeGame.licensesAvailable=this.changeGame.licensesAvailable
            // this.GET_GAME_BY_ID(this.id).players ? this.changeGame.players = this.GET_GAME_BY_ID(this.id).players : this.changeGame.players = this.changeGame.players           
        },

        methods: {
            ...mapMutations(['SET_GAME_BY_ID']),
             ...mapActions(['GAMES_FROM_SERVER']),
            loadPhoto (event) {
                let uploadedFile = event.target.files[0],
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop()
                if (size <= 2097152 && (fileFormat === 'jpg'|| fileFormat === 'png')) {
                    this. changeGame.logoUrl = URL.createObjectURL(event.target.files[0]);
                    this.modalVisible = false	
                } else {
                    this.photoRedAlertActive = true;
                }
            },

            chengeGame(){
                if (this. changeGame.name && this. changeGame.startDate) {
                    this.SET_GAME_BY_ID(this.changeGame);
                    this.$emit('closeChangeGame')
                    this.redAlertName = false;
                    this.redAlertDate = false;

                } 
                if(!this.changeGame.name&!this.changeGame.startDate){
                    this.redAlertName = true
                    this.redAlertDate = true
                } else if(!this.changeGame.name){
                    this.redAlertName = true
                    this.redAlertDate = false
                } else if(!this.changeGame.startDate){
                    this.redAlertName = false
                    this.redAlertDate = true
                }

                
            },
            changeDate(){
                let f = new Date(this.changeGame.startDate)
                f.setDate(f.getDate() + 56)
                let year= f.getFullYear()
                let month= f.getMonth()+1
                let day = f.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                this.changeGame.endDate = [year, month, day].join('-')

            },
            loadLogo() {
                this.modalVisible = true;
            },
            closeWindow () {
		  		this.modalVisible = false;
            
            },
            close() {
			    this.$emit('closeCH')
			}

        }
    }
</script>
