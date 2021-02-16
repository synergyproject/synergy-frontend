<template>
    <div class="create-game">
        <h2 class="create-game__header">{{ $t("m_create_game_h2") }}</h2>
        <div class="create-game__content">
            <div class="avatar-window">
                <div>
                    <div class="avatar-requirements">
                        <img 
                            :src="game.logoUrl" 
                            class="avatar-img" 
                            v-if="game.logoUrl"
                        > 
                        <div 
                            class="decor decor-left-top" 
                            v-if="!game.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-left-bottom" 
                            v-if="!game.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-top" 
                            v-if="!game.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>
                        <div 
                            class="decor decor-right-bottom" 
                            v-if="!game.logoUrl"
                            :style="{ borderColor: activeDecorColor }"
                        ></div>    
                        <div class="avatar-requirements-info">
                            <!-- Рекомендуемый размер фото<br>
                            не менее 220 пикселей в ширину<br>
                            и 220 пикселей в высоту.<br>
                            <br>
                            Загружается быстрее всего<br>
                            в виде файла sRGB .JPG<br> 
                            Допустимый размер файла не более 2 мегабайт.<br>
                            <br>
                            Допустимые форматы: jpg, png. -->
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
                        v-model="game.name"
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
                        v-model="game.description"
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
                        v-model="game.startDate"
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
                        v-model="game.endDate"
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
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: 'CreateGame',
        data () {
            return {
                activeDecorColor: '#BCC0C9',
                game: {
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
                    licensesAvailable: '',
                    players: [],
                    // players: [
                    //     {
                    //         dateOfBirth: "2020-01-31",
                    //         email: "morgotianin@gmail.com",
                    //         firstName: "Иван",
                    //         gender: "MALE",
                    //         id: '13',
                    //         lastName: "Горячих",
                    //         phone: "+380663137126",
                    //         photo: '',
                    //         roles: ["COACH", "PLAYER"],
                    //         status: "ACTIVE",
                    //         telegram: "@telegrammmm"
                    //     }
                    // ]
                },
                redAlertName: false,
                redAlertDate: false,
                photoRedAlertActive: false
            }
        },

        methods: {
            ...mapMutations(['ADD_LIST_OF_GAMES']),

            loadPhoto (event) {
                let uploadedFile = event.target.files[0];
                
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop()
                if (size <= 2097152 && (fileFormat === 'jpg'|| fileFormat === 'png')) {
                    this.game.logoUrl = URL.createObjectURL(event.target.files[0]);
                } else {
                    this.photoRedAlertActive = true;
                }
            },

            createGame(){
                if (this.game.name && this.game.startDate) {
                    this.game.id =  Date.now()
                    this.ADD_LIST_OF_GAMES(this.game);
                    this.$emit('closeGame')
                    this.redAlertName = false;
                    this.redAlertDate = false;

                } 
                if(!this.game.name&!this.game.startDate){
                    this.redAlertName = true
                    this.redAlertDate = true
                } else if(!this.game.name){
                    this.redAlertName = true
                    this.redAlertDate = false
                } else if(!this.game.startDate){
                    this.redAlertName = false
                    this.redAlertDate = true
                }                
            },

            changeDate(){
                let f = new Date(this.game.startDate)
                f.setDate(f.getDate() + 56)
                let year= f.getFullYear()
                let month= f.getMonth()+1
                let day = f.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;
                this.game.endDate = [year, month, day].join('-')
            }
        }
    }
</script>
