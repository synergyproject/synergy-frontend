<template>
	<div 
		class="login-page" 
		@keyup.enter="verificationPassword()"
	>
		<div class="greeting">
			Добро пожаловать, 
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
							Придумайте пароль
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
							Повторите пароль
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
									{{info_message}}
								</span>
							</div>
						</div>
					</div>
					<div 
						class="save-button basic-buttons" 
						@click="verificationPassword()"
					>
						Сохранить
					</div>
				</div>
				<div class="password-help">
					<img 
						src="@/assets/img/help_circle.png" 
						class="question-icon"
					>
					<div class="help-content">
						<div class="help-content__text">
							Длина пароля должна быть <b>не менее 8</b><br>
							и <b>не более 64</b> символов.<br> 
							<br>
							Пароль должен состоять из букв латинского алфавита <b>(A-z)</b>,<br> 
							арабских цифр <b>(0-9)</b><br> 
							и специальных символов:
							<b>( . , : ; ? ! * + % - < > @ [ ] { } ( ) / \ _ {} $ # )</b>.	
							<br><br>
							Обязательно должна быть одна буква верхнего регистра <b>А-Z</b>, одна буква
							нижнего регистра <b>а-z</b>, специальный символ и арабская цифра.
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

	export default {
		name: 'login',
		data () {
			return {
				pass: '',
				passСonfirm: '',
				info_message:'',
				errors: {
					err_format: 'неверный формат пароля', 
					err_confirm: 'пароль не совпадает',
					err_emptyField: 'Заполните все поля',
					good: 'Все ок'
				},
				modalVisible: false,
				eyePassVisible: true,
				eyePassСonfirmVisible: true,
				inputTypePass: 'password',
				inputTypePassСonfirm: 'password'
			}
		},
		components: {
	        Modal: Modal
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
		mounted() {
			console.log(this.GET_AUTHORIZATION_TOKEN, 'GET_AUTHORIZATION_TOKEN');
			console.log(this.GET_INVITATION_PARAMETERS, 'GET_INVITATION_PARAMETERS');
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

