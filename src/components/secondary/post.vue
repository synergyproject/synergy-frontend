<template>            
    <article :class="'post '+'post_'+num" @click="closeMenu">
        <header class="post__header">
            <div class="post__author">
                <div 
                    class="avatar"
                    :style="{backgroundImage:`url(${post.author.photo ?  post.author.photo : bgImage})`}"
                >                  
                </div>
                <div class="post__author-info">
                    <h3 class="post__author-name">
                        {{post.author.firstName}} {{post.author.lastName}}
                    </h3>
                    <div class="post__date">
                        <span class="post__date-main">
                            {{createDate(post.createdOn)}}
                        </span>
                        <span 
                            v-show = "post.updatedOn" 
                            class="post__date-edit"
                        >
                            (Edit)
                        </span>
                    </div>
                </div>
            </div>
            <div class="post__settings">
                <div class="post__likes">
                    <img 
                        class="post__likes-icon"
                        :src="heartUrl"
                        @click = "changeLike"
                        
                    >
                    <div class="post__likes-amount">
                        {{post.likes ? post.likes.length : '0'}}
                    </div>
                </div>
                <div 
                    v-if = "myPost"
                    class="post__menu"
                >
                    <div 
                        class="post__menu-img"
                        @click.stop = "showMenu"
                    >
                        <img 
                            class="post__menu-icon"
                            src="@/assets/img/post-menu-icon.png"
                        >
                    </div>
                    <div class="post__menu-listwrap">
                        <ul class="post__menu-list">
                            <li class="post__menu-item" @click="openChange">
                                <span>
                                    {{ $t('m_edit_post') }}
                                </span>
                            </li>
                            <li class="post__menu-item" @click="delPost">
                                <span>
                                    {{ $t('m_delete_post') }}
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </header>
        <div class="post__main">
            <div 
                v-if= "created"
                class="post__info"
            >
                <div class="post__text">
                    {{post.text}}
                </div>
                <div class="post__text-btn hidden" @click="saveChange">
                    {{$t("m_save")}}
                </div>
                <div 
                    v-if="showTextBtn"
                    class="post__text-show"
                    @click = "resizeText"
                > 
                    {{showText ?  $t('m_hide') : $t('m_show')}}
                </div>
            </div>
            <div v-else class="post__report">
                <div class="post__report-goals">
                    <h4 class="post__report-title">
                        {{ $t('m_goal_report') }}
                    </h4>
                    <ol class="post__report-list">
                        <li 
                            v-for="(item, num) in post.goalDones" 
                            :key = "num" 
                            class="post__report-item"
                        >
                            <span class="item_name">
                                {{item.goalName}}
                            </span>
                            <br> 
                            <span>
                                {{item.text}}
                            </span>
                        </li>
                    </ol>
                </div>
                <div class="post__report-todos">
                    <h4 class="post__report-title">
                        {{ $t('m_to_do_list_for_today') }}
                    </h4>
                    <ol class="post__report-list">
                        <li 
                            v-for="(item, num) in post.toDoList" 
                            :key = "num"
                            class="post__report-item"
                        >
                            {{item.text}}
                        </li>
                    </ol>
                </div>                
            </div>
            <div class="post__files">
                <div 
                    v-if="showImg" 
                    class="post__photo-list"
                >
                    <div 
                        v-for="(item, index) in img.slice(0,2)"
                        :key="index" 
                        class="post__photo-item" 
                        :style="{backgroundImage:`url(${item})`}"
                    >
                        <div v-if="img.length>2" class="post__photo-hover" @click="openSliderWindow">
                            + {{ img.length - 2 }}
                        </div>
                    </div>
                </div>
                 <div 
                    v-if="showImg" 
                    class="post__photo-list-prev hidden"
                >
                    <div 
                        v-for="(item, index) in img"
                        :key="index" 
                        class="post__photo-prev " 
                        :style="{backgroundImage:`url(${item})`}"
                    >
                        <div class="post__prevues-btn" @click="delPostPhoto(index)">
                            <img src="@/assets/img/off_close.png">
                        </div>
                    </div>
                </div>
                <div 
                    v-if="showFiles" 
                    class="post__files-list"
                >
                    <div 
                        v-for="(item, num) in fileName()" 
                        :key = "num"
                        class="post__files-item"
                    >
                        <a 
                            class="post__download" 
                            :href="'@/assets/files/'+item" 
                            download
                        >
                            <p>
                                {{item}}
                            </p>
                            <img 
                                class="post__download-icon" 
                                src='@/assets/img/download.png'
                            >
                        </a>
                    </div>
                </div>
                <ul v-if="showFiles"  class="post__files-list-prev hidden">
                    <li v-for= "(file, index) in fileName()" :key = "index" class="post__files-item-prev">
                        <div class="post__files-name">
                            {{file}}
                        </div>
                        <div class="post__prevues-btn" @click="delPostFile(index)">
                            <img src="@/assets/img/off_close.png">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="post__comments">
            <ul class="post__comments-list">
                <li 
                    v-for = "comment in post.comments" 
                    :key = " comment.id" 
                    class="post__comments-item"
                >
                    <div 
                        class="avatar" 
                        :style="{backgroundImage:`url(${comment.author.photo ? comment.author.photo : bgImage})`}"
                    ></div>
                    <p class="comment">
                        {{comment.text}}
                    </p>
                </li>
            </ul>
            <div 
                v-show="showCommentsBtn" 
                class="post__comments-show" 
                @click = "resizeComments"
            >
                {{showComments ?   $t('m_hide') : $t('m_all_comments')}}
            </div>
        </div>
        <div class="post__add-comment">
            <div 
                class="avatar" 
                :style="{backgroundImage:`url(${user.photo ?  user.photo : bgImage})`}"
            >
            </div>
            <div class="post__form">
                <div class="post__addtext-wrap" >
                    <input  class="post__input"  
                        
                        v-model="commentText"
                    >
                    <div class="post__addtext" @click="openCommentInput" contenteditable ="true" >
                        {{commentText}}
                    </div>
                </div>
                
                <button class="post__form-btn" @click="addComment">
                    <img src="@/assets/img/arrow-right.png">
                </button>
            </div>
        </div>
        <modal-window v-if="this.sliderShow" @close='closeSliderWindow'>
            <slider :img = "img"></slider>
        </modal-window> 
    </article>
