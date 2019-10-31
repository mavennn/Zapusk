<template>
	<div class="mfull" v-if="opened">
		
		<div v-for="(page, key) in pages" >
			
			<div class="mfull_block" :class="{open_animation: page.in_open, close_animation: page.close}" >
								
				<component :is="page.component" :data="page.data"  ></component>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	
	let arComp = [
	//	['search', 'desktop/Search/index'],
	]
	
	export default{
		
		data(){
			return {
				pages: [],
				opened: false,
				counter: 0,
				stack: [],
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
			
			open({type = 'standart', title = 'Детальная карточка', data = {}, component = '', use_header = true} = {}){
				if(this.closePromice)
					return this.closePromice.then(()=>this.open({type, title, data, component, use_header}))
				if(!component)
					throw new Error('Неверный компонент');
				this.counter++;
				this.opened = true;
				if(this.counter == 1){
					
				}else{
					let last = this.pages[this.pages.length - 1];
					last.in_next = true;
					timer(0.5).then( () => last.in_next = false)
				}
				this.pages.push({type, title, data, component, use_header, close: false})
				
				let en = this.pages[this.pages.length - 1];
				en.in_open = true;
				timer(0.5).then( () => en.in_open = false)
				
				document.querySelector('body').classList.add('mfull-open');
			},
			closeAll({fast = false} = {}){
				if(fast){
					this.pages = [];
					this.opened = false;
					this.counter = 0;
					this.stack = [];
					return;
				}
					
				if(this.counter == 0)
					return;
				if(this.pages.length == 1)
					return this.closeLast();
				
				this.pages.splice(0, this.pages.length - 1);
				this.counter = 1;
				this.closeLast();
			},
			closeLast(){
				this.counter--;
				this.pages[this.pages.length - 1].close = true;
				let closePromice = timer(0.5).then(data => this.pages.splice(this.pages.length - 1, 1))
				if(this.counter == 0){
					this.opened = false;
					this.closePromice = closePromice;
					this.closePromice.then(()=>(this.closePromice = false));
				}else{
					let last = this.pages[this.pages.length - 2];
					last.in_back = true;
					timer(0.5).then( () => last.in_back = false)
				}
				document.querySelector('body').classList.remove('mfull-open');
			}
			
		},
		computed:{
			
		}
		
	}
	
</script>

<style lang="scss">
	.mfull {
		.mfull_block {
			width: calc(100%);
		    height: 100%;
		    overflow: hidden;
		    margin: 0px;
		    position: fixed;
		    top: 0px;
		    left: 0px;
		    background: white;
		    z-index: 1100;
			overflow-y: scroll;
		}
	}
</style>