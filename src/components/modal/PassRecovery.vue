<template>
    <div class="recovery-block-main">
        <div class="email-info">
            {{ $t('m_email_adress') }}
        </div>
        <input 
            type="text"
            maxlength="64"
            autocomplete="off"
            v-model="email"
        >
        <div 
            class="alert-message"
            v-if="errorMessage"
        >
            <img src="@/assets/img/icon_attention.png">
            {{$t(errorMessage)}}
        </div>
        <div 
            class="recovery-password-button basic-buttons"
            @click="recoveryPassword()"
        >
            {{ $t('m_restore_password') }}
        </div>
    </div>
</template>

<script>
	export default {
		name: 'PassRecovery',

		data () {
			return {
				email: '',
                errorMessage: '',
                errors: [
					'm_wrong_email'
				]
			}
		},
        
	  	methods: {
            recoveryPassword () {
                this.errorMessage = '';
                let lowerEmail = this.email.toLowerCase();
                let checkedEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerEmail);

				if (checkedEmail) {
                    this.$emit('close');
                } else {
					this.errorMessage = this.errors[0]
				}    
            }        
		}  			
	}
</script>