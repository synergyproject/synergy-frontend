<template>
    <div class="avatar-window">
        <div>
            <div class="avatar-requirements">
                <div class="decor decor-left-top" v-bind:style="{ borderColor: activeDecorColor }"></div>
                <div class="decor decor-left-bottom" v-bind:style="{ borderColor: activeDecorColor }"></div>
                <div class="decor decor-right-top" v-bind:style="{ borderColor: activeDecorColor }"></div>
                <div class="decor decor-right-bottom" v-bind:style="{ borderColor: activeDecorColor }"></div>    
                <div class="avatar-requirements-info">
                    Рекомендуемый размер фото<br>
                    не менее 220 пикселей в ширину<br>
                    и 220 пикселей в высоту.<br>
                    <br>
                    Загружается быстрее всего<br>
                    в виде файла sRGB .JPG<br> 
                    Допустимый размер файла не более 2 мегабайт.<br>
                    <br>
                    Допустимые форматы: jpg, png.
                </div>
            </div>
            <input id="loadAvatar" type="file" v-on:change="onFileChanged">
            <label class="load-button basic-buttons" for="loadAvatar" v-on:click="onUpload()">Загрузить фото</label>
        </div>
    </div>
</template>

<script>
    import sendAjax from '../../utils/ajax';
    import icon_pencil from '../../assets/img/icon_pencil.png';
    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "avatar",
        data () {
            return {
                activeDecorColor: '#C4C4C4'
            }
        },
        components: {

        },
        methods: {
            ...mapMutations(['SET_AVATAR']),

            
            onFileChanged (event) {
                //при загрузке правильного файла пользователем отправляем его в хранилище
                let uploadedFile = event.target.files[0],
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop();

                if (size <= 2097152 && (fileFormat == 'jpg'|| fileFormat == 'png')) {
                    this.SET_AVATAR(event.target.files[0]);
                    this.activeDecorColor = '#C4C4C4';
                    this.$emit('closeAvatar');
                } else {
                    this.activeDecorColor = 'red';
                    console.log('Ahtung ', fileFormat);
                }   
            },
            onUpload() {
                // отправляем данные на сервер 
            }
        }
    }
</script>
