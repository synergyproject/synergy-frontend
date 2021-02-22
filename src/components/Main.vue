<template>
    <div class="main-wrapper">
       
        <div class="primary-menu">
            <div class="primary-menu-container">

                <div class="menu-buttons-container">                          
                    <language-menu :languageMenuDesign='languageMenuDesign' />
                    <div class="logo" @click="goObjectives()">
                        <img src="@/assets/img/Logo_dark.png" >
                    </div>                         
                    <router-link
                        to="/logout" 
                        class="menu-button"
                    >
                        {{ $t('m_log_out') }}
                    </router-link>
                </div>

                <!-- отображение / загрузка аватара -->
                <div class="avatar">
                    <div v-if="GET_USER.photo">
                        <img 
                            :src="GET_USER.photo" 
                            class="avatar-img"
                        >
                    </div>
                    <img 
                        v-else
                        src="@/assets/img/icon_pencil.png" 
                        class="pencil" 
                        @click="loadAvatar()"
                    >
                    <div 
                        class="edit-avatar"
                        @click="loadAvatar()"
                    >
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                        >
                    </div>                             
                </div>

                <div class="personal-data">
                    <!-- Отображаем / редактируем Имя Фамилию -->
                    <div class="full-name-container">
                        <div class="full-name">
                            {{GET_USER.firstName}} {{GET_USER.lastName}}
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="loadFullName()"
                        >
                    </div>
                    <div class="email">
                        {{GET_USER.email}}
                    </div>

                    <!-- Отображаем / редактируем телеграм ник -->
                    <div class="username-block">
                        <div>
                            <img 
                                src="@/assets/img/telegram.png" 
                                class="username-block__icon"
                            >
                            <div 
                                class="username-block__content" 
                                v-show='!usernameTelegramInput'
                            >
                                {{GET_USER.telegram}}
                            </div>
                            <input 
                                type="text" 
                                placeholder="@telegram_username" 
                                maxlength="32" 
                                class="username-block__content" 
                                v-model="user.usernameTelegram" 
                                v-show='usernameTelegramInput'
                            >  
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="EditUsernameTelegram()"
                        >
                    </div>

                    <!-- Отображаем / редактируем телефон -->
                    <div class="username-block">
                        <div>
                            <img 
                                src="@/assets/img/phone.png" 
                                class="username-block__icon"
                            >
                            <div 
                                class="username-block__content" 
                                v-show='!phoneInput'
                            >
                                {{GET_USER.phone}}
                            </div>
                            <input 
                                type="text" 
                                placeholder="+380661234567" 
                                v-mask="'+38##########'" 
                                class="username-block__content" 
                                v-model="user.phone" 
                                v-show='phoneInput'
                            >  
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="EditPhone()"
                        >
                    </div>

                    <!-- Отображаем / редактируем дату рождения -->
                    <div class="username-block">
                        <div>
                            <img 
                                src="@/assets/img/calendar.png" 
                                class="username-block__icon"
                            >
                            <div 
                                class="username-block__content" 
                                v-show='!birthdayInput'
                            >
                                {{formattedDate()}}
                            </div>
                            <input 
                                type="date" 
                                class="username-block__content" 
                                v-model="user.birthday" 
                                v-show='birthdayInput'
                            >  
                        </div>
                        <img 
                            src="@/assets/img/icon_pencil.png" 
                            class="pencil" 
                            @click="EditBirthday()"
                        >
                    </div> 
                </div>
                
                <!-- кнопки управления -->
                <div class="setting-buttons-container">
                    <div 
                        class="setting-button basic-buttons"
                        @click="changePassword()"
                    >
                        {{ $t('m_change_password') }}
                    </div>
                    <div class="setting-button basic-buttons">
                        {{ $t('m_notifications_settings') }}
                    </div>
                    <!-- блок отображается только для администратора -->
                    <div
                        class="setting-button admin-button basic-buttons"
                        v-if="checkRoles('ADMIN')"
                        @click="openAdmin()"
                    >
                        {{ $t('m_administrator_account') }}
                    </div>
                </div>
                <!-- блок отображается только для тренера -->
                <div 
                    class="license-counter"
                    v-if="checkRoles('COACH')"
                >
                    {{ $t('m_licenses_available') }} {{GET_LICENSES}}
                </div>



                <div class="help-container">
                    <div 
                        class="help"
                        v-if="helpVisible"
                        @click="openHelpForm()"
                    >
                        ?
                        <div class="contact-support">
                            {{ $t('m_contact_support') }}
                        </div>
                    </div>
                    <div 
                        class="help-form"
                        v-else
                    >
                        <div class="help-info">
                            {{ $t('m_message_to_support') }}
                        </div>
                        <textarea
                            maxlength="1000"
                            v-model="helpRequest"                       
                        ></textarea>
                        <div class="help-buttons-container">
                            <div 
                                class="basic-buttons help-button"
                                @click="sendHelpRequest()"
                            >
                                {{ $t('m_send') }}
                            </div>
                            <div 
                                class="basic-buttons help-button"
                                @click="closeHelpForm()"
                            >
                                {{ $t('m_cancel') }}
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <div class="blur" v-if="GET_PRIMARY_BLUR"></div>
        </div>

        <div class="secondary"> 
            <modal v-show="this.modalVisible" @close='closeModal'>
                <template v-slot:modal-content>
                    <avatar 
                        v-show="avatarVisible" 
                        @closeAvatar='closeModal'
                    >
                    </avatar>
                    <fullname 
                        v-if="fullNameVisible" 
                        @closeFullName='closeModal'
                    >
                    </fullname>
                    <profile 
                        v-show="profileVisible" 
                        @closeProfile='closeProfile'
                    >
                    </profile>
                </template>
            </modal> 

            <coach 
                v-if="coachVisible" 
            ></coach>

            <admin 
                v-if="adminVisible"
                @closeAdmin='closeAdmin()'
            ></admin>

            <change-pass 
                class="change-pass"
                v-if="changePassVisisble"
                @closeChangePass='closeChangePassword()'
            ></change-pass>
        </div>

    </div>
