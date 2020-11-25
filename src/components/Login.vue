<template>
	<div class="login-page" v-on:keyup.enter="verificationPassword()">
		<div class="greeting">
			Добро пожаловать, hillel@gmail.com!
		</div>		
		<div class="login-main-block">
			<div class="validation-form">
				<div class="login-controls">
					<div class="validation-block">
						<div class="eye" v-on:click="changeEye(true)">
							<img src="@/assets/img/icon_eye_close.png" v-show="this.eyePassVisible">
							<img src="@/assets/img/icon_eye_open.png" v-show="!this.eyePassVisible">
						</div>
						<div class="input-header">Придумайте пароль</div>
						<input :type="this.inputTypePass" maxlength="64" autocomplete="off" v-model="pass">
					</div>
					<div class="validation-block">
						<div class="eye" v-on:click="changeEye(false)">
							<img src="@/assets/img/icon_eye_close.png" v-show="this.eyePassСonfirmVisible">
							<img src="@/assets/img/icon_eye_open.png" v-show="!this.eyePassСonfirmVisible">
						</div>
						<div class="input-header">Повторите пароль</div>
						<input :type="this.inputTypePassСonfirm" maxlength="64" autocomplete="off" v-model="passСonfirm">
						<div class="input-basement">
							<div class="input-basement__left">
								<img src="@/assets/img/ahtung_circle.png">
								<span>{{info_message}}</span>
							</div>
						</div>
					</div>
					<div class="save-button basic-buttons" v-on:click="verificationPassword()">
						Сохранить
					</div>
				</div>
				<div class="password-help">
					<img src="@/assets/img/help_circle.png" class="question-icon">
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


	<!--                   код для теста - потом перенесем                -->
		<div class="test-buttons">
			<button class="test basic-buttons" v-on:click="passwordRecovery()">
			Тест формы восстановления пароля
			</button>
			<button class="test basic-buttons" v-on:click="goMain()">
				Перейти на /main
			</button>
			<button class="test basic-buttons" v-on:click="goAuthorization()">
				Перейти на /authorization
			</button>
		</div>

		<modal :visible="this.modalVisible" @close='closeModal'>
			<template v-slot:modal-content>
				<div class="recovery-block-main">
					<div class="email-info">Адрес электронной почты</div>
					<input type="email" maxlength="64">
					<div class="recovery-password-button basic-buttons">Востановить пароль</div>
				</div>
			</template>
		</modal>	
	</div>
</template>

<script>
	import sendAjax from '@/utils/ajax';
	import modal from '@/components/modal/modal';
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
	        modal: modal
	    },			
	  	methods: {
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
								//this.sendPassword();	тут мы отправляем пароль на бэк
								this.$router.push ({path:'/main'}) 
							} else {
								this.info_message = this.errors.err_confirm
							}	
						}						
					} else {
						this.info_message = this.errors.err_emptyField
					}
	  		},
			sendPassword: function () {
		  		let PasswordJson = JSON.stringify(this.pass);

		  		sendAjax('https://адрес_сервера.com/', 'post', PasswordJson)
					.then((response) => {
						//сервер получил пароль, переходим дальше - кабинет пользователя?
				    },
				    (response) => {
				    	//здесь выполняем действия при неудачном запросе к серверу   
				    })
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
			  

		  	// тестовые методы - перенесем
		  	passwordRecovery: function () {
				this.modalVisible = true;  	  
			  },
			goMain: function () {
				this.$router.push ({path:'/main'}) 
			},
			goAuthorization: function () {
				this.$router.push ({path:'/authorization'}) 
			}  	  			  	
		}  			
	}
</script>

