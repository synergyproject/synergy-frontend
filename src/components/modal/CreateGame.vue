<template>
    <div class="create-game">
        <h2 class="create-game__header">{{ $t("m_create_game_h2") }}</h2>
        <div class="create-game__content">
            <div class="avatar-window">
                <div>
                    <div class="avatar-requirements">
                        <img 
                            :src="logoUrl" 
                            class="avatar-img" 
                            v-if="logoUrl"
                        > 
                        <div 
                            class="decor decor-left-top" 
                            v-if="!logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-left-bottom" 
                            v-if="!logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-top" 
                            v-if="!logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-bottom" 
                            v-if="!logoUrl"
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
            <div class="create-game__info">
                <div class="create-game__container">
                    <div class="create-game__container-head">
                        {{ $t("m_game_name") }}
                    </div>
                    <input 
                        type="text" 
                        maxlength="200" 
                        v-model="gameData.name"
						placeholder="Введите название"
                    >
                    <div  class="create-game__container-star" :class="{ redAlert: redAlertName }">
                        *
                    </div>
                    <div class="create-game__container-error" :class="{ redAlert: redAlertName }">
                        <img src="@/assets/img/icon_attention.png">
                        <span>
                            {{ $t("m_error_game_name") }}
                        </span>
                    </div>
                </div>

                <div class="create-game__container">
                    <div class="create-game__container-head">
                        {{ $t("m_game_description") }}
                    </div>
                    <textarea
                        maxlength="1000" 
                        v-model="gameData.description"
                    >
                    </textarea>
                </div>
                <div class="create-game__container">
                    <div class="create-game__container-head">
                        {{ $t("m_game_startDate") }}
                    </div>
                    <input 
                        type="date" 
                        class="start-date" 
                        v-model="gameData.startDate"
                        @change="changeDate"
                    >

                    <div 
                        class="create-game__container-star" 
                        :class="{ redAlert: redAlertDate }"
                    >
                        *
                    </div>
                    <div class="create-game__container-error" :class="{ redAlert: redAlertDate}">
                        <img src="@/assets/img/icon_attention.png">
                        <span>
                            {{ $t("m_error_game_startDate") }}
                        </span>
                    </div>
                </div>
                <div class="create-game__container">
                    <div class="create-game__container-head">
                        {{ $t("m_game_endDate") }}
                    </div>
                    <input 
                        type="date" 
                        class="end-date" 
                        v-model="gameData.endDate"
                        disabled
                    >
                    
                    <div class="create-game__container-after">
                        {{ $t("m_8_weeks") }}
                    </div>
                </div>

            </div> 
        </div> 
        <div class="confirm-button basic-buttons" @click="createGame">
            {{ $t("m_create_game_btn") }}
        </div>
    </div>

</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'CreateGame',
        
        data () {
            return {
                activeDecorColor: '#BCC0C9',
                gameData: {
                    name: '',
                    description: '',
                    endDate: '',
                    startDate: ''
                },
                logoUrl: '',
                logoFile:'',
                redAlertName: false,
                redAlertDate: false,
                photoRedAlertActive: false
            }
        },

        methods: {
            ...mapActions([ 
                'SEND_GAME_LOGO',
                'CREATE_NEW_GAME',
                'GAMES_FROM_SERVER'
            ]),

            loadPhoto (event) {
                let uploadedFile = event.target.files[0],
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop()

                if (size <= 2097152 && (fileFormat === 'jpg'|| fileFormat === 'png')) {
                    this.logoUrl = URL.createObjectURL(event.target.files[0]);
                    this.logoFile = uploadedFile;
                } else {
                    this.photoRedAlertActive = true;
                }
            },

            createGame(){
                if (this.gameData.name && this.gameData.startDate) {
                    this.$emit('closeGame')
                    this.redAlertName = false;
                    this.redAlertDate = false;

                    this.CREATE_NEW_GAME (this.gameData)
                        .then(resolve => {                       
                            if (this.logoFile && resolve.status === 201) {
                                this.SEND_GAME_LOGO({
                                    file: this.logoFile,
                                    id: resolve.data
                                })
                                .then(resolve => { 
                                    this.GAMES_FROM_SERVER()
                                })    
                            } else {
                                this.GAMES_FROM_SERVER()
                            }    
                        })

                }

                if (!this.gameData.name && !this.game.startDate) {
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

            changeDate(){
                let f = new Date(this.gameData.startDate)
                f.setDate(f.getDate() + 56)
                let year= f.getFullYear()
                let month= f.getMonth()+1
                let day = f.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                this.gameData.endDate = [year, month, day].join('-')
            }
        }
    }
</script>
