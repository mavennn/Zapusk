<template>


		<div class="skittles-header">
			<div class="sh-items">
				<div class="shi-tab" :class="{'shit-active':tab == 'agenda'}" @click="goRoute('/agenda')">{{lang=='en'?'agenda':'повестка дня'}}</div>
				<div class="shi-tab" :class="{'shit-active':tab == 'speakers'}" @click="goRoute('/speakers')">{{lang=='en'?'speakers':'спикеры'}}</div>
				<div class="shi-tab" :class="{'shit-active':tab == 'schedulled'}" @click="goRoute('/schedulled')">{{lang=='en'?'schedulled meetings':'Встречи'}}</div>
			</div>
			<div class="sh-menu" @click="menu()"></div>
		</div>



</template>

<script>
	
	export default {
		data () {
			return {
			}
		},
		props:{
			tab: String,
			lang: {
				type: String,
				default: 'en'
			}
		},
		computed: {
		},
		created(){
		},
		methods: {
			menu(){
				this.$root.$emit('open_menu')
			}
		},
		beforeDestroy(){

		},
		watch: {
	
		},
		components:{

		}
	}
	
</script>


<style lang="scss" scoped>
.skittles-header{
	width: 100vw;
	padding: 0px 0px 0px 8px;
	display: flex;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	position: absolute;
	z-index: 1000;
	background: white;
	.sh-items{
		padding: 16px 0px 11px 0px;
		display: flex;
		flex: 1;
		.shi-tab{
			flex: 1;
			color: #838383;
			text-transform: uppercase;
			font-size: 14px;
			padding: 8px;
			white-space: nowrap;
			border: solid 1px transparent;
			text-align: center;
			&.shit-active{
				color: black;
				border: solid 1px #62b5e5;
			}
		}
	}
	.sh-menu{
		width: 47px;
		height: 60px;
		background: url(/src/build/img/menu.svg) center no-repeat;
		background-position: center;
	}
}
</style>