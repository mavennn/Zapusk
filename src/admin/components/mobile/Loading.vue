<template>
	<div class="loader" >
		<div class="lb_ball-clip-rotate"><div></div></div>
	</div>
</template>

<script>
	
	export default{
		data(){return {}},	
	}
</script>
<style lang="scss" scoped>
	.loader{
		position: relative;
		.lb_ball-clip-rotate{
			position: absolute;
		    top: 50%;
		    left: 50%;
		    margin: -25px 0 0 -25px;
		}
	}
</style>