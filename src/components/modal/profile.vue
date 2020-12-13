<template>
    <div class="profile-window" @keyup.enter="changeProfile">
        <div class="header">Заполните профиль</div>
        <div class="profile-wrapper">
            <input id="loadAvatarProfile" type="file" @change="loadAvatar">
            <label for="loadAvatarProfile">
                <div class="avatar basic-buttons">
                    <img :src="avatarUrl" class="avatar-img" v-if="avatarUrl"> 
                    <div class="avatar-description" v-else>   
                        <div>Выбрать фото</div>
                        <div>профиля</div>
                        <div class="avatar-requirements" :class="{ redAlert: avatarRedAlertActive }">
                            Рекомендуемый размер фото не менее 220 пикселей в ширину и 220 пикселей в высоту. 
                            Загружается быстрее всего в виде файла sRGB .JPG Допустимый размер файла не более 2 мегабайт.
                            Допустимые форматы: jpg, png.
                        </div>
                    </div>         
                </div>
            </label>    
            <div class="profile-elements">
                <div class="profile-container">
                    <div class="description">Имя</div>
                    <input type="text" maxlength="64" v-model="user.firstName">
                    <div class="star" :class="{ redAlert: redAlertActive }">*</div>
                </div>
                <div class="profile-container">
                    <div class="description">Фамилия</div>
                    <input type="text" maxlength="64" v-model="user.surname">
                    <div class="star" :class="{ redAlert: redAlertActive }">*</div>
                </div>
                <div class="profile-container">
                    <div class="description">Дата рождения</div>
                    <input type="date" class="date" v-model="user.birthday">
                </div>
                <div class="profile-container">
                    <div class="description">Телефон</div>
                    <input type="text" placeholder="+380661234567" v-mask="'+38##########'" v-model="user.phone">
                    <div class="star" :class="{ redAlert: redAlertActive }">*</div>
                </div>
                <div class="profile-container">
                    <div class="description">Телеграм</div>
                    <input type="text" placeholder="@telegram_username" maxlength="32" v-model="user.usernameTelegram">
                </div>
                <div class="note">* Поля обязательные для заполнения</div>    
            </div>
        </div>
        <div class="confirm-button basic-buttons" @click="changeProfile">Продолжить</div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Profile',
        data () {
            return {
                user: {firstName: '', surname: '', usernameTelegram: '', phone: '', birthday: '', avatar: null},
                avatarUrl: '',
                redAlertActive: false,
                avatarRedAlertActive: false
            }
        },
        components: {

        },
        methods: {
            ...mapMutations(['SET_USER']),
            ...mapMutations(['SET_AVATAR']),

            changeProfile() {
                let phoneCheck = this.user.phone.length === 13;
                if (phoneCheck && this.user.firstName && this.user.surname) {
                    console.log(this.user)
                    this.SET_USER(this.user);
                    this.SET_AVATAR(this.user.avatar);
                    this.$emit('closeProfile');
                } else {
                    this.redAlertActive = true;
                    console.log(this.redAlertActive)
                }
            },
            loadAvatar (event) {
                let uploadedFile = event.target.files[0],
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop()
                if (size <= 2097152 && (fileFormat === 'jpg'|| fileFormat === 'png')) {
                    this.user.avatar = event.target.files[0];
                    this.avatarUrl = URL.createObjectURL(this.user.avatar);
                } else {
                    this.avatarRedAlertActive = true;
                }
            }            
        }
    }
</script>