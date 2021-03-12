<template>
    <div class="change-password-wrapper">
        <div 
            class="return-link"
            @click="closeChangePass()"
        >
            {{ $t('m_back') }}
        </div>
        
        <div class="change-password-container">
            <div class="change-password-header">
                {{ $t('m_change_password') }}
            </div>
            <div class="change-password-input">
                <div class="input-header">
                    {{ $t('m_enter_old_password') }}
                </div>
                <input 
                    type="password" 
                    maxlength="64" 
                    autocomplete="off" 
                    v-model="oldPassword"
                    placeholder="********"
                >
            </div>
            <div class="change-password-input">
                <div 
                    class="eye" 
                    @click="changeEye(true)"
                >
                    <img 
                        src="@/assets/img/icon_eye_close.png" 
                        v-show="this.eyePassVisible"
                    >
                    <img 
                        src="@/assets/img/icon_eye_open.png" 
                        v-show="!this.eyePassVisible"
                    >
                </div>
                <div class="input-header">
                    {{ $t('m_pick_password') }}
                </div>
                <input 
                    :type="this.inputTypePass" 
                    maxlength="64" 
                    autocomplete="off" 
                    v-model="newPassword"
                    placeholder="********"
                >
            </div>
            <div class="change-password-input">
                <div 
                    class="eye"
                    v-on:click="changeEye(false)"
                >
                    <img 
                        src="@/assets/img/icon_eye_close.png" 
                        v-show="this.eyePassСonfirmVisible"
                    >
                    <img 
                        src="@/assets/img/icon_eye_open.png" 
                        v-show="!this.eyePassСonfirmVisible"
                    >
                </div>
                <div class="input-header">
                    {{ $t('m_confirm_password') }}
                </div>
                <input 
                    :type="this.inputTypePassСonfirm"
                    maxlength="64" 
                    autocomplete="off" 
                    v-model="confirmedNewPassword"
                    placeholder="********"
                >
                <div class="input-basement">
                    <div
                    >
                        <div 
                            class="input-basement__left"
                            v-if="info_message"
                        >
                            <img src="@/assets/img/icon_attention.png">
                            {{ $t(info_message) }}
                        </div>
                    </div> 
                </div>
            </div>
            <div 
                class="change-password-button basic-buttons"
                @click="verificationPassword()"
            >
                {{ $t('m_save') }}
            </div>
        </div>

    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    
    export default {
        name: "ChangePass",

        data () {
            return {
                oldPassword: '',
                newPassword: '',
                confirmedNewPassword: '',
                info_message: '',
                eyePassVisible: true,
				eyePassСonfirmVisible: true,
				inputTypePass: 'password',
				inputTypePassСonfirm: 'password',
                errors: {
					err_format: 'm_incorrect_password_format', 
					err_confirm: 'm_error_confirm_password',
					err_emptyField: 'm_error_empty_field',
					good: 'm_password_changed'
				}
            }
        },

        methods: {
            ...mapActions([ 'SEND_NEW_PASSWORD' ]),

            closeChangePass () {
                this.$emit('closeChangePass');
            },

		  	changeEye (eye) {
		  		if (eye === true) {
		  			this.eyePassVisible = !this.eyePassVisible;
		  			this.inputTypePass = this.eyePassVisible ? 'password' : 'text'
		  		} else {
		  			this.eyePassСonfirmVisible = !this.eyePassСonfirmVisible;
		  			this.inputTypePassСonfirm = this.eyePassСonfirmVisible ? 'password' : 'text'
		  		}		  		
			},

            verificationPassword () {
	  			let passStatus = /(?=.*[0-9])(?=.*[.,:;?!*+%\-<>@[\]{}()/\\_$#])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\.,:;\?!\*\+%-<>@\[\]\{\}/\\_\$#]{8,}/g.test(this.newPassword);

				if (this.newPassword && this.confirmedNewPassword && this.oldPassword) {
					if (!passStatus) {
						this.info_message = this.errors.err_format
					} else {
						if (this.newPassword === this.confirmedNewPassword) {	
							this.info_message = this.errors.good
                            this.SEND_NEW_PASSWORD (
                                {
                                    newPassword: this.newPassword,
                                    oldPassword: this.oldPassword
                                }
                            )
						} else {
							this.info_message = this.errors.err_confirm
						}	
					}						
				} else {
					this.info_message = this.errors.err_emptyField
				}
	  		}     
        }

    }
</script>