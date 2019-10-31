<template>

	<div id="lc_block" v-if="show" >
		
		<div class="lc_lost_text" >Нет соединения</div>
		
		<div class="lc_lost_retry" onclick="Request.LCResolve(true)" >Повторить</div>
		<div class="lc_lost_cancel" onclick="Request.LCResolve(false)" >Отменить</div>
		
	</div>

</template>
<script>
	
	export default{
		data(){return {
			show: true
		}},
		hideLC(){
			this.show = false;
		}
	}
	
	
</script>

<style>

#lc_block{
	pointer-events: auto;
	position: fixed;
	height: 50px;
    padding: 16px 20px;
	width: 100%;
	z-index: 5000;
	background-color: #00CD55;
	bottom: 0px;
	color: #fff;
}
.lc_lost_text{
	opacity: 0.5;
	float: left;
}
.lc_lost_retry{
	float: right
}
.lc_lost_cancel{
	float: right;
	opacity: 0.5;
	margin-right: 10px;
}

</style>