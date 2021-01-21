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
                            <!-- не уверен в этом переводе до конца - лента / feed(news feed) -->
                            {{ $t('m_feed') }}
                        </span>
                    </router-link>
                </li>
                <li class="page-sidebar__menu-item">
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
    import { mapGetters } from 'vuex';

    export default {
        name: "SideBar",
        data () {
            return {
              bgImage: avatar,
              languageMenuDesign: 2                
            }
        },
        components: {
            LanguageMenu
        },
        computed: {
            ...mapGetters(['GET_AVATAR'])
		}
    }

</script>