</template>


<script>
    import Modal from '@/components/modal/Modal';
    import LanguageMenu from '@/components/secondary/LanguageMenu';
    import Avatar from '@/components/modal/Avatar';
    import Fullname from '@/components/modal/Fullname';
    import Profile from '@/components/modal/Profile';
    import Coach from '@/components/secondary/Coach';
    import Games from '@/components/secondary/Games';
    import Admin from '@/components/secondary/Admin';
    import ChangePass from '@/components/secondary/ChangePass';
    import icon_pencil from '@/assets/img/icon_pencil.png';
    import telegram from '@/assets/img/telegram.png';
    import phone from '@/assets/img/phone.png';
    import calendar from '@/assets/img/calendar.png';
    import { mapGetters, mapActions, mapMutations } from 'vuex';

    export default {
        name: "Main",

        data () {
            return {
                modalVisible: false,
                avatarVisible: false,
                fullNameVisible: false,
                profileVisible: false,
                adminVisible: false,
                changePassVisisble: false,
                coachVisible: true,
                helpVisible: true,
                usernameTelegramInput: false,
                phoneInput: false,
                birthdayInput: false,
                user: {
                    usernameTelegram: '',
                    phone: '',
                    birthday: '',
                    roles: []
                },
                currentLanguage: 'eng',
                languageMenuDesign: 1,
                helpRequest: ''
            }
        },

        components: {
            Admin,
            Modal,
            Avatar,
            Fullname,
            Profile,
            Coach,
            Games,
            LanguageMenu,
            ChangePass
        },

        mounted () {
            this.USERS_FROM_SERVER()
                //при построении страницы запрашиваем данные о пользователе
                .then(resolve => {
                    this.user.usernameTelegram = this.GET_USER.telegram;
                    this.user.phone = this.GET_USER.phone;
                    this.user.birthday = this.GET_USER.dateOfBirth;
                    this.user.roles = this.GET_USER.roles;

                    // при первом логине пользователь видит модальное окно "заполнить профиль"
                    if (!this.GET_USER.firstName || !this.GET_USER.lastName || !this.GET_USER.phone) {
                        this.SET_PRIMARY_BLUR(true);
                        this.modalVisible = true;
                        this.profileVisible = true;
                    } else {
                        //поля телеграм, дата рождения могут оставаться пустыми но тогда они видны как input
                        //  - намекаем пользователю что надо заполнить
                        if (!this.GET_USER.telegram) {
                            this.usernameTelegramInput = true
                        }
                        if (!this.GET_USER.dateOfBirth) {
                            this.birthdayInput = true
                        }
                        if (!this.GET_USER.phone) {
                            this.phoneInput = true
                        }
                    }
                })
        },

        computed: {
            ...mapGetters([ 
                'GET_USER', 
                'GET_PRIMARY_BLUR',
                'GET_LICENSES' 
            ])           
		},  

        methods: {
            ...mapMutations([ 'SET_PRIMARY_BLUR' ]),
            ...mapActions([ 
                'USERS_FROM_SERVER', 
                'SEND_USER',
                'SEND_QUESTION' 
            ]),

            openAdmin () {
                this.coachVisible =  false;
                this.changePassVisisble =  false;
                this.adminVisible = true;
                this.closeModal();
            },

            closeAdmin () {
                this.adminVisible = false;
                this.changePassVisisble =  false;
                this.coachVisible =  true;               
                this.closeModal();
            },

            changePassword () {
                this.changePassVisisble = true;
                this.coachVisible =  false;
                this.adminVisible = false;
                this.closeModal();
            },

            closeChangePassword () {
                this.coachVisible =  true;
                this.changePassVisisble = false;
                this.adminVisible = false;
                this.closeModal();
            },

            closeModal () {
		  		this.modalVisible = false;
                this.avatarVisible = false;
                this.fullNameVisible = false;	  		
            },

            closeProfile () {
                this.SET_PRIMARY_BLUR(false);
                this.profileVisible = false;
                this.closeModal();
                if (!this.GET_USER.telegram) {
                    this.usernameTelegramInput = true
                }
                if (!this.GET_USER.dateOfBirth) {
                    this.birthdayInput = true
                }
                if (!this.GET_USER.phone) {
                    this.phoneInput = true
                }
            },

            loadAvatar () {
                this.closeModal();
                this.modalVisible = true;
                this.avatarVisible = true;
            },

            loadFullName () {
                this.closeModal();
                this.modalVisible = true;
                this.fullNameVisible = true;
            },

            EditUsernameTelegram () {
                //при клике на карандаш превращаем div в input и наоборот
                this.usernameTelegramInput = !this.usernameTelegramInput;
                //проверяем что ник состоит от 5 до 32 "символов цифр  _" и начинается с @ 
                let usernameTelegramCheck = /^[@][\w]{5,32}$/.test(this.user.usernameTelegram);
                //проверяем если был активен input, соответствует требованиям, его поле не пустое 
                // и потом кликнули каранлаш то меняем значение в store и на сервере.  
                if (!this.usernameTelegramInput && this.user.usernameTelegram && usernameTelegramCheck) {
                    this.SEND_USER({telegram: this.user.usernameTelegram})
                } else if (!this.user.telegram || !usernameTelegramCheck) {
                    //если пользователь не заполнил поле или оно не соответствует требованиям оно остается как input
                    this.usernameTelegramInput = true;
                }
            },

            //такие же деиствия для обработки поля телефона и даты
            EditPhone () {
                this.phoneInput = !this.phoneInput;
                let phoneCheck =  this.user.phone.length === 13;
                if (!this.phoneInput && phoneCheck) {
                    this.SEND_USER({phone: this.user.phone})
                } else {
                    this.phoneInput = true;
                }
            },

            EditBirthday () {
                this.birthdayInput = !this.birthdayInput;
                if (!this.birthdayInput && this.user.birthday) {
                    this.SEND_USER({dateOfBirth: this.user.birthday})
                } else if (!this.user.birthday) {
                    this.birthdayInput = true;
                }
            },

            //отфoрматируем вид даты для отображения пользователю
            formattedDate () {
                let date = this.GET_USER.dateOfBirth;
                return date && date.split('-').reverse().join('.');
            },
            
            goObjectives () {
                this.$router.push({ path: '/calendar'})
            },

            //в зависимости от роли юзера отображается блок "количество лицензий" / "кабинет администратора"
            checkRoles (role) {
                return this.user.roles.includes(role)
            },

            openHelpForm () {
                this.helpVisible = false
            },

            closeHelpForm () {
                this.helpVisible = true
            },

            sendHelpRequest () {
                console.log(this.helpRequest);
                if (this.helpRequest) {
                    this.SEND_QUESTION({
                        text: this.helpRequest
                    })
                }
                this.helpVisible = true
            }
        }
    }
</script>
