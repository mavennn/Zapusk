<template>

	<div>
		
		<section class="banner">
			<div class="h1 bold"><h1>Доставка продуктов</h1> Быстро. Вовремя. Выгодно. </div>
		</section>
				
	</div>

</template>

<script>
	
	export default {
		name: 'mainpage',
		data () {
			return {
				
			}
		},
		props:{
			search: Object,
		},
		computed: {
		},
		watch: {

		},
		methods: {

		},
		created(){

		},
		beforeDestroy(){

		},
		components:{

		}
	}
	
</script>


<style lang="scss">
	
#main_page_search{
	text-align: center;
	display: block;
    margin: 0 auto;
    padding: 0 15px !important;
	.catalog_btn {
		height: 45px;
		float: left;
		width: 16%;
	}
	#search_input_div {
		display: inline-block;
		float: left;
		margin-left: 1%;
		width: 83%;
		&.future_sale {
			width: 51%;
		}
	}
	#selectFutureSale {
		float: left;
		margin-left: 1%;
		width: 31%;
		height: 45px;
	}
	&.category_search {
		margin-top: 30px;
		padding-left: 15px !important;
		padding-right: 15px !important;
	}
}
section.banner:before {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 50px;
    background: white;
    margin-top: -50px;
}

</style>