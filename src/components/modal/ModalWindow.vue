<template>
    <div class="modal-backdrop">
		<div class="modal-content">
			<div
				class="cross" 
				@click="close()"
			>
				<img src="@/assets/img/off_close.png">
			</div>
			<slot></slot>
		</div>		
	</div>
</template>

<script>
	import off_close from '@/assets/img/off_close.png';

	export default {
		name: 'ModalWindow',
		methods: {
			close() {
			    this.$emit('close')
			}
		}
	}
</script>
