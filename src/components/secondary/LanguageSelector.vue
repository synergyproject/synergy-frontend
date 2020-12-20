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
	</div>
</template>

<script>
	export default {
		name: 'LanguageSelector',
		methods: {
			setLocale(locale) {
				import(`../../langs/${locale}.json`)
				.then((msg) => {
					this.$i18n.setLocaleMessage(locale, msg)
					this.$i18n.locale = locale;
				})
			}
		}
	}
</script>
