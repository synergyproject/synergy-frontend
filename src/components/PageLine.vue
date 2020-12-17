<template>
    <side-bar>
        <div class="line">
            <div class="line-main">
                <addpost :user = "GET_USERIN"></addpost>
                <section 
                    class = "posts" 
                    :key = "keyR"
                >
                    <post 
                        v-for ="(post, num) in GET_POSTS" 
                        :key = "post.id" 
                        :post = "post" 
                        :num = "num" 
                        :user = "GET_USERIN"
                    ></post>
                </section>
            </div>
            <div class="line-info">  
                <div class="side">
                    <div class="side__info">
                        <h4 class="side__info-name">
                            {{GET_GAME.title}}
                        </h4>
                        <p class="side__info-date">
                            {{GET_GAME.date}}
                        </p>
                    </div>
                    <div class="side__user">
                        <div 
                            class="avatar" 
                            :style="{backgroundImage:`url(${GET_USERIN.avatar ? GET_USERIN.avatar : bgImage})`}"
                        ></div>
                        <h4 class="side__user-name">
                            {{GET_USERIN.firstName}} {{GET_USERIN.surname}}
                        </h4>
                    </div>
                </div>
                <div class="rating">
                    <div class="rating__header">
                        <h3>
                            Рейтинг игроков
                        </h3>
                    </div>
                    <div class="rating__title">
                        <p class="rating__title-text">
                            Игрок
                        </p>
                        <p class="rating__title-text">
                            Баллы
                        </p>
                    </div>
                    <ul class="rating__list">
                        <li 
                            v-for ="item in GET_GAME.rating" 
                            :key = "item.userId" 
                            class="rating__item"
                        >
                            <div class="rating__user">
                                <div 
                                    class="avatar" 
                                    :style="{backgroundImage:`url(${item.avatar ? item.avatar : bgImage})`}"
                                ></div>
                                <p class="rating__user-name">
                                    {{item.firstName}} {{item.surname}}
                                </p>
                            </div>
                            <div class="rating__user-rate">
                                {{item.rating}}
                            </div>                            
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </side-bar>
</template>

<script>
    import SideBar from "@/components/layouts/SideBar";
    import post from '@/components/secondary/post';
    import addpost from '@/components/secondary/addPost';
    import avatar from '@/assets/img/avatar.png';

    import { mapMutations, mapGetters, mapActions } from 'vuex';

    export default {
        name: "PageLine",

        components: {
            SideBar,
            post,
            addpost
        },
        data () {
            return {
                bgImage: avatar,
                keyR: 0
            }
        },
        mounted(){
            window.addEventListener('resize', this.onResize);
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.onResize);
        },
        computed: {
            ...mapGetters(['GET_USERIN']),
            ...mapGetters(['GET_USER']),
            ...mapGetters(['GET_POSTS']),
            ...mapGetters(['GET_GAME'])            
		},  
        methods: {
            onResize(){
                this.keyR = +this.keyR + 1
            }
        }
    }

   
</script>
