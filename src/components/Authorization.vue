<template>
	<div class="authorization-page" v-on:keyup.enter="authorization()">
		<div class="greeting">
			Добро пожаловать!
		</div>		
		<div class="authorization-main-block">
			<div class="validation-form">
				<div class="authorization-controls">
					<div class="validation-block">
						<div class="input-header">Введите логин</div>
						<input type="text" maxlength="64" autocomplete="off" v-model="email">
					</div>
					<div class="validation-block">
						<div class="eye" v-on:click="changeEye(false)">
							<img src="@/assets/img/icon_eye_close.png" v-show="this.eyePassVisible">
							<img src="@/assets/img/icon_eye_open.png" v-show="!this.eyePassVisible">
						</div>
						<div class="input-header">Введите пароль</div>
						<input v-bind:type="this.inputTypePass" maxlength="64" autocomplete="off" v-model="pass">
						<div class="input-basement">
							<div class="input-basement__left">
								<img src="@/assets/img/ahtung_circle.png">
								<span>{{info_message}}</span>
							</div>
						</div>
					</div>
					<div class="save-button basic-buttons" v-on:click="authorization()">
						Войти
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
	</div>    
</template>

<script>
import axios from 'axios';
import help_circle from '@/assets/img/help_circle.png';
import ahtung_circle from '@/assets/img/ahtung_circle.png';
import icon_eye_close from '@/assets/img/icon_eye_close.png';
import icon_eye_open from '@/assets/img/icon_eye_open.png';

	export default {
		name: 'authorization',
		data () {
			return {
                email: '',
				pass: '',
				info_message:'',
				errors: {
                    err_confirm: 'Неправильный адрес электронной почты или пароль',
                    err_emptyField: 'Заполните все поля',
                    good: 'Все ок' //test
				},
				eyePassVisible: true,
				inputTypePass: 'password',
			}
		},
		components: {
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
			async send(){
				this.info_message = ''
				const data = JSON.stringify({
					username: this.email,
					password: this.pass
				});
				await axios.post('http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/login', data)
				.then(response=>{
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