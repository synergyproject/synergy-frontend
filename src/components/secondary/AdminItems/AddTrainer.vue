<template>
    <div class="add-trainer-wrapper">

        <div 
			class="add-trainer"
			v-if="addTrainerVisible"
		>
			<div class="header">
				{{ $t('m_add_business_coach') }}
			</div>
			<div class="content">
				<input 
					type="text"
					:placeholder="$t('m_enter_mail')"
					maxlength="100"
                	v-model="email"
				>
				<div 
					class="alert-message"
					v-if="errorMessage"
				>
					<img src="@/assets/img/icon_attention.png">
					{{$t(errorMessage)}}
				</div>
			</div>
			<div 
				class="add-trainer-button basic-buttons"
				@click="checkEmail"
			>
				{{ $t('m_send_invitation') }}
			</div>
		</div>

		<div 
			class="email-sent"
			v-if="emailSentVisible"
		>
			<div class="email-sent-header">
				{{$t('m_invitation_letter')}}
			</div>
			<img 
				src="@/assets/img/check-mark.png"
				@click="closeModal()"
			>
		</div>

		<div 
			class="player-to-trainer"
			v-if="playerToTrainerVisible"
		>
			<div class="player-to-trainer-header">
				{{ $t('m_player_already_registered') }}
			</div>
			<div class="player-to-trainer-buttons">
				<div 
					class="basic-buttons"
					@click="closeModal()"
				>
					{{$t('m_cancel')}}
				</div>
				<div 
					class="basic-buttons"
					@click="addNewCoach()"
				>
					{{$t('m_transfer')}}
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
        name: 'AddTrainer',
        
		data () {
			return {
				email: '',
				errorMessage: '',
				errors: [
					'm_wrong_email',
					'm_trainer_exists',
					'm_trainer_blocked'
				],
				addTrainerVisible: true,
				emailSentVisible: false,
				playerToTrainerVisible: false,
				coachId: ''
			}
        },
        			
	  	methods: {
			...mapActions([ 'ADD_NEW_COACH', 'INVITE_COACH']),

            checkEmail() {
				this.errorMessage = '';
                let lowerEmail = this.email.toLowerCase();
                let checkedEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerEmail);

				if (checkedEmail) {
					this.INVITE_COACH(
						{
							email: this.email
						}
					)
				} else {
					this.errorMessage = this.errors[0]
				}
			},

			sendInvite(resolve) {
				switch (resolve.status) {
					//такой тренер существует
					case 409:
						this.errorMessage = this.errors[1]
						break;
					//такой тренер заблокирован	
					case 406:
						this.errorMessage = this.errors[2]
						break;
					//это емейл игрока	
					case 206:
						this.coachId = resolve.data.id;
						this.addTrainerVisible = false;
						this.emailSentVisible = false;
						this.playerToTrainerVisible = true;
						break;
					//приглашение удачно отправлено	
					case 201:
						this.addTrainerVisible = false;
						this.playerToTrainerVisible = false;
						this.emailSentVisible = true;
						break;
					default: 
						console.log('default error: ', status);	
				}
			},
			
			addNewCoach () {
				this.ADD_NEW_COACH(
					{
						id: this.coachId,
						role: {
							role: "COACH"
						}
					}
				)
				this.closeModal()
			},

			closeModal() {
				this.$emit('closeModal');
			}
        }      			
	}
</script>