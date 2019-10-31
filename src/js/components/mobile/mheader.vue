<template>


		<div class="skittles-header">
			<div v-if="back" class="sh-back" @click="Kek()">
				<i class="fa fa-angle-left" aria-hidden="true" ></i>
				{{lang=='en'?'back':'назад'}}
			</div>
			<div class="sh-items">
				<div class="shi-tab shit-active">{{name}}</div>
			</div>
			<div v-if="rmenu" class="sh-menu" @click="menu()"></div>
		</div>



</template>

<script>
	
	export default {
		data () {
			return {
				lang: 'en'
			}
		},
		props:{
			back: {
				type:Boolean,
				default: true
			},
			rmenu: {
				type:Boolean,
				default: true
			},
			name: String,
			tab: String
		},
		computed: {
		},
		created(){
			this.lang = localStorageProxy.getItem('lang')
		},
		methods: {
			menu(){
				this.$root.$emit('open_menu')
			},
			Kek(){
				App.Mpage.closeLast()
				App.Router.push('/')
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
	display: flex;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	position: absolute;
	z-index: 1000;
	background: white;
	.sh-back{
		padding: 20px 16px;
		text-transform: uppercase;
		color: #838383;
		font-size: 14px;
		.fa-angle-left{
			font-size: 18px;
		}
	}
	.sh-items{
		padding: 16px 0px 11px 0px;
		flex: 1;
		.shi-tab{
			color: #838383;
			text-transform: uppercase;
			font-size: 14px;
			padding: 8px;
			margin: 0 auto;
			white-space: nowrap;
			border: solid 1px transparent;
			text-align: center;
			width: fit-content;
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