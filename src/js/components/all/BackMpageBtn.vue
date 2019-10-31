<template>
		<button class="btn btn-panel btn-circle btn-lg panSpHeadBut" @click="back">
			<i class="fa fa-chevron-left"></i>
		</button>
</template>

<script>
	
	export default{
		
		data(){
			return {}
		},
		methods:{
			back(){ App.Mpage.closeLast() }
		},
		
	}
	
</script>

<style lang="scss">
	.panSpHeadBut{
	    position: absolute;
	    left: 20px;
	    top: 20px;
    }
</style>