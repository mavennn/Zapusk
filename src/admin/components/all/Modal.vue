<template>
	<div>

		<template v-if="opened" >
			<div @click="onclose" ref="main_close" class="modal in" tabindex="-1" style="display: block; padding-left: 0px;">
			  <div v-for="(page,key) in pages" :key="page.token" @click="orClose(key, $event)" :class="{ mod_opacity: key != 0 }" class="modal-dialog modal-center" id="modal-dialog-desktop-center" :style="{width: page.width}">
			    <div class="modal-content modal_mpage" :style="{'min-height': page.min_height, 'background' : page.background}" >
				    <div class="modal-header" v-if="page.title">
					    <h4 class="modal-title">{{page.title}}</h4>
					</div>
				    
				    <div class="modal-body"  >
				        <component ref="childs" :is="page.component" :data="page.data"></component>
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
				pages: [],
				opened: false,
				can_close: true,
				need_back: true,
			}
		},
		components:{
			'add-user': () => App.Load.ComponentLoading('desktop/Users/Add'),	
			'add-book': () => App.Load.ComponentLoading('all/Books/add'),			
		},
		methods:{
			
			open({data = {}, component = '', can_close = true, width = "600px", min_height = '300px', background = 'white', need_back = false, title = false, prom} = {}){
				data.prom = prom;
				if(!component)
					throw new Error('Неверный компонент');
				
				this.counter++;
				this.opened = true;
				let token = genToken(false);
				this.pages.unshift({data, component, can_close, width, min_height, need_back, background, title, prom, token});

				document.querySelector('body').classList.add('modal-open');
			},
			
			
			close(){
				this.pages.shift();
				if(this.pages.length == 0){
					this.opened = false;
					document.querySelector('body').classList.remove('modal-open');
				}
					
				
				
			},
			onclose(e){
				if (e.target == this.$refs.main_close){
					if(this.$refs.childs[0])
						this.$refs.childs[0].$emit('modal-close');
					this.close();
				}
			},
			orClose(key, event){
				if(key != 0)
					this.close()
					
			}
		},
		computed:{

		}

	}

</script>

<style lang="scss">
	.modal-body {
		padding: 15px 15px 0;
	}
	.mod_opacity{
		opacity: 0.3
	}
</style>
