<template>
	<div class="authorization__wrapper" :style="{backgroundImage:`url('${loginImage}')`}">
		<language-selector />
		<div class="main-logo">
			<img src="@/assets/img/Logo_big.png" >
		</div>
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
								placeholder="youremail@gmail.com"
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
								placeholder="g0y9d8c"
							>
							<div class="input-basement">
								<div>
									<div 
										class="input-basement__left"
										v-if="info_message"
									>
									<img src="@/assets/img/icon_attention.png">
									<span>
										{{ $t(info_message) }}
									</span>
								</div>
								</div>
								<div 
									class="input-basement__right"
									@click="forgotPassword()"
								>
									{{ $t('m_forgot_password') }}
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
				</div>
			</div>
		</div>

		<modal v-show="this.modalVisible" v-if="this.modalVisible" @close='closeModal'>
			<template v-slot:modal-content>
				<pass-recovery @close='closeModal'></pass-recovery>	
			</template>
		</modal> 
	</div>
</template>

<script>
	import axios from 'axios';
	import ahtung_circle from '@/assets/img/ahtung_circle.png';
	import icon_eye_close from '@/assets/img/icon_eye_close.png';
	import icon_eye_open from '@/assets/img/icon_eye_open.png';
	import LanguageSelector from './secondary/LanguageSelector.vue';
	import bg from '@/assets/img/login_background.png';
	import Modal from '@/components/modal/Modal';
	import PassRecovery from '@/components/modal/PassRecovery';

	export default {
		name: 'authorization',

		components: {
			LanguageSelector,
			PassRecovery,
			Modal
		},

		data () {
			return {
				email: '',
				pass: '',
				info_message:'',
				errors: {
					err_confirm: 'm_error_confirm',
					err_emptyField: 'm_error_empty_field',
					err_email: 'm_wrong_email'
				},
				eyePassVisible: true,
				modalVisible: false,
				inputTypePass: 'password',
				loginImage: bg,
			}
		},

		mounted () {
			if(this.$store.state.auth.token)
			this.$router.push({ path: '/main'})
		},

	  	methods: {
			closeModal () {
		  		this.modalVisible = false  		
            },

			authorization: function () {
				this.info_message = '';
                let lowerEmail = this.email.toLowerCase();
                let checkedEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerEmail);

				if (checkedEmail && this.pass) {
					this.send()
				} else if (!this.pass) {
					this.info_message = this.errors.err_emptyField
				} else if (!checkedEmail) {
					this.info_message = this.errors.err_email
				}
			},

		  	changeEye: function (eye) {
		  		this.eyePassVisible = !this.eyePassVisible;
		  		this.inputTypePass = this.eyePassVisible ? 'password' : 'text'	  		
			},

			send(){
				this.info_message = '';
				const data = JSON.stringify({
					username: this.email,
					password: this.pass
				});
				
				axios.post('http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/login', data, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					const token = response.headers.authorization.split(' ')[1]
					this.$store.dispatch('SET_TOKEN', token)
				})
				.then(resolve => {
					if(this.$store.state.auth.token)
						this.$router.push({ path: '/main'})
				})
				.catch(error => {
					this.info_message = this.errors.err_confirm
				});
			},
			
			forgotPassword () {
				this.modalVisible = true
			}
		}  			
	}
</script>