</template>

<script>
    import ModalWindow from '@/components/modal/ModalWindow';
    import Slider from '@/components/modal/Slider';

    import avatar from '@/assets/img/avatar.png'
    import photo from '@/assets/img/test.png'
    import heart from '@/assets/img/heart.png'
    import heartFill from '@/assets/img/heart_fill.png'

    import { mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        name: "post",
        props:['post', 'num', 'user', 'gameID'],
        data () {
            return {
                bgImage: avatar,
                myPost: this.user.id === this.post.author.id,
                created: this.post.type ==="CREATED",
                showTextBtn:false,
                showText: true,
                showComments: true,
                showCommentsBtn: false,
                heartUrl: this.post.likes==0 ? heart : heartFill,
                showImg: false,
                showFiles: false,
                img: [],
                files: [],
                commentText:'',
                sliderShow: false
                
                               
            }
        },
        components: {
            ModalWindow,
            Slider
        },
        mounted () {
            console.log('post', this.post)
            //сворачиваем текст в постах если он больше заданной высоты
            let text = document.querySelector(`.post_${this.num}>.post__main>.post__info>.post__text`)
            if (text&&text.clientHeight>192) {
                text.classList.add('close')
                this.showText = false
                this.showTextBtn = true   
            }
            //сворачиваем текст в коментах если он больше заданной высоты
            let comments= document.querySelector(`.post_${this.num}>.post__comments>.post__comments-list`)
            if(comments&&comments.clientHeight>100){
                comments.classList.add('close')
                this.showComments = false
                this.showCommentsBtn = true   
            }
            //отрисовка изображений и файлов
            this.img = this.post.fileUrls.filter(item => item.match( /\.(?:jpe?g|gif|png)$/i))
            if(this.img){
                this.img.length>0 ? this.showImg = true : this.showImg = false
            }
           
            this.files = this.post.fileUrls.filter(item => !item.match(/\.(?:jpe?g|gif|png)$/i))
            if(this.files){
                this.files.length>0 ? this.showFiles = true : this.showFiles = false
                
            }
            

            

            
        },
        
        methods: {
            ...mapActions(['SEND_LIKE', 'DEL_LIKE', 'POSTS_FROM_SERVER', 'DEL_POST', 'SEND_COMMENT', 'CHANGE_POST']),  
            
            createDate(date){
                let f = new Date(date)
                let year= f.getFullYear()
                let month= f.getMonth()+1
                let day = f.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;

                return [day, month, year,].join('.')
                

            },
            resizeText(e) {
                let text = document.querySelector(`.post_${this.num}>.post__main>.post__info>.post__text`)
                if (text.classList.contains('close')){
                    text.classList.remove('close')
                    this.showText = true

                } else {
                    text.classList.add('close')
                    this.showText= false
                }           
            },
            resizeComments() {
                let text = document.querySelector(`.post_${this.num}>.post__comments>.post__comments-list`)

                if (text&&text.classList.contains('close')){
                    text.classList.remove('close')
                    this.showComments= true

                } else {
                    text.classList.add('close')
                    this.showComments = false

                }


            
            },
            closeMenu(){
                
                let menu = document.querySelector(`.post_${this.num}>.post__header>.post__settings>.post__menu>.post__menu-listwrap`)                
                if(menu&&menu.classList.contains('visible')) {
                    menu.classList.remove('visible')}
              
            },
            showMenu(){
                
                let menu = document.querySelector(`.post_${this.num}>.post__header>.post__settings>.post__menu>.post__menu-listwrap`)                
                if(menu.classList.contains('visible')) {
                    
                    menu.classList.remove('visible')
                } else {
                    menu.classList.add('visible')
                }
            },

            fileName(){
                let name = this.files.map(item => item.slice(+item.lastIndexOf('/')+1))
                return name
            },
            changeLike(){
                const data = {
                    gameID: this.gameID,
                    postID: this.post.id,
                    info: {
                        email: this.user.email,
                        firstName: this.user.firstName,
                        id: this.user.id,
                        lastName: this.user.lastName,
                        photo: this.user.photo
                    }
                }
                const myLike = this.post.likes.find(item=> item.id === this.user.id)
               
                if( myLike){
                    this.DEL_LIKE(data)
                        .then(resolve => {
                            this.POSTS_FROM_SERVER(this.gameID)
                                .then(resolve => {
                                    this.post.likes.length ? this.heartUrl = heartFill : this.heartUrl = heart
                        
                                })
                        })
                } else{
                    this.SEND_LIKE(data)
                        .then(resolve => {
                            this.POSTS_FROM_SERVER(this.gameID)
                            this.heartUrl = heartFill
                        
                        })
                }


            },
            delPost(){
                const data = {
                    gameID: this.gameID,
                    postID: this.post.id,

                }


                this.DEL_POST(data)                
                    .then(resolve => {
                        this.POSTS_FROM_SERVER(this.gameID)
                        
                     
                    })
            },
            openCommentInput(){
                
                document.querySelector(`.post_${this.num} .post__input`).focus()
               
            },
            addComment(){
                const data = {
                    gameID:this.gameID,
                    info:{
                            postId: `${this.post.id}`,
                            text: this.commentText
                        }
                }
                console.log('data', data)
                this.SEND_COMMENT(data)
                .then(resolve => {
                        this.POSTS_FROM_SERVER(this.gameID)
                        this.commentText=''
                        
                    })
                
                
            },
            closeSliderWindow() {
                this.sliderShow = false;

            },
            openSliderWindow(){
                this.sliderShow = true;
            },
            openChange(){
                const text = document.querySelector(`.post_${this.num} .post__text`)
                const btn = document.querySelector(`.post_${this.num} .post__text-btn`)
                const photo = document.querySelector(`.post_${this.num} .post__photo-list`)
                const photoPrev = document.querySelector(`.post_${this.num} .post__photo-list-prev`)
                const file = document.querySelector(`.post_${this.num} .post__files-list`)
                const filePrev = document.querySelector(`.post_${this.num} .post__files-list-prev`)
                if (!text.classList.contains('change')){
                    text.classList.add('change')
                }
                if(!text.hasAttribute('contenteditable')){
                    text.setAttribute('contenteditable', 'true')
                }
                if (btn.classList.contains('hidden')){
                    btn.classList.remove('hidden')
                }
                if (photo&&!photo.classList.contains('hidden')){
                    photo.classList.add('hidden')
                }
                if (photoPrev&&photoPrev.classList.contains('hidden')){
                    photoPrev.classList.remove('hidden')
                }
                if (file&&!file.classList.contains('hidden')){
                    file.classList.add('hidden')
                }
                if (filePrev&&filePrev.classList.contains('hidden')){
                    filePrev.classList.remove('hidden')
                }
            },
            saveChange(){
                const text = document.querySelector(`.post_${this.num} .post__text`)
                const btn = document.querySelector(`.post_${this.num} .post__text-btn`)
                const photo = document.querySelector(`.post_${this.num} .post__photo-list`)
                const photoPrev = document.querySelector(`.post_${this.num} .post__photo-list-prev`)
                const file = document.querySelector(`.post_${this.num} .post__files-list`)
                const filePrev = document.querySelector(`.post_${this.num} .post__files-list-prev`)
                const fileUrls= this.img.concat(this.files)
                const data = {
                    gameID: this.gameID,
                    postID: this.post.id,
                    updatedPostReq: {
                        text: text.innerHTML,
                        fileUrls: fileUrls
                    }
                }
                console.log('data', data)


                    this.CHANGE_POST(data)                
                    .then(resolve => {
                        this.POSTS_FROM_SERVER(this.gameID)
                        .then(resolve => {
                            text.classList.remove('change')
                            text.removeAttribute('contenteditable', 'true')
                            btn.classList.add('hidden')
                            photo&&photo.classList.remove('hidden')
                            photoPrev&&photoPrev.classList.add('hidden')
                            file&&file.classList.remove('hidden')
                            filePrev&&filePrev.classList.add('hidden')
                     
                        })

                     
                    })

          

            },
            delPostPhoto(ind){
                this.img.splice(ind, 1)
                
            },
            delPostFile(ind){
                this.files.splice(ind, 1)
                
            },

            
        }
    }

</script>
