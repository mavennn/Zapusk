<template>
	<div class="load_block" >
		<div class="loader" >
			<div class="ball-clip-rotate"><div></div></div>
		</div>
	</div>
</template>

<script>
	
	export default{
		data(){return {}},	
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
}
</style>