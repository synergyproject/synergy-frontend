<template>
    <div class="modal-backdrop" v-show="this.visible">
		<div class="modal-content">
			<div class="cross" v-on:click="close()">
				<div></div>
				<div></div>
			</div>
			<slot name="modal-content"></slot>
		</div>		
	</div>
</template>

<script>
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
	* {
		display: flex;
  		justify-content: center;
  		align-items: center;
  		flex-direction: column;
	}
	.modal-backdrop  {
		position: fixed;
        z-index: 999;
        left: 0px;
        top: 0px;
        bottom: 0px;
        right: 0px;
		background: rgba(0, 0, 0, 0.7);
	}  
	/*размер окна будет зависить от подключаемого контента*/
	.modal-content {
		position: fixed;
		top: 100px;
	}
	.cross {
		position: absolute;
	    width: 20px;
	    height: 20px;
	    right: 5px;
	    top: 5px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    cursor: pointer;
	}    
	.cross div {
   		width: 17px;
   		height: 1px;
   		background-color: black;
   		position: absolute;
   	}	
   	.cross	div:first-child {
   		transform: rotate(45deg);
   	}
   	.cross	div:last-child {
   		transform: rotate(-45deg);
   	}
   	.cross:hover div {
   		width: 19px;
   		height: 2px;
   	}
</style>