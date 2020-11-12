<template>
    <div class="avatar-window">
        <div>
            <div class="avatar-requirements">
                <div class="decor decor-left-top"></div>
                <div class="decor decor-left-bottom"></div>
                <div class="decor decor-right-top"></div>
                <div class="decor decor-right-bottom"></div>    
                <div class="avatar-requirements-info">
                    Фото должно быть не менее<br>
                    200 пикселей в ширину и 220<br>
                    пикселей в высоту.<br>
                    <br>
                    Загружается быстрее всего<br>
                    в виде файла sRGB .JPG<br> 
                    и размером менее 100 килобайт.<br>
                    <br>
                    Допустимые форматы: jpg, png.
                </div>
            </div>
            <div class="load-button">Загрузить фото</div>
        </div>
    </div>
</template>

<script>
    import sendAjax from '../../utils/ajax';
    import icon_pencil from '../../assets/img/main_img/icon_pencil.png';
    export default {
        name: "avatar",
        data () {
            return {

            }
        },
        components: {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    $fontf: 'Roboto', sans-serif;

    .avatar-window{
        width: 340px;
        height: 396px;
        background: #FFFFFF;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar-requirements{
            width: 220px;
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            .avatar-requirements-info{
                width: 188px;
                height: 126px;
                font-size: 12px;
                line-height: 14px;
                color: #000000;
            }
            .decor{
                position: absolute;
                width: 80px;
                height: 80px;
                border: 2px solid #C4C4C4;
            }
            .decor-left-top{
                top: 60px;
                left: 60px;
                border-bottom: none;
                border-right: none;
                border-top-left-radius: 10px;
            }
            .decor-left-bottom{
                top: 196px;
                left: 60px;
                border-top: none;
                border-right: none;
                border-bottom-left-radius: 10px;
            }
            .decor-right-top{
                top: 60px;
                left: 196px;
                border-bottom: none;
                border-left: none;
                border-top-right-radius: 10px;
            }
            .decor-right-bottom{
                top: 196px;
                left: 196px;
                border-top: none;
                border-left: none;
                border-bottom-right-radius: 10px;
            }
        }
        .load-button{
            width: 220px;
            height: 32px;
            background: #C4C4C4;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            line-height: 15px;
            color: #000000;
            user-select: none;
            margin-top: 24px;
        }
    }    
</style>