<template>
	<div>
		
		<template v-if="this.opened" >
			
			
			<div class="spage-block" :style="{'min-height': min_height}" >
				<div v-if="btn_close" class="spage-close" @click="close" ><div class="icon-close"></div></div>
				<component :is="page.component" :data="page.data"></component>
			</div>
			<div v-if="can_close" class="modal-backdrop in" @click="close"></div>
			<div v-else class="modal-backdrop in"></div>
		</template>
		
	</div>
</template>

<script>
		
	import LoadingComp from '@Components/mobile/Load.vue'
	
	let arComp = [
		['default', 'mobile/default'],
		['showcontact', 'mobile/ad/contact'],

	]
	
	export default{

		data(){
			return {
				page: {},
				opened: false,
				can_close: true,
				width: '600px',
				min_height: '300px',
				btn_close: true
			}
		},
		created(){
			arComp.forEach(val=>{
				this.$options.components[val[0]] = () => ({
					component: App.Load.Component(val[1]),
					loading: LoadingC,
					timeout: 30000,
					delay: 0,
				})
			})
		},
		components:{
			
		},
		methods:{
			
			open({data = {}, component = '', can_close = true, min_height = '200px', btn_close = true, prom} = {}){
				data.prom = prom;
				if(!component)
					throw new Error('Неверный компонент');
				this.opened = true;
				this.min_height = min_height;
				this.can_close = can_close;
				this.btn_close = btn_close;
				this.page = {data, component};
				document.querySelector('body').classList.add('modal-open');
			},
			close(){
				this.opened = false;
				document.querySelector('body').classList.remove('modal-open');
			},
			onclose(e){
				if(e.target == this.$refs.main_close && this.can_close)
					this.close();
			}
		},
		computed:{
			
		}
		
	}
	
</script>

<style lang="scss">
	.spage-block {
		position: fixed;
		bottom: 0;
		left: 0;
		width: calc(100% - 20px);
		z-index: 2500;
		background-color: #E4F1FF;
		padding: 10px;
		.spage-close{
			position: absolute;
		    right: 10px;
		}
		.icon-close {
		    background: url(/src/src/img/mobile/cancel.png) center no-repeat;
		    background-size: contain;
		    width: 15px;
		    height: 15px;
		}
	}
</style>






