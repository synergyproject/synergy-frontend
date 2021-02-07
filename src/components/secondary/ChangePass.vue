<template>
    <div class="change-password-wrapper">
        <div 
            class="return-link"
            @click="closeChangePass()"
        >
            Back
        </div>
        
        <div class="change-password-container">
            <div class="change-password-header">
                Изменение пароля
            </div>
            <div class="change-password-input">
                <div class="input-header">
                    Введите старый пароль
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
                    Придумайте пароль
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
                    Повторите пароль
                </div>
                <input 
                    :type="this.inputTypePassСonfirm"
                    maxlength="64" 
                    autocomplete="off" 
                    v-model="confirmedNewPassword"
                    placeholder="********"
                >
                <div class="input-basement">
                    <div class="input-basement__left">
                        <img src="@/assets/img/icon_attention.png">
                        {{ $t(info_message) }}
                    </div>
                    <div class="input-basement__right">
                        Забыли пароль?
                    </div>    
                </div>
            </div>
            <div 
                class="change-password-button basic-buttons"
                @click="verificationPassword()"
            >
                Сохранить
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    
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
					good: 'm_good'
				}
            }
        },

        methods: {
            closeChangePass () {
                this.$emit('closeChangePass');
            },

		  	changeEye: function (eye) {
		  		if (eye === true) {
		  			this.eyePassVisible = !this.eyePassVisible;
		  			this.inputTypePass = this.eyePassVisible ? 'password' : 'text'
		  		} else {
		  			this.eyePassСonfirmVisible = !this.eyePassСonfirmVisible;
		  			this.inputTypePassСonfirm = this.eyePassСonfirmVisible ? 'password' : 'text'
		  		}		  		
			},

            verificationPassword: function () {
	  			let passStatus = /(?=.*[0-9])(?=.*[.,:;?!*+%\-<>@[\]{}()/\\_$#])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\.,:;\?!\*\+%-<>@\[\]\{\}/\\_\$#]{8,}/g.test(this.newPassword);

				if (this.newPassword && this.confirmedNewPassword && this.oldPassword) {
					if (!passStatus) {
						this.info_message = this.errors.err_format
					} else {
						if (this.newPassword === this.confirmedNewPassword) {	
							this.info_message = this.errors.good
                            //отправка на бэк
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