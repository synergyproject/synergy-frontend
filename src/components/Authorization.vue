<template>
	<div class="authorization__wrapper">
		<language-selector />
		<div
			 class="authorization-page"
			 @keyup.enter="authorization()"
		>
			<div class="greeting">
				{{ $t('m_welcome') }}
			</div>
			<div class="authorization-main-block">
				<div class="validation-form">
					<div class="authorization-controls">
						<div class="validation-block">
							<div class="input-header">
								{{ $t('m_enter_login') }}
							</div>
							<input
								 type="text"
								 maxlength="64"
								 autocomplete="off"
								 v-model="email"
							>
						</div>
						<div class="validation-block">
							<div
								 class="eye"
								 @click="changeEye(false)"
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
								{{ $t('m_enter_password') }}
							</div>
							<input
								 :type="this.inputTypePass"
								 maxlength="64"
								 autocomplete="off"
								 v-model="pass"
							>
							<div class="input-basement">
								<div class="input-basement__left">
									<img src="@/assets/img/ahtung_circle.png">
									<span>
										{{ $t(info_message) }}
									</span>
								</div>
							</div>
						</div>
						<div
							 class="save-button basic-buttons"
							 @click="authorization()"
						>
							{{ $t('m_enter') }}
						</div>
					</div>
					<div class="password-help">
						<img
							 src="@/assets/img/help_circle.png"
							 class="question-icon"
						>
						<div class="help-content">
							<div class="help-content__text">
								{{ $t('m_help_content_text[0]') }} <b>{{ $t('m_help_content_text[1]') }}</b><br>
								{{ $t('m_help_content_text[2]') }} <b>{{ $t('m_help_content_text[3]') }}</b> {{ $t('m_help_content_text[4]') }}<br>
								<br>
								{{ $t('m_help_content_text[5]') }} <b>(A-z)</b>,<br>
								{{ $t('m_help_content_text[6]') }} <b>(0-9)</b><br>
								{{ $t('m_help_content_text[7]') }}
								<b>( . , : ; ? ! * + % - < > @ [ ] { } ( ) / \ _ {} $ # )</b>.
								<br><br>
								{{ $t('m_help_content_text[8]') }} <b>А-Z</b>, {{ $t('m_help_content_text[9]') }}
								{{ $t('m_help_content_text[10]') }} <b>а-z</b>, {{ $t('m_help_content_text[11]') }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import help_circle from '@/assets/img/help_circle.png';
	import ahtung_circle from '@/assets/img/ahtung_circle.png';
	import icon_eye_close from '@/assets/img/icon_eye_close.png';
	import icon_eye_open from '@/assets/img/icon_eye_open.png';
	import LanguageSelector from './secondary/LanguageSelector.vue'

	export default {
		name: 'authorization',
		components: {
			LanguageSelector
		},
		data () {
			return {
				email: '',
				pass: '',
				info_message:'',
				errors: {
					err_confirm: 'm_error_confirm',
					err_emptyField: 'm_error_empty_field',
					good: 'm_good' //test
				},
				eyePassVisible: true,
				inputTypePass: 'password',
			}
		},
		mounted () {
			if(this.$store.state.auth.token)
			this.$router.push({ path: '/main'})
		},			
	  	methods: {
			authorization: function () {
				if (this.email && this.pass) {
					this.info_message = this.errors.good
					this.send()
				} else {
					this.info_message = this.errors.err_emptyField
				}
			},
		  	changeEye: function (eye) {
		  		this.eyePassVisible = !this.eyePassVisible;
		  		this.inputTypePass = this.eyePassVisible ? 'password' : 'text'	  		
			},
			send(){
				this.info_message = ''
				const data = JSON.stringify({
					username: this.email,
					password: this.pass
				});
				axios.post('http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/login', data)
				.then(response => {
					const token = response.headers.authorization.split(' ')[1]
					this.$store.dispatch('SET_TOKEN', token)
					this.info_message = this.errors.good
				})
				.then(resolve => {
					if(this.$store.state.auth.token)
						this.$router.push({ path: '/main'})
				})
				.catch(error => {
					this.info_message = error.message
					console.dir(error);
				});
			}  	
		}  			
	}
</script>