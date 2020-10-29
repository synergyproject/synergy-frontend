<template>
	<div class="login-page" v-on:keyup.enter="verificationPassword()">
		<div class="greeting">
			Добро пожаловать, hillel@gmail.com!
		</div>		
		<div class="main-block">
			<div class="validation-form">
				<div class="login-controls">
					<div class="validation-block">
						<div class="eye" v-on:click="changeEye(true)">
							<img src="../assets/img/login_img/icon_eye_close.png" v-show="this.eyePassVisible">
							<img src="../assets/img/login_img/icon_eye_open.png" v-show="!this.eyePassVisible">
						</div>
						<div class="input-header">Придумайте пароль</div>
						<input v-bind:type="this.inputTypePass" maxlength="64" autocomplete="off" v-model="pass">
						<div class="input-basement"></div>
					</div>
					<div class="validation-block">
						<div class="eye" v-on:click="changeEye(false)">
							<img src="../assets/img/login_img/icon_eye_close.png" v-show="this.eyePassСonfirmVisible">
							<img src="../assets/img/login_img/icon_eye_open.png" v-show="!this.eyePassСonfirmVisible">
						</div>
						<div class="input-header">Повторите пароль</div>
						<input v-bind:type="this.inputTypePassСonfirm" maxlength="64" autocomplete="off" v-model="passСonfirm">
						<div class="input-basement">
							<div class="input-basement__left">
								<img src="../assets/img/login_img/ahtung_circle.png">
								<span>{{info_message}}</span>
							</div>
							<div class="input-basement__right" v-on:click="forgotPassword()">Забыли пароль?</div>
						</div>
					</div>
					<div class="save-button" v-on:click="verificationPassword()">
						Сохранить
					</div>
				</div>
				<div class="password-help">
					<img src="../assets/img/login_img/help_circle.png" class="question-icon">
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

		<modal :visible="this.modalVisible" @close='closeModal'>
			<template v-slot:modal-content>
				<div class="test_modal display">
					Привет! Получается это тестовый вызов модального окна.<br>
					Насправдi ейчас происходит вызов формы восстановления пароля ))
				</div>
			</template>
		</modal>	
	</div>
</template>

<script>
	import sendAjax from '../utils/ajax';
	import modal from '../components/modal';
	import help_circle from '../assets/img/login_img/help_circle.png';
	import ahtung_circle from '../assets/img/login_img/ahtung_circle.png';
	import icon_eye_close from '../assets/img/login_img/icon_eye_close.png';
	import icon_eye_open from '../assets/img/login_img/icon_eye_open.png';

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
							if (this.pass == this.passСonfirm) {	
								this.info_message = this.errors.good
								//this.sendPassword();	тут мы отправляем пароль на бэк
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
		  	forgotPassword: function () {
		  		this.modalVisible = true;	  
		  	},
		  	changeEye: function (eye) {
		  		if (eye == true) {
		  			this.eyePassVisible = !this.eyePassVisible;
		  			this.inputTypePass = this.eyePassVisible ? 'password' : 'text'
		  		} else {
		  			this.eyePassСonfirmVisible = !this.eyePassСonfirmVisible
		  			this.inputTypePassСonfirm = this.eyePassСonfirmVisible ? 'password' : 'text'
		  		}
		  		
		  	} 	  			  	
		}  			
	}
</script>

<style scoped lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

	$fontf: 'Roboto', sans-serif;
	%display-center{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login-page{
		margin: 0;
		padding: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		*{
			font-family: $fontf;
		}
		.greeting{
				height: 23px;
				white-space: nowrap;
				font-size: 20px;
				line-height: 23px;
				margin-top: 217px;
				margin-bottom: 36px;
			}		
		.main-block{
			// width: 532px;
			width: 342px;
			height: 319px;
			*{
				display: flex;
			}
			.validation-form{			
				height: 242px;
				.login-controls{
					min-width: 342px;
					flex-direction: column;
					.validation-block{
						height: 76px;
						margin-bottom: 16px;
						flex-direction: column;
						position: relative;
						font-size: 12px;
						line-height: 14px;					
						.eye{
							width: 24px;
							height: 24px;
							position: absolute;
							right: 8px;
							top: 27px;
							img{
								position: absolute;
							}
						}
						.input-header{
							height: 14px;
							margin-bottom: 4px;
						}
						.input-basement{
							display: flex;
							justify-content: space-between;
							margin-top: 4px;
							.input-basement__left{
								font-style: italic;
							}
							.input-basement__right{
								color: #777777;
								cursor: pointer;
							}
							img{
								height: 14px;
								width: 14px;
								margin-right: 4px;
							}
						}
						input{
							height: 40px;
							background: #E4E4E4;
							outline: none;
							border: none;
							padding-left: 12px;
							padding-right: 40px;
						}
					}
					.save-button{
						@extend %display-center;
						margin-top: 18px;
						height: 40px;
						background-color: #545454;
						border-radius: 100px;
						font-weight: 500;
						font-size: 14px;
						line-height: 16px;
						color: #FFFFFF;
						user-select: none;  
					}
				}
				.password-help{
					margin-top: 21px; 
					.question-icon{
						width: 20px;
						height: 20px;
						margin-left: 24px;
						margin-right: 10px;
						&:hover ~ .help-content{
							display: flex;
						}					
					}
					.help-content{
						width: 136px;
						height: 221px;
						background: #C4C4C4;
						border-radius: 8px;
						display: none;
						.help-content__text{
							width: 114px;
							height: 204px;
							font-style: normal;
							font-weight: normal;
							font-size: 9px;
							line-height: 11px;
							color: #636363;
							margin: 6px 11px 11px 11px;
							display: inline;
							b{
								display: inline;
							}
						}
					}
				}
			}
		}
		.test_modal {
			background: white;
			color: black;
			width: 450px;
			height: 450px;
			padding: 10px;
			@extend %display-center;		
		}
	}
</style>