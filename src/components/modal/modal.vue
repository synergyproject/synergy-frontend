<template>
    <div class="modal-backdrop" v-show="this.visible">
		<div class="modal-content">
			<div class="cross" v-on:click="close()">
				<img src="@/assets/img/off_close.png">
			</div>
			<slot name="modal-content"></slot>
		</div>		
	</div>
</template>

<script>
	import off_close from '@/assets/img/off_close.png';

	export default {
		name: 'Modal',
		props: {
			visible: Boolean
		},
		methods: {
			close() {
			    this.$emit('close')
			}
		}
	}
</script>
