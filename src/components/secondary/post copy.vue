<template>
    <article class="post">
        <header class="post__header">
            <div class="post__author">
                <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}">                  
                </div>
                <div class="post__author-info">
                    <h3 class="post__author-name">Данил Ким</h3>
                    <div class="post__date">
                        <span class="post__date-main">15.09.2020</span>
                        <span class="post__date-edit">(Edit)</span>
                    </div>
                </div>
            </div>
            <div class="post__settings">
                <div class="post__likes">
                    <img class="post__likes-icon" src="@/assets/img/heart_fill.png" >
                    <div class="post__likes-amount">9</div>
                </div>
                <div v-show = "myPost" class="post__menu">
                    <div class="post__menu-img">
                        <img class="post__menu-icon" src="@/assets/img/post-menu-icon.png" >
                    </div>
                    <div class="post__menu-listwrap">
                        <ul class="post__menu-list">
                            <li class="post__menu-item">
                                <span>Редактировать пост</span>
                            </li>
                            <li class="post__menu-item">
                                <span>Удалить пост</span>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </header>
        <div class="post__main">
            <div class="post__files">
                <div class="post__file"></div>
                <div class="post__file"></div>
                <div class="post__file"></div>
            </div>
            <div class="post__text">
                <p class="post__text-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es.
                </p>  
                <p class="post__text-paragraph">
                    Laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit am e enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eadskvjbv
                </p>  
                <p class="post__text-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es.
                </p>  
            </div>
            <div v-show="showTextBtn" class="post__text-show" @click = "resizeText">{{showText ?  "Свернуть" :"Показать полностью"}}</div>
        </div>
        <div class="post__comments">
            <ul class="post__comments-list">
                <li class="post__comments-item">
                    <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}">
                        
                    </div>
                    <p class="comment">
                        officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    </p>
                </li>
                <li class="post__comments-item">
                    <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}">
                        
                    </div>
                    <p class="comment">
                        officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    </p>
                </li>
            </ul>
            <div v-show="showCommentsBtn" class="post__comments-show" @click = "resizeComments">{{showComments ?  "Свернуть" :"Все комментарии"}}</div>
        </div>
        <div class="post__add-comment">
            <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}">
            </div>
            <form class="post__form">
                <div class="post__text-wrap">
                    <div class="post__text"  @click = "onTexstarea" contenteditable="true"></div>
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
    export default {
        name: "post",
        data () {
            return {
                bgImage: avatar,
                myPost: true,
                showText: true,
                showTextBtn: false,
                showComments: true,
                showCommentsBtn: false,
                               
            }
        },
        mounted () {
            let heightTxt = document.querySelector('.post__text').clientHeight
            if (heightTxt>192) {
                let text = document.querySelector(".post__text")
                text.classList.add('close')
                this.showText = false
                this.showTextBtn = true
            }
            let heightComments = document.querySelector('.post__comments-list').clientHeight
            if (heightComments>100) {
                let comments= document.querySelector(".post__comments-list")
                comments.classList.add('close')
                this.showComments = false
                this.showCommentsBtn = true
            }
        },
        methods: {
            resizeText() {
                let text = document.querySelector(".post__text")

                if (text&&text.classList.contains('close')){
                    text.classList.remove('close')
                    this.showText = true

                } else {
                    text.classList.add('close')
                    this.showText = false

                }


            
            },
            resizeComments() {
                let text = document.querySelector(".post__comments-list")

                if (text&&text.classList.contains('close')){
                    text.classList.remove('close')
                    this.showComments= true

                } else {
                    text.classList.add('close')
                    this.showComments = false

                }


            
            }

        }
    }


</script>
