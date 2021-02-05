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
                            {{ $t('m_player_rating') }}
                        </h3>
                    </div>
                    <div class="rating__title">
                        <p class="rating__title-text">
                            {{ $t('m_player') }}
                        </p>
                        <p class="rating__title-text">
                            {{ $t('m_points') }}
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
            ...mapGetters(['GET_USER']),


            ...mapGetters(['GET_USERIN']),
            ...mapGetters(['GET_POSTS']),
            ...mapGetters(['GET_GAME'])            
        },
        mounted() {
			//если новый пользователь захочет перейти на эту страницу (например через адресную строку), 
			//не заполнив профиль - возвращаем его обратно на main к заполнению
			this.USERS_FROM_SERVER()
                .then(resolve => {
                    if (!this.GET_USER.firstName || !this.GET_USER.lastName || !this.GET_USER.phone) {
                        this.$router.push({ path: '/main'})
                    } 
            })
        },      
        methods: {
            ...mapActions(['USERS_FROM_SERVER', 'SEND_USER']),
            onResize(){
                this.keyR = +this.keyR + 1
            }
        }
    }

   
</script>
