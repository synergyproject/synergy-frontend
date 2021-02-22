<template>
	<div class="language-selector__wrapper">
		<a
			 class="language-selector__link"
			 href="#"
			 @click="setLocale('en')"
		>
			{{ 'EN' }}
		</a>
		<a
			 class="language-selector__link"
			 href="#"
			 @click="setLocale('ru')"
		>
			{{ 'RU' }}
		</a>
		<a
			 class="language-selector__link"
			 href="#"
			 @click="setLocale('ua')"
		>
			{{ 'UA' }}
		</a>
	</div>
</template>

<script>
	import { mapMutations} from 'vuex';

	export default {
		name: 'LanguageSelector',
		methods: {
			...mapMutations(['SET_CURRENT_LANGUAGE']),

			setLocale(locale) {
				import(`../../langs/${locale}.json`)
				.then((msg) => {
					this.$i18n.setLocaleMessage(locale, msg)
					this.$i18n.locale = locale;
				})
				this.SET_CURRENT_LANGUAGE(locale)
			}
		}
	}
</script>
