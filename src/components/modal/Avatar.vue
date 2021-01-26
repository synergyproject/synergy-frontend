<template>
    <div class="avatar-window">
        <div>
            <div class="avatar-requirements">
                <div 
                    class="decor decor-left-top" 
                    :style="{ borderColor: activeDecorColor }"
                ></div>
                <div 
                    class="decor decor-left-bottom" 
                    :style="{ borderColor: activeDecorColor }"
                ></div>
                <div 
                    class="decor decor-right-top" 
                    :style="{ borderColor: activeDecorColor }"
                ></div>
                <div 
                    class="decor decor-right-bottom" 
                    :style="{ borderColor: activeDecorColor }"
                ></div>    
                <div class="avatar-requirements-info">
                    <!-- Рекомендуемый размер фото<br>
                    не менее 220 пикселей в ширину<br>
                    и 220 пикселей в высоту.<br>
                    <br>
                    Загружается быстрее всего<br>
                    в виде файла sRGB .JPG<br> 
                    Допустимый размер файла не более 2 мегабайт.<br>
                    <br>
                    Допустимые форматы: jpg, png. -->
                    {{ $t('m_photo_info') }}
                </div>
            </div>
            <input 
                id="loadAvatar" 
                type="file" 
                @change="onFileChanged"
            >
            <label 
                class="load-button basic-buttons" 
                for="loadAvatar"
            >
                {{ $t('m_upload_photo') }}
            </label>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Avatar',
        data () {
            return {
                activeDecorColor: '#BCC0C9'
            }
        },
        methods: {
            ...mapActions(['SEND_AVATAR']),
            
            onFileChanged (event) {
                let uploadedFile = event.target.files[0],
                    size = uploadedFile.size,
                    fileFormat = uploadedFile.name.split(".").pop();
                if (size <= 2097152 && (fileFormat === 'jpg'|| fileFormat === 'png')) {
                    this.activeDecorColor = '#BCC0C9';
                    this.SEND_AVATAR(uploadedFile);
                    this.$emit('closeAvatar');
                } else {
                    this.activeDecorColor = 'red';
                }   
            }
        }
    }
</script>
