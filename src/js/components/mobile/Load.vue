<template>

	<div class="load_block" >
		
		<div class="loader_icon rotate_it" ></div>
		
	</div>

</template>

<script>
	
	export default {
		name: 'load',
		data () {
			return {}
		},
		create: function(){
			console.log('LoadComponent start');
		}
	}
	
</script>


<style lang="scss" >

.load_block{
	
	position: fixed;
	height: 100%;
	width: 100%;
	z-index:100;
	top: 0;
	left: 0;
	background-color: #fff;
	
	.loader_icon{
		position: fixed;
		background-image: url('/src/loader.svg');
		z-index: 101;
		top: 50%;
	    left: 50%;
	    width: 70px;
	    height: 70px;
	    margin-left: -35px;
	    margin-top: -35px;
	    background-position: center;
	    background-repeat: no-repeat;
	}
	
	
	
}

</style>