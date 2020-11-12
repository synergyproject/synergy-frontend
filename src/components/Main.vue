<template>
    <div class="main-page">
        <div class="primary">
            <div class="primary-menu">
                <div class="primary-menu-container">
                    <div class="menu-buttons-container">
                        <div class="menu-button"></div>
                        <div class="menu-button">Выйти</div>
                    </div>
                    <div class="avatar"> 
                        <img src="../assets/img/main_img/icon_pencil.png" class="pencil" v-on:click="loadAvatar()">    
                    </div>
                    <div class="personal-data">
                        <div class="full-name-container">
                            <div class="full-name">Прокофий Кузнецов</div>
                            <img src="../assets/img/main_img/icon_pencil.png" class="pencil">
                        </div>
                        <div class="email">Prokofey_Kuznetsov@gmail.com</div>
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="username username-block__content">@Prokofey_Kuznetsov</div>  
                            </div>
                            <img src="../assets/img/main_img/icon_pencil.png" class="pencil">
                        </div>
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="phone username-block__content">+380 123 45 67</div>  
                            </div>
                            <img src="../assets/img/main_img/icon_pencil.png" class="pencil">
                        </div>
                        <div class="username-block">
                            <div>
                                <div class="circle"></div>
                                <div class="date username-block__content">01.12.2001</div>  
                            </div>
                            <img src="../assets/img/main_img/icon_pencil.png" class="pencil">
                        </div> 
                    </div>
                    <div class="setting-buttons-container">
                        <div class="setting-button">Изменить пароль</div>
                        <div class="setting-button">Настроить уведомления</div>
                        <div class="setting-button admin-button">Кабинет Администратора</div>
                    </div>
                </div>
            </div>
            <div class="devider"></div>
        </div>


        <div class="secondary">
            <modal :visible="this.modalVisible" @close='closeModal'>
			    <template v-slot:modal-content>
                    <avatar v-show="avatarVisible"></avatar>
 			    </template>
		    </modal>            
            
            <coach v-show="coachVisible"></coach>

        </div>
    </div>
</template>

<script>
    import sendAjax from '../utils/ajax';
    import modal from '../components/modal/modal';
    import icon_pencil from '../assets/img/main_img/icon_pencil.png';
    import avatar from '../components/modal/avatar';
    import coach from '../components/secondary/coach';
    import games from '../components/secondary/games';

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
        methods: {
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

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    $fontf: 'Roboto', sans-serif;

    *{
        display: flex;
        font-family: $fontf;
        color: #000000;
    }

    .main-page{
        margin: 0;
		padding: 0;
		height: 100vh;
        background: #FFFEFE;
        display: flex;
        .pencil{
            user-select: none;
            cursor: pointer;
            width: 24px;
            height: 24px; 
        }

        .secondary{
            position: fixed;
            right: 0;
            width: 80%;
            height: 100vh;
        }

        .primary{
            width: 20%;      //размер поставил пока примерно
            height: 100vh;
            .primary-menu{
                justify-content: center;
                width: 100%;
                .primary-menu-container{
                    width: 220px;
                    height: 650px;
                    margin-top: 49px;
                    align-items: center;
                    flex-direction: column;
                    width: 220px;
                    .menu-buttons-container{
                        justify-content: space-between;
                        width: 220px;
                        margin-bottom: 36px;
                        .menu-button{
                            align-items: center;
                            justify-content: center;
                            width: 98px;
                            height: 24px;
                            background: #C4C4C4;
                            border-radius: 15px;
                            font-size: 12px;
                            line-height: 14px;
                            font-weight: 400;
                            user-select: none; 
                        }
                    }
                    .avatar{
                        width: 220px;
                        height: 220px;
                        background: #E6E6E6;
                        border-radius: 10px;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 27px;                        
                    }
                    .personal-data{
                        width: 220px;
                        flex-direction: column;
                        .full-name-container{
                            justify-content: space-between;
                            .full-name{
                                font-weight: bold;
                                font-size: 16px;
                                line-height: 19px;
                                overflow: hidden;
                            }
                        }
                        .email{
                            font-size: 12px;
                            line-height: 14px;
                            text-decoration-line: underline;
                            color: #9A9999;
                            margin-bottom: 24px;
                            overflow: hidden;
                        }
                        .username-block{
                            justify-content: space-between;
                            margin-bottom: 12px;
                            .circle{
                                width: 24px;
                                height: 24px;
                                background: rgba(196, 196, 196, 0.56);
                                border-radius: 15px;
                                margin-right: 8px;
                            }
                            .username-block__content{
                                font-size: 12px;
                                height: 24px;
                                align-items: center;
                                overflow: hidden;
                            }                            
                        }
                    }
                    .setting-buttons-container{
                        margin-top: 24px;
                        align-items: center;
                        flex-direction: column;
                        .setting-button{
                            font-size: 12px;
                            border: 1px solid #636363;
                            border-radius: 15px;
                            width: 220px;
                            height: 32px;
                            align-items: center;
                            justify-content: center;
                            user-select: none;
                            margin-bottom: 15px; 
                        }
                        .admin-button{
                            margin-top: 21px;
                            background: #C4C4C4;
                        }             

                    }
                }
            }
        }
        .devider{
            border: 1px solid #B1B1B1;
        }
    }
</style>