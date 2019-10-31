<template>
	<div>

		<template v-if="opened" >
			<div @click="onclose" ref="main_close" class="modal in" tabindex="-1" style="display: block; padding-left: 0px;">
			  <div @click.prevent class="modal-dialog modal-center" id="modal-dialog-desktop-center" :style="{width: width}">
			    <div class="modal-content modal_mpage" :style="{'min-height': min_height}" >
				    <div class="modal-header" v-if="title">
					    <h4 class="modal-title">{{title}}</h4>
					</div>
				    <div v-if="can_close" type="button" class="close pm_close" v-on:click="close">
				        <span aria-hidden="true">×</span>
				    </div>
				    <div class="modal-body">
				        <component ref="child" :is="page.component" :data="page.data"></component>
				    </div>
			    </div>
			  </div>
			</div>
			<div class="modal-backdrop in"></div>
		</template>

	</div>
</template>

<script>

	import LoadingComp from '@Components/mobile/Load.vue'

	export default{

		data(){
			return {
				page: {},
				opened: false,
				can_close: true,
				width: '600px',
				min_height: '300px',
				need_back: true,
				title:false
			}
		},
		components:{
			'signin': () => App.Load.ComponentLoading('all/signIn'),
			'signup': () => App.Load.ComponentLoading('all/signUp'),
			'payment': () => App.Load.ComponentLoading('all/payment'),
			'contact': () => App.Load.ComponentLoading('all/contact'),
		},
		methods:{

			open({data = {}, component = '', can_close = true, width = "550px", min_height = '300px', need_back = false, title = false, prom} = {}){
				data.prom = prom;
				if(!component)
					throw new Error('Неверный компонент');
				this.opened = true;
				this.width = width;
				this.need_back = need_back;
				this.min_height = min_height;
				this.can_close = can_close;
				this.title = title;
				this.page = {data, component};
				document.querySelector('body').classList.add('modal-open');
			},
			close(){
				this.opened = false;
				document.querySelector('body').classList.remove('modal-open');
				if(this.need_back)
					App.Router.back();
			},
			onclose(e){
				if (e.target == this.$refs.main_close){
					this.$refs.child.$emit('modal-close');
					this.close();
				}
			}
		},
		computed:{

		}

	}

</script>

<style lang="scss">
	.modal-content{
		border-radius: 0;
	}
	.modal-body {
		padding: 15px 15px 0;
	}
	.pm_close{
		position: absolute;
	    right: 30px;
	    top: 30px;
	    font-size: 42px;
	    padding: 0;
	    font-weight: 100;
	    cursor: pointer;
	    line-height: 32px;
	    z-index: 99;
	}
</style>
