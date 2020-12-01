<template>
    <div class="line">
        <div class="line-main">  
        LIne

        </div>
        <div class="line-info">  
        LIne

        </div>
    </div>
</template>

<script>
    // import modal from '@/components/modal/modal';
    // import icon_pencil from '@/assets/img/icon_pencil.png';
    // import avatar from '@/components/modal/avatar';
    // import fullname from '@/components/modal/edit_fullname';
    // import { mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        name: "lines",
        data () {
            return {
            }
        },
    }

    // export default {
    //     name: "Main",
    //     data () {
    //         return {
    //             modalVisible: false,
    //             avatarVisible: false,
    //             fullNameVisible: false,
    //             coachVisible: false,
    //             gamesVisible: false,
    //             coachVisible: true,
    //             usernameTelegramInput: false,
    //             phoneInput: false,
    //             birthdayInput: false,
    //             user: {
    //                 usernameTelegram: '',
    //                 phone: '',
    //                 birthday: ''
    //             }    
    //         }
    //     },
    //     components: {
    //         modal: modal,
    //         avatar: avatar,
    //         fullname: fullname,
    //         coach: coach,
    //         games: games
    //     },
    //     mounted () {
    //         //при построении страницы запрашиваем сервер через action данные о пользователе, играх и тд, и помещаем их в store
    //         this.user.usernameTelegram = this.GET_USER.usernameTelegram;
    //         this.user.phone = this.GET_USER.phone;
    //         this.user.birthday = this.GET_USER.birthday;
    //         this.FETCH_AVATAR();
    //         //при первом логине пользователь автоматом получает имя 'ИМЯ' пока не изменит его. Считаем что это поле обязательно к заполнению
    //         if (!this.GET_USER.firstName) {
    //             this.SET_USER({firstName: 'Имя'})
    //         }
    //         if (!this.GET_USER.surname) {
    //             this.SET_USER({surname: 'Фамилия'})
    //         }
    //         //поля телеграмник, телефон, дата рождения могут оставаться пустыми но тогда они видны как input - намекаем пользователю что надо заполнить
    //         if (!this.GET_USER.usernameTelegram) {
    //             this.usernameTelegramInput = true
    //         }
    //          if (!this.GET_USER.phone) {
    //             this.phoneInput = true;

    //         }
    //          if (!this.GET_USER.birthday) {
    //             this.birthdayInput = true
    //         }
    //     },
    //     computed: {
    //         ...mapGetters(['GET_AVATAR']),
    //         ...mapGetters(['GET_USER'])            
	// 	},    
    //     methods: {
    //         ...mapActions(['FETCH_AVATAR']),
    //         ...mapMutations(['SET_USER']),

    //         closeModal: function () {
	// 	  		this.modalVisible = false;
    //             this.avatarVisible = false;
    //             this.fullNameVisible = false;	  		
    //         },
    //         loadAvatar: function() {
    //             this.closeModal();
    //             this.modalVisible = true;
    //             this.avatarVisible = true;
    //         },
    //         loadFullName: function() {
    //             this.closeModal();
    //             this.modalVisible = true;
    //             this.fullNameVisible = true;
    //         },
    //         EditUsernameTelegram: function () {
    //             //при клике на карандаш превращаем div в input и наоборот
    //             this.usernameTelegramInput = !this.usernameTelegramInput;
    //             //проверяем что ник состоит от 5 до 32 "символов цифр  _" и начинается с @ 
    //             let usernameTelegramCheck = /^[@][\w]{5,32}$/.test(this.user.usernameTelegram);
    //             //проверяем если был активен input, соответствует требованиям, его поле не пустое и потом кликнули каранлаш то меняем значение в store и на сервере.  
    //             if (!this.usernameTelegramInput && this.user.usernameTelegram && usernameTelegramCheck) {
    //                 this.SET_USER({usernameTelegram: this.user.usernameTelegram})
    //             } else if (!this.user.usernameTelegram || !usernameTelegramCheck) {
    //                 //если пользователь не заполнил поле или оно не соответствует требованиям оно остается как input
    //                 this.usernameTelegramInput = true;
    //             }
    //         },
    //         //такие же деиствия для обработки поля телефона и даты
    //         EditPhone: function () {
    //             this.phoneInput = !this.phoneInput; 
    //             if (!this.phoneInput && this.user.phone) {
    //                 this.SET_USER({phone: this.user.phone})
    //             } else if (!this.user.phone) {
    //                 this.phoneInput = true;
    //             }
    //         },
    //         EditBirthday: function () {
    //             this.birthdayInput = !this.birthdayInput;
    //             if (!this.birthdayInput && this.user.birthday) {
    //                 this.SET_USER({birthday: this.user.birthday})
    //             } else if (!this.user.birthday) {
    //                 this.birthdayInput = true;
    //             }
    //         },
    //         //отфарматируем вид даты для отображения пользователю
    //         formattedDate: function () {
    //             let date = this.GET_USER.birthday;
    //             return date && date.split('-').reverse().join('.');
    //         }    
    //     }
    // }
</script>
