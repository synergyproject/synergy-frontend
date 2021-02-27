<template>
    <div class="page">
        <div class="page-sidebar">
            <language-menu :languageMenuDesign='languageMenuDesign' />
            <div class="logo">
                <img src="@/assets/img/Logo_light.png" >
            </div>
            <router-link
                to="/logout" 
                class="page-sidebar__exit menu-button basic-buttons"
            >
                {{ $t('m_log_out') }}
            </router-link>
            <div 
                v-if="GET_USER.photo"
                :style="{backgroundImage:`url(${GET_USER.photo})`}"
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
                            {{ $t('m_player_cabinet') }}
                        </span>
                    </router-link>
                </li>
                <li class="page-sidebar__menu-item">
                    <router-link 
                        to="/line" 
                        class="page-sidebar__menu-link"
                    >
                        <span>
                            {{ $t('m_feed') }}
                        </span>
                    </router-link>
                </li>
                <li 
                    class="page-sidebar__menu-item"
                    v-if="goalsButtonVisible"
                >
                    <router-link 
                        to="/calendar" 
                        class="page-sidebar__menu-link"
                    >
                        <span>
                            {{ $t('m_my_goals') }}
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
    import LanguageMenu from '@/components/secondary/LanguageMenu';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "SideBar",

        data () {
            return {
              bgImage: avatar,
              languageMenuDesign: 2,
              goalsButtonVisible: false                
            }
        },

        components: {
            LanguageMenu
        },
        
        computed: {
            ...mapGetters([
                'GET_USER',
                'GET_CURRENT_GAME',
                'GET_USER',
                'GET_SELECTED_GAME'
            ]) 
		},

        mounted() {
            this.USERS_FROM_SERVER()
                .then(resolve => {	
					this.GET_GAME_BY_ID_FROM_SERVER(this.GET_SELECTED_GAME.id)
					.then(resolve => {
						//проверка является ли пользовтель игроком в этой игре, 
                        // если нет скрываем кнопку
                        for (let i = 0; i < this.GET_CURRENT_GAME.activeUsers.length; i++) {
                            console.log(this.GET_CURRENT_GAME.activeUsers[i].id);
                            if (this.GET_USER.id === this.GET_CURRENT_GAME.activeUsers[i].id) {
                                this.goalsButtonVisible = true
                            }
                        }
                    })
			})
        },

        methods: {
			...mapActions([ 
				'USERS_FROM_SERVER',
				'GET_GAME_BY_ID_FROM_SERVER'
			])
		}
            
    }

</script>
