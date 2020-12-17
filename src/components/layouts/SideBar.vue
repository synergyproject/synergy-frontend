<template>
    <div class="page">
        <div class="page-sidebar">  
            <div class="page-sidebar__exit">
            </div>
                <div 
                    v-if="GET_AVATAR"
                    :style="{backgroundImage:`url(${GET_AVATAR})`}"
                    class="avatar"
                ></div>
                <div
                    v-else 
                    class="avatar" 
                    :style="{backgroundImage:`url(${bgImage})`}"
                >
            </div>

            <ul class="page-sidebar__menu">
                <li class="page-sidebar__menu-item">
                    <router-link 
                        to="/main" 
                        class="page-sidebar__menu-link"
                    >
                        <span>
                            Кабинет игрока
                        </span>
                    </router-link>
                </li>
                <li class="page-sidebar__menu-item">
                    <router-link 
                        to="/line" 
                        class="page-sidebar__menu-link"
                    >
                        <span>
                            Лента
                        </span>
                    </router-link>
                </li>
                <li class="page-sidebar__menu-item">
                    <router-link 
                        to="/calendar" 
                        class="page-sidebar__menu-link"
                    >
                        <span>
                            Мои Цели
                        </span>
                    </router-link>
                </li>
            </ul>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import avatar from '@/assets/img/avatar.png'
    import { mapGetters } from 'vuex';
    export default {
        name: "SideBar",
        data () {
            return {
              bgImage: avatar                
            }
        },
        computed: {
            ...mapGetters(['GET_AVATAR'])
		}
    }

</script>
