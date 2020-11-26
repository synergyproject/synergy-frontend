<template>
    <div class="main-page">
        <div class="primary">
            <div class="primary-menu">
                <div class="primary-menu-container">
                    <div class="menu-buttons-container">
                        <div class="menu-button basic-buttons"></div>
                        <router-link to="/logout" class="menu-button basic-buttons">Выйти</router-link>
                    </div>
                    <!-- отображение / загрузка аватара -->
                    <div class="avatar">
                        <div v-if="GET_AVATAR">
                            <img :src="GET_AVATAR" class="avatar-img">
                            <img src="@/assets/img/icon_pencil.png" class="pencil edit_avatar" v-on:click="loadAvatar()"> 
                        </div>                        
                        <img src="@/assets/img/icon_pencil.png" class="pencil" v-on:click="loadAvatar()" v-else>    
                    </div>
                    <div class="personal-data">
                        <!-- Отображаем / редактируем Имя Фамилию -->
                        <div class="full-name-container">
                            <div class="full-name">{{GET_USER.firstName}} {{GET_USER.surname}}</div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" v-on:click="loadFullName()">
                        </div>
                        <div class="email">{{GET_USER.email}}</div>
                        <!-- Отображаем / редактируем телеграм ник -->
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="username-block__content" v-show='!usernameTelegramInput'>{{GET_USER.usernameTelegram}}</div>
                                <input type="text" placeholder="@telegram_username" maxlength="32" class="username-block__content" v-model="user.usernameTelegram" v-show='usernameTelegramInput'>  
                            </div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" v-on:click="EditUsernameTelegram()">
                        </div>
                        <!-- Отображаем / редактируем телефон -->
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="username-block__content" v-show='!phoneInput'>{{GET_USER.phone}}</div>
                                <input type="text" placeholder="+38 (066) 123-45-67" v-mask="'+38 (###) ###-##-##'" class="username-block__content" v-model="user.phone" v-show='phoneInput'>  
                            </div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" v-on:click="EditPhone()">
                        </div>
                        <!-- Отображаем / редактируем дату рождения -->
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="username-block__content" v-show='!birthdayInput'>{{formattedDate()}}</div>
                                <input type="date" class="username-block__content" v-model="user.birthday" v-show='birthdayInput'>  
                            </div>
                            <img src="@/assets/img/icon_pencil.png" class="pencil" v-on:click="EditBirthday()">
                        </div> 
                    </div>
                    <!-- кнопки управления -->
                    <div class="setting-buttons-container">
                        <div class="setting-button basic-buttons">Изменить пароль</div>
                        <div class="setting-button basic-buttons">Настроить уведомления</div>
                        <div class="setting-button admin-button basic-buttons">Кабинет Администратора</div>
                    </div>
                </div>
            </div>
            <div class="devider"></div>
        </div>


        <div class="secondary">
            <modal v-show="this.modalVisible" @close='closeModal'>
			    <template v-slot:modal-content>
                    <avatar v-show="avatarVisible" @closeAvatar='closeModal'></avatar>
                    <fullname v-show="fullNameVisible" @closeFullName='closeModal'></fullname>
 			    </template>
		    </modal>            
            
            <coach v-show="coachVisible"></coach>

        </div>
    </div>
</template>

<script>
    import modal from '@/components/modal/modal';
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import avatar from '@/components/modal/avatar';
    import fullname from '@/components/modal/edit_fullname';
    import coach from '@/components/secondary/coach';
    import games from '@/components/secondary/games';
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "Main",
        data () {
            return {
                modalVisible: false,
                avatarVisible: false,
                fullNameVisible: false,
                coachVisible: false,
                gamesVisible: false,
                coachVisible: true,
                usernameTelegramInput: false,
                phoneInput: false,
                birthdayInput: false,
                user: {
                    usernameTelegram: '',
                    phone: '',
                    birthday: ''
                }    
            }
        },
        components: {
            modal: modal,
            avatar: avatar,
            fullname: fullname,
            coach: coach,
            games: games
        },
        mounted () {
            //при построении страницы запрашиваем сервер через action данные о пользователе, играх и тд, и помещаем их в store
            this.user.usernameTelegram = this.GET_USER.usernameTelegram;
            this.user.phone = this.GET_USER.phone;
            this.user.birthday = this.GET_USER.birthday;
            this.FETCH_AVATAR();
            //при первом логине пользователь автоматом получает имя 'ИМЯ' пока не изменит его. Считаем что это поле обязательно к заполнению
            if (!this.GET_USER.firstName) {
                this.SET_USER({firstName: 'Имя'})
            }
            if (!this.GET_USER.surname) {
                this.SET_USER({surname: 'Фамилия'})
            }
            //поля телеграмник, телефон, дата рождения могут оставаться пустыми но тогда они видны как input - намекаем пользователю что надо заполнить
            if (!this.GET_USER.usernameTelegram) {
                this.usernameTelegramInput = true
            }
             if (!this.GET_USER.phone) {
                this.phoneInput = true;

            }
             if (!this.GET_USER.birthday) {
                this.birthdayInput = true
            }
        },
        computed: {
            ...mapGetters(['GET_AVATAR']),
            ...mapGetters(['GET_USER'])            
		},    
        methods: {
            ...mapActions(['FETCH_AVATAR']),
            ...mapMutations(['SET_USER']),

            closeModal: function () {
		  		this.modalVisible = false;
                this.avatarVisible = false;
                this.fullNameVisible = false;	  		
            },
            loadAvatar: function() {
                this.closeModal();
                this.modalVisible = true;
                this.avatarVisible = true;
            },
            loadFullName: function() {
                this.closeModal();
                this.modalVisible = true;
                this.fullNameVisible = true;
            },
            EditUsernameTelegram: function () {
                //при клике на карандаш превращаем div в input и наоборот
                this.usernameTelegramInput = !this.usernameTelegramInput;
                //проверяем что ник состоит от 5 до 32 "символов цифр  _" и начинается с @ 
                let usernameTelegramCheck = /^[@][\w]{5,32}$/.test(this.user.usernameTelegram);
                //проверяем если был активен input, соответствует требованиям, его поле не пустое и потом кликнули каранлаш то меняем значение в store и на сервере.  
                if (!this.usernameTelegramInput && this.user.usernameTelegram && usernameTelegramCheck) {
                    this.SET_USER({usernameTelegram: this.user.usernameTelegram})
                } else if (!this.user.usernameTelegram || !usernameTelegramCheck) {
                    //если пользователь не заполнил поле или оно не соответствует требованиям оно остается как input
                    this.usernameTelegramInput = true;
                }
            },
            //такие же деиствия для обработки поля телефона и даты
            EditPhone: function () {
                this.phoneInput = !this.phoneInput; 
                if (!this.phoneInput && this.user.phone) {
                    this.SET_USER({phone: this.user.phone})
                } else if (!this.user.phone) {
                    this.phoneInput = true;
                }
            },
            EditBirthday: function () {
                this.birthdayInput = !this.birthdayInput;
                if (!this.birthdayInput && this.user.birthday) {
                    this.SET_USER({birthday: this.user.birthday})
                } else if (!this.user.birthday) {
                    this.birthdayInput = true;
                }
            },
            //отфарматируем вид даты для отображения пользователю
            formattedDate: function () {
                let date = this.GET_USER.birthday;
                return date && date.split('-').reverse().join('.');
            }    
        }
    }
</script>
