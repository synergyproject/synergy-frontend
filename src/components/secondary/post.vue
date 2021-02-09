<template>            
    <article :class="'post '+'post_'+num" >
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
                            {{post.createdOn}}
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
                        @click = "addLike"
                        
                    >
                    <div class="post__likes-amount">
                        {{post.likes.length}}
                    </div>
                </div>
                <div 
                    v-if = "myPost"
                    class="post__menu"
                >
                    <div 
                        class="post__menu-img"
                        @click = "showMenu"
                    >
                        <img 
                            class="post__menu-icon"
                            src="@/assets/img/post-menu-icon.png"
                        >
                    </div>
                    <div class="post__menu-listwrap">
                        <ul class="post__menu-list">
                            <li class="post__menu-item">
                                <span>
                                    {{ $t('m_edit_post') }}
                                </span>
                            </li>
                            <li class="post__menu-item">
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
                            v-for="(item, num) in post.goals" 
                            :key = "num" 
                            class="post__report-item"
                        >
                            <span class="item_name">
                                {{item.name}}
                            </span>
                            <br> 
                            <span>
                                {{item.report}}
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
                            v-for="(item, num) in post.todos" 
                            :key = "num"
                            class="post__report-item"
                        >
                            {{item}}
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
                        v-for="item in img" 
                        class="post__photo-item" 
                        :style="{backgroundImage:`url(${item})`}"
                    ></div>
                </div>
                <div 
                    v-if="showFiles" 
                    class="post__files-list"
                >
                    <div 
                        v-for="item in fileName()" 
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
            <form class="post__form">
                <div class="post__addtext-wrap">
                    <div 
                        class="post__addtext" 
                        contenteditable="true"
                    ></div>
                </div>
                
                <button class="post__form-btn">
                    <img src="@/assets/img/arrow-right.png">
                </button>
            </form>
        </div>
    </article>
</template>

<script>
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
                // bgPhoto: photo,
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
                
                               
            }
        },
        mounted () {
            
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
            if(this.img.length>0){
                this.showImg = true
            }
           
            this.files = this.post.fileUrls.filter(item => !item.match(/\.(?:jpe?g|gif|png)$/i))
            if(this.files.length>0){
                this.showFiles = true
            }
            

            

            
        },
        
        methods: {
            ...mapActions(['SEND_LIKE', 'POSTS_FROM_SERVER']),  
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
            addLike(){
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

                this.SEND_LIKE(data)
                    .then(resolve => {
                        this.POSTS_FROM_SERVER(this.gameID)
                        this.heartUrl = heartFill
                     
                    })
            },


        }
    }


</script>
