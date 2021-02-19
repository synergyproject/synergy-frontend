<template>
    <div class="set_game">
        <div 
            class="return-link"
            @click="closeCH()"
        >
            {{ $t('m_back') }}
        </div>

        <modal-window v-if="this.modalVisible" @close='closeWindow'>
            <div 
                class="avatar-window"
                v-if="avatarWindowVisible"
            >
                <div>
                    <div class="avatar-requirements">
                        <img 
                            :src="this.GET_CURRENT_GAME.logoUrl" 
                            class="avatar-img" 
                            v-if="this.GET_CURRENT_GAME.logoUrl"
                        > 
                        <div 
                            class="decor decor-left-top" 
                            v-if="!this.GET_CURRENT_GAME.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-left-bottom" 
                            v-if="!this.GET_CURRENT_GAME.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-top" 
                            v-if="!this.GET_CURRENT_GAME.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-bottom" 
                            v-if="!this.GET_CURRENT_GAME.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>    
                        <div class="avatar-requirements-info">
                            {{ $t('m_photo_info') }}
                        </div>
                    </div>
                    <input 
                        id="loadPhoto" 
                        type="file" 
                        @change="sendPhoto"
                    >
                    <label 
                        class="load-button basic-buttons" 
                        for="loadPhoto"
                    >
                        {{ $t('m_upload_photo') }}
                    </label>
                </div>
            </div>
            <div 
                class="finish-game"
                v-if="finishGameVisible"
            >
                <div>
                    закончить игру?
                </div>
                <div 
                    class="end-game-button basic-buttons"
                    @click="confirmFinishGame()"
                >
                    Подтвердить
                </div>
            
            </div>    
        </modal-window>        
        <h2 class="set_game__header">
            {{ $t("m_set_game") }}
        </h2>
        <div class="set_game__content">

            <div class="avatar">
                <div v-if="this.GET_CURRENT_GAME.logoUrl">         
                    <img 
                        :src="this.GET_CURRENT_GAME.logoUrl"                        
                        class="avatar-img"
                    > 
                </div>                        
                <img 
                    v-else
                    src="@/assets/img/icon_pencil.png" 
                    class="pencil" 
                    @click="loadLogo()"
                >
                <div 
                    class="edit-avatar"
                    @click="loadLogo()"
                >
                    <img 
                        src="@/assets/img/icon_pencil.png" 
                        class="pencil edit_avatar" 
                    >
                </div>    
            </div>
            <div class="set_game__info"> 
                <div class="set_game__container">
                    <div class="set_game__container-head">
                        {{ $t("m_game_name") }}
                    </div>
                    <input 
                        type="text" 
                        maxlength="200" 
                        v-model="gameData.name"
						:placeholder="$t('m_enter_title')"                       
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
                        v-model="gameData.description"
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
                        :min="setMinStartDate()" 
                        v-model="gameData.startDate"
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
                        v-model="gameData.endDate"
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
                {{ $t("m_licenses_available") }} {{GET_LICENSES}}
            </div>
            <div class="set_game__players-add">
                <!-- убираем блок если нет лицензий -->
                <input
                    v-if="GET_LICENSES"
                    v-model="email"
                    type="text"
                    maxlength="64"
                    autocomplete="off"
                    placeholder="youremail@gmail.com"
                >
                <div 
                    class="confirm-button basic-buttons"
                    v-if="GET_LICENSES"
                    @click="addPlayer()"
                >
                    {{ $t("m_add_player") }}
                </div>
                <div 
					class="alert-message"
					v-if="errorMessage"
				>
					<img src="@/assets/img/icon_attention.png">
					{{$t(errorMessage)}}
				</div>
            </div>

            <ul class="set_game__players-list">
                <li  
                    class="set_game__players-item" 
                    v-for ="(item, num) in GET_CURRENT_GAME.activeUsers" 
                    :key = "num"
                >
                    <div class="set_game__players-name">
                        {{item.firstName}} {{item.lastName}}
                    </div>
                    <div class="set_game__players-options">
                        <div 
                            class="del-button basic-buttons"
                            @click="deleteUser(item.id)"
                        >
                            {{ $t("m_del") }}
                        </div>
                        <div
                            class="status" 
                            :style="{ backgroundImage: `url(${activeImg})` }"
                        ></div>                      
                    </div>
                </li>
                <li  
                    class="set_game__players-item" 
                    v-for ="(item, num) in GET_CURRENT_GAME.bannedUsers" 
                    :key = "'banned' + num"
                >
                    <div class="set_game__players-name">
                        {{item.firstName}} {{item.lastName}}
                    </div>
                    <div class="set_game__players-options">
                        <div 
                            class="del-button basic-buttons"
                            @click="deleteUser(item.id)"
                        >
                            {{ $t("m_del") }}
                        </div>
                        <div
                            class="status" 
                            :style="{ backgroundImage: `url(${banImg})` }"
                        ></div>                       
                    </div>
                </li>
                <li  
                    class="set_game__players-item" 
                    v-for ="(item, num) in GET_CURRENT_GAME.invitations" 
                    :key = "'invitations' + num"
                >
                    <div class="set_game__players-name invited">
                        {{item.email}} 
                    </div>
                    <div class="set_game__players-options">
                        <div 
                            class="del-button basic-buttons"
                           @click="canselInvitation(item.email)"
                        >
                            {{ $t("m_cancel") }}
                        </div>   
                        <div
                            class="status" 
                            :style="{ backgroundImage: `url(${outImg})` }"
                        ></div>                                            
                    </div>
                </li>
            </ul>
        </div>

        <div class="set_game-buttons">
            <div 
                class="confirm-button basic-buttons" 
                @click="editGame()"
            >
                {{ $t("m_save_settings") }}
            </div>
            <div 
                class="finish-button basic-buttons"
                @click="finishGame()"

            >
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

        data () {
            return {
                gameData: {
                    name: '',
                    description: '',
                    endDate: '',
                    startDate: ''
                },
                id: '',
                activeImg: active,
                banImg: ban,
                outImg: out,
                activeDecorColor: '#BCC0C9',
                avatarWindowVisible: false,
                finishGameVisible: false,
                modalVisible: false,
                redAlertName: false,
                redAlertDate: false,
                photoRedAlertActive: false,
                errors: [
					'm_wrong_email',
                    'm_player_locked',
                    'm_player_in_game'
				],
                errorMessage: '',
                email: ''
            }
        },

        components: {
            ModalWindow 
        },

        computed: {
            ...mapGetters([
                'GET_CURRENT_GAME_ID',   
                'GET_CURRENT_GAME',
                'GET_LICENSES'
            ])
		},

        mounted() {
            this.id = this.GET_CURRENT_GAME_ID;

            this.GET_GAME_BY_ID_FROM_SERVER(this.id)
                .then(resolve => {
                    this.gameData.name = resolve.name;
                    this.gameData.description = resolve.description;
                    this.gameData.endDate = resolve.endDate;
                    this.gameData.startDate = resolve.startDate;
                    this.SET_LICENSES(resolve.coach.licenses);
                })            
        },

        methods: {
            ...mapMutations([                
                'SET_LICENSES'
            ]),

            ...mapActions([ 
                'GET_GAME_BY_ID_FROM_SERVER',
                'SEND_GAME_LOGO',
                'INVITE_NEW_PLAYER',
                'DELETE_PLAYER',
                'CANSEL_INVITATION',
                'SEND_EDITED_GAME'
            ]),         

            sendPhoto (event) {
                let uploadedFile = event.target.files[0],
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop()

                if (size <= 2097152 && (fileFormat === 'jpg'|| fileFormat === 'png')) {
                    this.SEND_GAME_LOGO({
                        file: uploadedFile,
                        id: this.id
                    })

                    this.modalVisible = false	
                } else {
                    this.photoRedAlertActive = true;
                }
            },

            editGame () {
                if (this.gameData.name && this.gameData.startDate) {
                    this.SEND_EDITED_GAME ({
                        gameId: this.id,
                        data: this.gameData
                    })
                    .then(resolve => {
                        if (resolve.status === 202) {
                            this.redAlertName = false;
                            this.redAlertDate = false;
                            this.closeCH();
                        } else {
                            console.log(resolve.status);
                        }
                    })
                }

                if (!this.gameData.name && !this.gameData.startDate) {
                    this.redAlertName = true
                    this.redAlertDate = true
                } else if (!this.gameData.name) {
                    this.redAlertName = true
                    this.redAlertDate = false
                } else if (!this.gameData.startDate) {
                    this.redAlertName = false
                    this.redAlertDate = true
                }               
            },

            finishGame () {
                this.modalVisible = true;
                this.finishGameVisible = true;
            },
            
            confirmFinishGame () {
                //для завершения игры отправляем на бек дату конца игры сегодняшним днем
                let	date = new Date();
                let year = date.getFullYear()
                let month = date.getMonth()+1
                let day = date.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                this.gameData.endDate = [year, month, day].join('-')
                this.closeWindow();
                this.editGame();
            },
            
            setMinStartDate () {
                let	date = new Date();
                let year = date.getFullYear()
                let month = date.getMonth()+1
                let day = date.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                return [year, month, day+1].join('-')
            },

            changeDate () {
                let f = new Date(this.gameData.startDate)
                f.setDate(f.getDate() + 56)
                let year= f.getFullYear()
                let month= f.getMonth()+1
                let day = f.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                this.gameData.endDate = [year, month, day].join('-')
            },

            loadLogo () {
                this.modalVisible = true;
                this.avatarWindowVisible = true;
            },

            closeWindow () {
		  		this.modalVisible = false;
                this.avatarWindowVisible = false;
                this.finishGameVisible = false;         
            },

            closeCH () {
			    this.$emit('closeCH')
			},

            addPlayer () {
                this.errorMessage = '';
                let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

				if (reg.test(this.email)) {

					this.INVITE_NEW_PLAYER(
						{   
                            id: this.id,
							email: {email: this.email}
						}
					)
                    .then(resolve => {
                        switch (resolve.status) {
                            case 201:
                                this.GET_GAME_BY_ID_FROM_SERVER(this.id)
                                break;
                            case 406:
                                this.errorMessage = this.errors[1]
                                break;
                            case 400:
                                this.errorMessage = this.errors[2]
                                break;
                            default:
                                this.errorMessage = resolve.status
                                break;
                        }
					})
				} else {
					this.errorMessage = this.errors[0]
				}
            },

            deleteUser (userId) {
                this.DELETE_PLAYER({
                    gameId: this.id,
                    userId: userId
                })
                .then(resolve => {
                    if (resolve.status === 202) {
                        this.GET_GAME_BY_ID_FROM_SERVER(this.id)
                    }
                })
            },

            canselInvitation (email) {
                this.CANSEL_INVITATION({
                    gameId: this.id,
					email: {email: email}
                })
                .then(resolve => {
                    if (resolve.status === 204) {
                        this.GET_GAME_BY_ID_FROM_SERVER(this.id)
                    }
                })
            }

        }
    }
</script>
