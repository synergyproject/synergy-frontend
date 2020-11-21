<template>
    <div class="main-page">
        <div class="primary">
            <div class="primary-menu">
                <div class="primary-menu-container">
                    <div class="menu-buttons-container">
                        <div class="menu-button basic-buttons"></div>
                        <div class="menu-button basic-buttons">Выйти</div>
                    </div>
                    <div class="avatar">
                        <div v-if="GET_AVATAR">
                            <img :src="GET_AVATAR" class="avatar-img">
                            <img src="../assets/img/icon_pencil.png" class="pencil edit_avatar" v-on:click="loadAvatar()"> 
                        </div>                        
                        <img src="../assets/img/icon_pencil.png" class="pencil" v-on:click="loadAvatar()" v-else>    
                    </div>
                    <div class="personal-data">
                        <div class="full-name-container">
                            <div class="full-name">Прокофий Кузнецов</div>
                            <img src="../assets/img/icon_pencil.png" class="pencil">
                        </div>
                        <div class="email">Prokofey_Kuznetsov@gmail.com</div>
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="username username-block__content">@Prokofey_Kuznetsov</div>  
                            </div>
                            <img src="../assets/img/icon_pencil.png" class="pencil">
                        </div>
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="phone username-block__content">+380 123 45 67</div>  
                            </div>
                            <img src="../assets/img/icon_pencil.png" class="pencil">
                        </div>
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="date username-block__content">01.12.2001</div>  
                            </div>
                            <img src="../assets/img/icon_pencil.png" class="pencil">
                        </div> 
                    </div>
                    <div class="setting-buttons-container">
                        <div class="setting-button basic-buttons">Изменить пароль</div>
                        <div class="setting-button basic-buttons">Настроить уведомления</div>
                        <div class="setting-button admin-button basic-buttons">Кабинет Администратора</div>
                    </div>
                </div>
            </div>
            <div class="devider"></div>
        </div>


        <div class="secondary">
            <modal v-show="this.modalVisible" @close='closeModal'>
			    <template v-slot:modal-content>
                    <avatar v-show="avatarVisible" @closeAvatar='closeModal'></avatar>
 			    </template>
		    </modal>            
            
            <coach v-show="coachVisible"></coach>

        </div>
    </div>
</template>

<script>
    import sendAjax from '../utils/ajax';
    import modal from '../components/modal/modal';
    import icon_pencil from '../assets/img/icon_pencil.png';
    import avatar from '../components/modal/avatar';
    import coach from '../components/secondary/coach';
    import games from '../components/secondary/games';
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "Main",
        data () {
            return {
                modalVisible: false,
                avatarVisible: false,
                coachVisible: false,
                gamesVisible: false,
                coachVisible: true
            }
        },
        components: {
            modal: modal,
            avatar: avatar,
            coach: coach,
            games: games
        },
        mounted () {
            //при построении страницы запрашиваем сервер через action данные о пользователе, играх и тд, и помещаем их в store
            console.log('test - рендеринг HTML и установка реактивных зависимостей');
            this.FETCH_AVATAR();
        },
        computed: {
			...mapGetters(['GET_AVATAR'])
		},    
        methods: {
            ...mapActions(['FETCH_AVATAR']),

            loadAvatar: function() {
                this.modalVisible = true;
                this.avatarVisible = true;
            },
            closeModal: function () {
		  		this.modalVisible = false;
                this.avatarVisible = false;	  		
            }  
        }
    }
</script>
