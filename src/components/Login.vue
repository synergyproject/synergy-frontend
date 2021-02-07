<template>
	<div class="login__wrapper">
		<language-selector />
		<div 
			class="login-page" 
			@keyup.enter="verificationPassword()"
		>
			<div class="greeting">
				{{ $t('m_welcome') }}
				{{ GET_INVITATION_PARAMETERS.email }}
			</div>		
			<div class="login-main-block">
				<div class="validation-form">
					<div class="login-controls">
						<div class="validation-block">
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
								v-model="pass"
							>
						</div>
						<div class="validation-block">
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
								v-model="passСonfirm"
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
							@click="verificationPassword()"
						>
							{{ $t('m_save') }}
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
	import { mapMutations, mapGetters, mapActions } from 'vuex';
	import Modal from '@/components/modal/Modal';
	import help_circle from '@/assets/img/help_circle.png';
	import ahtung_circle from '@/assets/img/ahtung_circle.png';
	import icon_eye_close from '@/assets/img/icon_eye_close.png';
	import icon_eye_open from '@/assets/img/icon_eye_open.png';
	import LanguageSelector from './secondary/LanguageSelector.vue';

	export default {
		name: 'login',

		components: {
			Modal: Modal,
			LanguageSelector
		},

		data () {
			return {
				pass: '',
				passСonfirm: '',
				info_message: '',
				errors: {
					err_format: 'm_incorrect_password_format', 
					err_confirm: 'm_error_confirm_password',
					err_emptyField: 'm_error_empty_field',
					good: 'm_good'
				},
				modalVisible: false,
				eyePassVisible: true,
				eyePassСonfirmVisible: true,
				inputTypePass: 'password',
				inputTypePassСonfirm: 'password'
			}
		},

		computed: {
			...mapGetters([
				'GET_INVITATION_PARAMETERS',
				'GET_AUTHORIZATION_TOKEN',
				'GET_STATUS_CODE_FROM_SERVER'
			])
		},

		created() {
			const urlQueryParam = window.location.search.split('=')[1];
			this.SEND_INVITATION_TOKEN(urlQueryParam);
		},
		
	  	methods: {
			...mapActions(['SEND_INVITATION_TOKEN', 'SEND_DATA_TO_CREATE_ACCOUNT']),

	  		verificationPassword: function () {
	  			let passStatus = /(?=.*[0-9])(?=.*[.,:;?!*+%\-<>@[\]{}()/\\_$#])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\.,:;\?!\*\+%-<>@\[\]\{\}/\\_\$#]{8,}/g.test(this.pass);
					// (?=.*[0-9]) - строка содержит хотя бы одно число;
					// (?=.*[.,:;?!*+%\-<>@[\]{}()/\\_$#]) - строка содержит хотя бы один спецсимвол из списка .,:;?!*+%-<>@[]()/\_{}$#;
					// (?=.*[a-z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
					// (?=.*[A-Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
					// [0-9a-zA-Z!@#$%^&*]{8,} - строка состоит не менее, чем из 8 вышеупомянутых символов.

				if (this.pass && this.passСonfirm) {
					if (!passStatus) {
						this.info_message = this.errors.err_format
					} else {
						if (this.pass === this.passСonfirm) {	
							this.info_message = this.errors.good
							this.sendDataToCreateAccount().then(() => this.goToPageHandler());
						} else {
							this.info_message = this.errors.err_confirm
						}	
					}						
				} else {
					this.info_message = this.errors.err_emptyField
				}
	  		},

			sendDataToCreateAccount: function () {
				const dataObject = {
					email: this.GET_INVITATION_PARAMETERS.email,
					gameId: this.GET_INVITATION_PARAMETERS.gameId,
					password: this.pass
				}
				return this.SEND_DATA_TO_CREATE_ACCOUNT(dataObject);
			},

			closeModal: function () {
		  		this.modalVisible = false;	  		
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

			goToPageHandler() {
				if(this.GET_STATUS_CODE_FROM_SERVER === 201) {
					this.$router.push({path: '/'});
				}
			}
		}
	}
</script>

