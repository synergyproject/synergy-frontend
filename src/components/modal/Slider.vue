<template>
    <hooper :itemsToShow="1.3" :centerMode="true" :mouseDrag="true">
		<slide v-for="(slide, indx) in img" :key="indx" :index="indx" :style="{backgroundImage:`url(${slide})`}">
		</slide>
		<hooper-pagination slot="hooper-addons"></hooper-pagination>

	</hooper>
</template>

<script>
	import { Hooper, Slide,  Pagination as HooperPagination } from 'hooper';
	import 'hooper/dist/hooper.css';

	export default {
		name: 'Slider',
		props:['img'],
		components: {
			Hooper,
			Slide,
			HooperPagination
		},
		methods: {
			
		}
	}
</script>
