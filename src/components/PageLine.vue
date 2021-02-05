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
                        v-for ="(post, num) in getPosts" 
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
                            {{game.name}}
                        </h4>
                        <p class="side__info-date">
                            {{game.date}}
                        </p>
                    </div>
                    <div class="side__user">
                        <div 
                            class="avatar" 
                            :style="{backgroundImage:`url(${game.coach.photo ? game.coach.photo: bgImage})`}"
                        ></div>
                        <h4 class="side__user-name">
                            {{game.coach.firstName}} {{game.coach.lastName}}
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
                game:{
                    id:'',
                    name:'',
                    date:'',
                    coach: {
                        firstName: "",
                        id: "",
                        lastName: "",
                        photo: ""
                    }

                },
                bgImage: avatar,
                keyR: 0,

            }
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.onResize);
        },
        computed: {
            ...mapGetters(['GET_USER']),
            ...mapGetters(['GET_SELECTED_GAME_ID']),
            ...mapGetters(["GET_GAME_BY_ID"]),   
            ...mapGetters(["GET_GAMES_LIST"]),   
            ...mapGetters(['GET_USERIN']),
            ...mapGetters(['GET_POSTS']),
            ...mapGetters(['GET_GAME']), 
            getPosts(){
                console.log('posts', this.GET_POSTS)
                return  this.GET_POSTS
            }
                      
        },
        mounted() {
            window.addEventListener('resize', this.onResize);
			//если новый пользователь захочет перейти на эту страницу (например через адресную строку), 
			//не заполнив профиль - возвращаем его обратно на main к заполнению
			this.USERS_FROM_SERVER()
                .then(resolve => {
                    if (!this.GET_USER.firstName || !this.GET_USER.lastName || !this.GET_USER.phone) {
                        this.$router.push({ path: '/main'})
                    } 
            })

            if(this.GET_SELECTED_GAME_ID==='0'){
                this.$router.push({ path: '/main'}) ;
            }

            //Получаем данные по игре
            this.GAMES_FROM_SERVER()
            let data = this.GET_GAME_BY_ID(this.GET_SELECTED_GAME_ID)
            this.game.id = data.id
            this.game.name = data.name
            this.game.date = this.createDate(data.endDate)
            this.game.coach.id = data.coach.id
            this.game.coach.firstName = data.coach.firstName
            this.game.coach.lastName = data.coach.lastName
            this.game.coach.photo = data.coach.photo
            
            this.POSTS_FROM_SERVER(this.GET_SELECTED_GAME_ID)

        },      
        methods: {
            ...mapActions(['GAMES_FROM_SERVER']),
            ...mapActions(['POSTS_FROM_SERVER']),
            ...mapActions(['USERS_FROM_SERVER'], ['SEND_USER']),            
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
