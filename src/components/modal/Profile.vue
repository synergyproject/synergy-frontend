<template>
    <div 
        class="profile-window" 
        @keyup.enter="changeProfile"
    >
        <div class="header">
            {{ $t('m_fill_the_profile') }}
        </div>
        <div class="profile-wrapper">
            <input 
                id="loadAvatarProfile" 
                type="file" 
                @change="loadAvatar"
            >
            <label for="loadAvatarProfile">
                <div class="avatar basic-buttons">
                    <img 
                        :src="avatarUrl" 
                        class="avatar-img" 
                        v-if="avatarUrl"
                    > 
                    <div 
                        class="avatar-description" 
                        v-else
                    >   
                        <div>
                            {{ $t('m_choose_photo') }}
                        </div>
                        <div>
                            {{ $t('m_profile') }}
                        </div>
                        <div 
                            class="avatar-requirements" 
                            :class="{ redAlert: avatarRedAlertActive }"
                        >
                            {{ $t('m_photo_info') }}
                        </div>
                    </div>         
                </div>
            </label>    
            <div class="profile-elements">
                <div class="profile-container">
                    <div class="description">
                        {{ $t('m_name') }}
                    </div>
                    <input 
                        type="text" 
                        maxlength="64" 
                        v-model="user.firstName"
                    >
                    <div 
                        class="star" 
                        :class="{ redAlert: redAlertActive }"
                    >
                        *
                    </div>
                </div>
                <div class="profile-container">
                    <div class="description">
                        {{ $t('m_last_name') }}
                    </div>
                    <input 
                        type="text" 
                        maxlength="64" 
                        v-model="user.surname"
                    >
                    <div 
                        class="star" 
                        :class="{ redAlert: redAlertActive }"
                    >
                        *
                    </div>
                </div>
                <div class="profile-container">
                    <div class="description">
                        {{ $t('m_date_of_birth') }}
                    </div>
                    <input 
                        type="date" 
                        class="date" 
                        v-model="user.birthday"
                    >
                </div>
                <div class="profile-container">
                    <div class="description">
                        {{ $t('m_phone') }}
                    </div>
                    <input 
                        type="text" 
                        placeholder="+380501234567" 
                        v-mask="'+38##########'" 
                        v-model="user.phone"
                    >
                    <div 
                        class="star" 
                        :class="{ redAlert: redAlertActive }"
                    >
                        *
                    </div>
                </div>
                <div class="profile-container">
                    <div class="description">
                        {{ $t('m_telegram') }}
                    </div>
                    <input 
                        type="text" 
                        placeholder="@telegram_username" 
                        maxlength="32" 
                        v-model="user.usernameTelegram"
                    >
                </div>
                <div class="note">
                    * {{ $t('m_required_fields') }}
                </div>    
            </div>
        </div>
        <div 
            class="confirm-button basic-buttons" 
            @click="changeProfile"
        >
            {{ $t('m_continue') }}
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Profile',
        data () {
            return {
                user: {
                    firstName: '', 
                    surname: '', 
                    usernameTelegram: '', 
                    phone: '', 
                    birthday: '', 
                    avatar: null
                },
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