<template>
    <div class="recovery-block-main">
        <div class="email-info">
            {{ $t('m_enter_your_last_name') }}
        </div>
        <input 
            type="email" 
            maxlength="64"
        >
        <div class="recovery-password-button basic-buttons">
            {{ $t('m_restore_password') }}
        </div>
    </div>
</template>

<script>
	export default {
		name: 'PassRecovery',

		data () {
			return {
				
			}
		},

		components: {
	       
	    },			
        
	  	methods: {
 	  			  	
		}  			
	}
</script>