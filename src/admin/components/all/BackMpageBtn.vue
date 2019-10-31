<template>
<div>
	<button class="btn btn-panel btn-circle btn-lg panSpHeadBut" @click="back">
		<i class="fa fa-chevron-left"></i>
	</button>
</div>
</template>

<script>
	
	export default{
		
		data(){
			return {}
		},
		methods:{
			back(){ App.Mpage.closeLast() },
			closeAll() {App.Mpage.closeAll()}
		},
		
	}
	
</script>

<style lang="scss">
	.panSpHeadBut{
	    position: absolute;
	    left: 20px;
	    top: 20px;
    }
    #closeAll {
	    
    }
</style>