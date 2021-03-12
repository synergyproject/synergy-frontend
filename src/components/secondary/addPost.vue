<template>
    <article class="addpost">
        <div class="avatar" 
            :style="{backgroundImage:`url(${user.photo ? user.photo  : bgImage})`}"
        ></div>
        <div class="addpost__form">
            <div class="addpost__text-wrap" >
                <input  class="addpost__input"  
                    
                    v-model="text"
                >
                <div class="addpost__text" @click="openInput" contenteditable ="true">
                    {{text}}
                </div>
            </div>

            
            <label class="addpost__files" for="post-files">
                <input 
                    id ="post-files"
                    class="addpost__files-input" 
                    type="file" 
                    @change="loadFile"
                    accept=".jpg, .png, .pdf, .docx, .xlsx" 
                 
                    name="send-file"
                >
                <img 
                    class="addpost__files-icon" 
                    src="@/assets/img/add-icon.png"
                >
            </label>
            <button class="addpost__form-btn" @click="addPost">
                <img src="@/assets/img/arrow-right.png">

            </button>
        </div>
        <ul v-show = "files.length>0" class="addpost__prevues">
            <li v-for= "(file, ind) in files" :key = "ind" class="addpost__prevues-item">
                <div class="addpost__prevues-name">
                    {{file.name}}
                </div>
                <div class="addpost__prevues-btn" @click="delLoadFile(ind)">
                    <img src="@/assets/img/off_close.png">
                </div>
            </li>
        </ul>
    </article>

</template>

<script>
    import avatar from '@/assets/img/avatar.png'
    import { mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        name: "addpost",
        props:['user', 'gameID'],
        data () {
            return {
                bgImage: avatar,
                text: '',
                files: []                
            }
        },
        mounted(){

        },

        methods: {
            ...mapActions(['SEND_POST', 'POSTS_FROM_SERVER']), 
            
            loadFile (event) {
                const uploadedFile = event.target.files[0];
                const filesSize = this.files.reduce(function(sum, item) {
                    return sum + item.size;
                }, 0);
                let size = filesSize + uploadedFile.size;
                let fileFormat = uploadedFile.name.split(".").pop()
                if (size <= 26214400 && (fileFormat === 'jpg'|| fileFormat === 'png'||fileFormat === 'pdf'||fileFormat === 'docx'||fileFormat === 'xlsx')) {                  
                    this.files.push(uploadedFile)                   
                } else {
                    alert('Последний выбранный вами файл не удовлетворяет требованиям и не был загружен')
                }
            },
            delLoadFile(ind){
                this.files.splice(ind, 1)
                
            },
            addPost(){
                const data = {
                    gameID:this.gameID,
                    text: this.text,
                    files:this.files
                }
                console.log('data', data)
                this.SEND_POST(data)
                .then(resolve => {
                    this.POSTS_FROM_SERVER(this.gameID)
                    this.text=''
                    this.files=[]
                })
                
                
            },
            openInput(){
                document.querySelector(`.addpost__input`).focus()
            }
    },
    }


</script>
