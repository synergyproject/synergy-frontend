<template>
    <div class="modal-backdrop" v-show="this.visible">
		<div class="modal-content">
			<div class="cross" v-on:click="close()">
				<img src="../../assets/img/off_close.png">
			</div>
			<slot name="modal-content"></slot>
		</div>		
	</div>
</template>

<script>
	import off_close from '../../assets/img/off_close.png';

	export default {
		name: 'modal',
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

<style scoped>
	.modal-backdrop  {
		background: rgba(0,0,0,.4);
		display: flex;
  		justify-content: center;
  		align-items: center;
		position: absolute;
        z-index: 999;
        left: 0px;
        top: 0px;
        bottom: 0px;
        right: 0px;
		backdrop-filter: blur(3px);
	}
	.modal-content {
		position: fixed;
		top: 252px;
	}
	.cross {
		position: absolute;
	    width: 20px;
	    height: 20px;
	    right: 14px;
	    top: 13px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    cursor: pointer;
	}    
</style>