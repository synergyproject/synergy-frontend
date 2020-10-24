<template>
		<!-- верстка для теста -->
		<div class="main">
			<div>
				1. Длина пароля должна быть не менее 8 и не более 64 символов. <br>
				2. Пароль должен состоять из букв латинского алфавита (A-z), арабских цифр (0-9) и специальных символов: ( . , : ; ? ! * + % - < > @ [ ] { } ( ) / \ _ {} $ # ).<br>
				3. Обязательно должна быть одна буква верхнего регистра: А, одна буква нижнего регистра: а, специальный символ и арабская цифра.<br>
			</div>
			<input type="text" class="pass_block pass" maxlength="64" placeholder="Введите пароль" v-model="pass">
			<input type="text" class="pass_block pass_confirm" maxlength="64" placeholder="Подтвердите пароль" v-model="passСonfirm">
			<button v-on:click="verificationPassword()">проверить</button>
			<div class="info">{{info_message}}</div>

			
 			<hr width="100%">
 			<button v-on:click="testModal()">Тест модального окна</button>
 			<!-- модальное окно располагаем в любом месте док-та -->
			<modal :visible="this.modalVisible" @close='closeModal'>
		  		<template v-slot:modal-content>
					<div class="test_modal">
						<!-- тут распологаем любой нужный нам контент -->
						Привет! Это тестовый вызов модального окна.
					</div>
		  		</template>
		  	</modal>

		</div>
</template>

<script>
	import sendAjax from '../utils/ajax';
	import modal from '../components/modal';

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
					good: 'Все ок --> дальше редирект на кабинет пользователя'
				},
				modalVisible: false
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
								this.sendPassword();	//тут мы отправляем пароль на бэк
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
		  	testModal: function () {
		  		this.modalVisible = true;	  
		  	} 	  			  	
		}  			
	}
</script>

<style scoped>
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.pass_block {
		width: 600px;
		height: 30px;
		margin: 20px;
	}
	.info {
		margin-top: 30px;
		color: red;
		font-size: 25px;
	}
	.test_modal {
		display: flex;
		justify-content: center;
		align-items: center;
		background: white;
		color: black;
		width: 350px;
		height: 450px;		
	}
</style>