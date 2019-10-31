<template>
	<div>
		
		<div v-for="(page, key) in pages" v-if="!page.close">
			
			<div class="mpage_block" :class="{open_animation: page.in_open, close_animation: page.close, next_back_an: page.in_back, next_an: page.in_next, mpage_not_active: key != (pages.length - 1)}" >
				
				
				<div  v-if="page.type == 'standart'" class="mpage_block_scroll">
					<mheader :rmenu="page.menu" :name="page.title" :back="page.back" v-if="page.use_header"></mheader>
					<component :is="page.component" :data="page.data" ></component>
				</div>
				
				<component  v-else :is="page.component" ></component>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	
	import LoadingComp from '@Components/mobile/Load.vue'
	
	let arComp = [

		['profile', 'mobile/profile'],
		['person', 'mobile/person'],
		['edit', 'mobile/edit'],
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
			
			open({type = 'standart', title = '', data = {}, component = '', use_header = true, back = true, menu = true} = {}){
				if(this.closePromice)
					return this.closePromice.then(()=>this.open({type, title, data, component, use_header, back, menu}))
				if(!component)
					throw new Error('Неверный компонент');
				this.counter++;
				this.opened = true;
				if(this.counter == 1){
					document.getElementById('main_app').classList.add('not_scroll');
				}else{
					let last = this.pages[this.pages.length - 1];
					last.in_next = true;
					timer(0.5).then( () => last.in_next = false)
				}
				this.pages.push({type, title, data, component, use_header, close: false, back, menu})
				if(this.pages.length>1)
					this.pages[this.pages.length - 2].close = true;
				let en = this.pages[this.pages.length - 1];
				en.in_open = true;
				timer(0.5).then( () => en.in_open = false)
				
				
			},
			closeAll(){
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
					document.getElementById('main_app').classList.remove('not_scroll');
					this.opened = false;
					this.closePromice = closePromice;
					this.closePromice.then(()=>(this.closePromice = false));
				}else{
					let last = this.pages[this.pages.length - 2];
					last.in_back = true;
					timer(0.5).then( () => last.in_back = false)
				}
			}
			
		},
		computed:{
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.mpage_block{
		top: 0px;
		left: 0px;
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: #fff;
		z-index: 1000;
		
		&.mpage_not_active{
			pointer-events: none;
		}
		
		.mpage_block_scroll{
			position: absolute;
			height: 100%;
			width: 100%;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			height: 100%;
		    background: #fff;
		}
		
		&.close_animation{
			animation: close_mpage 0.6s;
		}
		
		&.open_animation{
			animation: open_mpage 0.6s;
		}
		
		&.next_an{
			animation: next_an 0.6s;
		}
		
		&.next_back_an{
			animation: next_back_an 0.6s;
		}
		
	}
	
	
	
	@keyframes  open_mpage {
		0%{
			transform:translateX(100%)
		}
		80% {
			transform:translateX(0%)
		}
		100% {
			transform:translateX(0%)
		}
	}
	
	
	@keyframes  close_mpage {
		0%{
			transform:translateX(0%)
		}
		80% {
			transform:translateX(100%)
		}
		100% {
			transform:translateX(100%)
		}
	}
	
	@keyframes  next_back_an {
		0%{
			transform:translateX(-100%);
		}
		80% {
			transform:translateX(0%)
		}
		100% {
			transform:translateX(0%)
		}
	}
	
	@keyframes next_an {
		0%{
			transform:translateX(0%)
		}
		80% {
			transform:translateX(-100%);
		}
		100% {
			transform:translateX(-100%);
		}
	}
	
	
	
</style>






