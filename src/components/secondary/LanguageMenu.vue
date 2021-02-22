<template>
    <div class="language-menu__wrapper">
        <div 
            @click="openLanguageMenu()"
            class="current-language__wrapper"
        >
            <div 
                class="current-language" 
                :class="getCurrentStyles()"
            >
                {{GET_CURRENT_LANGUAGE}}
            </div>   
            <img 
                v-if="this.languageMenuDesign === 1"
                src="@/assets/img/arrow_down.png" 
            >
            <img 
                v-else-if="this.languageMenuDesign === 2"
                src="@/assets/img/arrow_down_sidebar.png" 
            >
        </div>
        <div 
            class="language-menu"
            :style="getMenuStyles()"
            v-if="languageMenuVisible"
        >
            <div 
                class="language"
                :class="getLanguageStyles()"
                @click="setLocale('ru')" 
            >
                Рус
                <img 
                    v-if="this.languageMenuDesign === 1"
                    src="@/assets/img/arrow_up.png" 
                >
                <img 
                    v-else-if="this.languageMenuDesign === 2"
                    src="@/assets/img/arrow_up_sidebar.png" 
                >
            </div>
            <div 
                class="language"
                :class="getLanguageStyles()"
                @click="setLocale('ua')" 
            >
                Укр
            </div>
            <div 
                class="language"
                :class="getLanguageStyles()"
                @click="setLocale('en')" 
            >
                Eng
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    import arrow_down from '@/assets/img/arrow_down.png';
    import arrow_down_sidebar from '@/assets/img/arrow_down_sidebar.png';
    import arrow_up from '@/assets/img/arrow_up.png';
    import arrow_up_sidebar from '@/assets/img/arrow_up_sidebar.png';

	export default {
        name: 'LanguageMenu',
        
        //в зависимости от открытой страницы применяем соответствующие стили 
        props: {
			languageMenuDesign: Number
        },
        
        data () {
            return {
                languageMenuVisible: false
            }
        },

        computed: {
            ...mapGetters(['GET_CURRENT_LANGUAGE']) 
        },

		methods: {
			...mapMutations(['SET_CURRENT_LANGUAGE']),

            openLanguageMenu() {
                this.languageMenuVisible = true
            },

            getCurrentStyles() {
                switch (this.languageMenuDesign) {
                    case 1:
                        return {
                            main_design: true
                        }
                        break;
                    case 2:
                        return {
                            calendar_design: true
                        }
                        break;    
                }
            },
            
            getLanguageStyles() {
                switch (this.languageMenuDesign) {
                    case 1:
                        return {
                            language_main: true
                        }
                        break;
                    case 2:
                        return {
                            language_calendar: true
                        }
                        break;    
                }
            },

            getMenuStyles() {
                switch (this.languageMenuDesign) {
                    case 1:
                        return {
                            background: '#FFFFFF'
                        }
                        break;
                    case 2:
                        return {
                            background: '#201E6A'
                        }
                        break;    
                }
            },

			setLocale(locale) {
				import(`../../langs/${locale}.json`)
				.then((msg) => {
					this.$i18n.setLocaleMessage(locale, msg)
					this.$i18n.locale = locale;
				});
                this.SET_CURRENT_LANGUAGE(locale);
                this.languageMenuVisible = false
			}
		}
	}
</script>
