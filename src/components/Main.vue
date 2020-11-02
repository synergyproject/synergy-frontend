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
                        <img src="../assets/img/main_img/icon_pencil.png" class="pencil">   
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
                        <div class="setting-button" v-on:click="testModal()">Изменить пароль</div>
                        <div class="setting-button" v-on:click="testModal()">Настроить уведомления</div>
                        <div class="setting-button admin-button" v-on:click="testModal()">Кабинет Администратора</div>
                    </div>
                </div>
            </div>
            <div class="devider"></div>
        </div>


        <div class="secondary">
            <modal :visible="this.modalVisible" @close='closeModal'>
			    <template v-slot:modal-content>
                    <div class="test-modal">Что-то происходит</div>
			    </template>
		    </modal>
            <h1>content</h1>	
        </div>
    </div>
</template>

<script>
    import sendAjax from '../utils/ajax';
    import modal from '../components/modal';
    import icon_pencil from '../assets/img/main_img/icon_pencil.png';

    export default {
        name: "Main",
        data () {
            return {
                modalVisible: false
            }
        },
        components: {
            modal: modal
        },
        methods: {
            testModal: function() {
                this.modalVisible = true;
            },
            closeModal: function () {
		  		this.modalVisible = false;	  		
		  	}
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    $fontf: 'Roboto', sans-serif;


// -------------TEST-------------
    .secondary{
        width: 100%;
        position: fixed;
        right: 0;
        width: 80%;
        height: 100vh;
        .test-modal{
            width: 300px;
            height: 300px;
            background-color: #FFFEFE;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
// -------------TEST-------------

    .pencil{
        user-select: none;
        cursor: pointer;
        width: 24px;
        height: 24px; 
    }
    .main-page{
        margin: 0;
		padding: 0;
		height: 100vh;
        background: #FFFEFE;
        display: flex;
        *{
            display: flex;
            font-family: $fontf;
            color: #000000;
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