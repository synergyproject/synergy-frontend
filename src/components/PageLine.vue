<template>
    <page-layout>
        <div class="line">
            <div class="line-main">
            <addpost></addpost>
            <section class = "posts">
                <post v-for ="post in posts" :key = "post.id" :post = "post"></post>
            </section>
            </div>
            <div class="line-info">  
                <div class="side">
                    <div class="side__info">
                        <h4 class="side__info-name">Великолепная Игра </h4>
                        <p class="side__info-date">15.07.2020</p>
                    </div>
                    <div class="side__user">
                        <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}"></div>
                        <h4 class="side__user-name">Валентин Добровольский</h4>
                    </div>
                </div>
                <div class="rating">
                    <div class="rating__header">
                        <h3>Рейтинг игроков</h3>
                    </div>
                    <div class="rating__title">
                        <p class="rating__title-text">Игрок</p>
                        <p class="rating__title-text">Баллы</p>
                    </div>
                    <ul class="rating__list">
                        <li v-for ="item in rating" :key = "item.id" class="rating__item">
                            <div class="rating__user">
                                <div class="avatar" :style="{backgroundImage:`url(${bgImage})`}"></div>
                                <p class="rating__user-name">{{item.name}}</p>
                            </div>
                            <div class="rating__user-rate">{{item.rating}}</div>
                            
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    </page-layout>


</template>

<script>
    import PageLayout from "@/components/layouts/PageLayout";
    import post from '@/components/secondary/post';
    import addpost from '@/components/secondary/addPost';
    import avatar from '@/assets/img/avatar.png'
    // import modal from '@/components/modal/modal';
    // import icon_pencil from '@/assets/img/icon_pencil.png';
    // import avatar from '@/components/modal/avatar';
    // import fullname from '@/components/modal/edit_fullname';
    // import { mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        name: "PageLine",

        components: {
            PageLayout,
            post,
            addpost
        },
        data () {
            return {
                bgImage: avatar,
                rating: [
                    {
                        id: '1',
                        name: 'Георгий Васергольштейн',
                        rating:'1'
                    },
                    {
                        id: '2',
                        name: 'Роман Каземиров',
                        rating:'2'
                    },
                    {
                        id: '3',
                        name: 'Данил Ким',
                        rating:'3'
                    },
                    {
                        id: '4',
                        name: 'Валерия  Клименко',
                        rating:'4'
                    },
                    {
                        id: '5',
                        name: 'Дмитрий Васичкин',
                        rating:'5'
                    },
                    {
                        id: '6',
                        name: 'Данил Васичкин',
                        rating:'6'
                    },
                    {
                        id: '7',
                        name: 'Дмитрий Васичкин',
                        rating:'7'
                    },
                    {
                        id: '8',
                        name: 'Данил Васичкин',
                        rating:'8'
                    }
                ],
                posts :[
                    {
                        id:'1',
                        autor: 'Данил Ким',
                        date: '15.09.2020',
                        postСhanges: true,
                        likes: '9',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit am e enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eadskvjbv',
                        comments: [
                            {
                                id:'1/1',
                                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
                            },
                            {
                                id:'1/2',
                                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
                            }
                        ]


                    },
                                        {
                        id:'2',
                        autor: 'Валерия Клименко',
                        date: '03.09.2020',
                        postСhanges: false,
                        likes: '11',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        comments: [
                            {
                                id:'2/1',
                                text: 'officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad'
                            }
                        ]


                    }
                    

                ],
            }
        },
    }

   
</script>
