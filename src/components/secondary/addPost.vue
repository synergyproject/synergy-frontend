<template>
    <article class="addpost">
        <div class="avatar" 
            :style="{backgroundImage:`url(${user.photo ? user.photo  : bgImage})`}"
        ></div>
        <div class="addpost__form">
            <div class="addpost__text-wrap" >
                <input class="addpost__input"  
                    
                    v-model="text"
                >
                <div class="addpost__text" @click="openInput" contentea>
                    {{text}}
                </div>
            </div>

            
            <div class="addpost__files">
                <input 
                    class="addpost__files-input" 
                    type="file" 
                    accept=".jpg, .png, .pdf, .docx, .xlsx" 
                    multiple="multiple" 
                    name="send-file"
                >
                <img 
                    class="addpost__files-icon" 
                    src="@/assets/img/add-icon.png"
                >
            </div>
            <button class="addpost__form-btn" @click="addPost">
                <img src="@/assets/img/arrow-right.png">

            </button>
        </div>

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
                     
                    })
                
                
            },
            openInput(){
                document.querySelector(`.addpost__input`).focus()
            }
    },
    }


</script>
