<template>
    <side-bar> 
        <div class="line">
            <div class="line-main">
                <addpost 
                    :user = "GET_USER"
                    :gameID = "GET_SELECTED_GAME.id"
                ></addpost>
                <section 
                    class = "posts" 
                    :key = "keyR"
                >
                    <post 
                        v-for ="(post, num) in GET_POSTS" 
                        :key = "post.id" 
                        :post = "post" 
                        :num = "num" 
                        :user = "GET_USER"
                        :gameID = "GET_SELECTED_GAME.id"
                    ></post>
                </section>
            </div>
            <div class="line-info">  
                <div class="side">
                    <div class="side__info">
                        <h4 class="side__info-name">
                            {{GET_SELECTED_GAME.name}}
                        </h4>
                        <p class="side__info-date">
                            {{createDate(GET_SELECTED_GAME.endDate)}}
                        </p>
                    </div>
                    <div class="side__user">
                        <div 
                            class="avatar" 
                            :style="{backgroundImage:`url(${GET_SELECTED_GAME.coach.photo ? GET_SELECTED_GAME.coach.photo: bgImage})`}"
                        ></div>
                        <h4 class="side__user-name">
                            {{GET_SELECTED_GAME.coach.firstName}} {{GET_SELECTED_GAME.coach.lastName}}
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
                            v-for ="item in GET_RATING" 
                            :key = "item.user.id" 
                            class="rating__item"
                        >
                            <div class="rating__user">
                                <div 
                                    class="avatar" 
                                    :style="{backgroundImage:`url(${item.user.photo ? item.user.photo : bgImage})`}"
                                ></div>
                                <p class="rating__user-name">
                                    {{item.user.firstName}} {{item.user.lastName}}
                                </p>
                            </div>
                            <div class="rating__user-rate">
                                {{item.ratingCounter}}
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
                keyR: 0,

            }
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.onResize)
            localStorage.removeItem('GameSelected')
        },
        computed: {
            ...mapGetters(['GET_USER', 'GET_SELECTED_GAME', 'GET_POSTS', 'GET_RATING']),

                      
        },
        created(){
            window.addEventListener('resize', this.onResize)
            this.GET_SELECTED_GAME.id ? this.POSTS_FROM_SERVER(this.GET_SELECTED_GAME.id) : this.$router.push({ path: '/main'}) 
            this.RATING_FROM_SERVER(this.GET_SELECTED_GAME.id)


            this.USERS_FROM_SERVER()
                .then(resolve => {
                    if (!this.GET_USER.firstName || !this.GET_USER.lastName || !this.GET_USER.phone) {
                        this.$router.push({ path: '/main'})
                    } 
            })
        },
        mounted(){
            
        },    
        methods: {
            ...mapActions(['POSTS_FROM_SERVER', 'USERS_FROM_SERVER', 'RATING_FROM_SERVER']),        
            onResize(){
                this.keyR = +this.keyR + 1
            },
            createDate(date){
                let f = new Date(date)
                let year= f.getFullYear()
                let month= f.getMonth()+1
                let day = f.getDate()
                month = (month < 10) ? '0' + month : month;
                day  = (day  < 10) ? '0' + day  : day;

                return [day, month, year,].join('.')
                

            }
        }
    }

   
</script>
