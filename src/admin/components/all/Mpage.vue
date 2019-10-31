<template>
	<div class="mpage">
		
		<div v-for="(page, key) in pages" >
			
			<div class="mpage_block" :class="{open_animation: page.in_open, close_animation: page.close}" >
				
				<div v-if="page.type == 'standart' && use_header" class="mpage_block_scroll">
					
					<div class="spHead panSpHead">
						<back_mpage></back_mpage>
						<div class="spHeadHeader panSpHeadHeader mt5">
							<span>{{page.title}}</span>
						</div>
					</div>
					<div class="spContent" >
						<component :is="page.component" :data="page.data" ></component>
					</div>
				</div>
				
				<component v-else :is="page.component" :data="page.data"  ></component>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	
	let arComp = [
		['some2', 'desktop/someModal1'],
		['speaker-detail', 'desktop/speakeredit'],
		['speaker-detail-info', 'desktop/speakerdetail'],
		['user-add', 'desktop/speakeradd'],
	]
	
	export default{
		
		data(){
			return {
				pages: [],
				opened: false,
				counter: 0,
				stack: [],
				use_header: false,
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
				this.use_header = use_header;
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
			}
			
		},
		computed:{
			
		}
		
	}
	
</script>

<style lang="scss">
	
	
	.btn-circle {
	  width: 30px;
	  height: 30px;
	  padding: 6px 0;
	  border-radius: 15px;
	  text-align: center;
	  font-size: 12px;
	  line-height: 1.428571429;
	}
	.btn-circle.btn-lg {
	  	width: 40px;
		height: 40px;
		padding: 10px 10px;
		border-radius: 20px;
		font-size: 18px;
		line-height: 1.33;
	}
	.btn-circle.btn-xl {
	  width: 70px;
	  height: 70px;
	  padding: 10px 16px;
	  border-radius: 35px;
	  font-size: 24px;
	  line-height: 1.33;
	}
	
	.btn-panel{
	    background: #444854;
		border: 1px solid #434652;
	}
	
	
	
	
	.mpage {
		position: relative;
		overflow: hidden;
		.mpage_block{
		top: 0px;
		right: 0px;
		position: fixed;
		height: 100%;
		width: 700px;
		background-color: #fff;
		box-shadow: 0 0 9px rgba(0,0,0,0.3);
		z-index: 1005;
	    overflow-x: hidden;
	    overflow-y: scroll;
		.spContent{
			padding: 20px;
		}
		
		.panSpHead{
			position: relative;
		    height: 80px;
		    background-color: #4f5467;
		    text-align: center;
		    padding-top: 25px;
		    .panSpHeadHeader{
			    font-size: 25px;
			    color: #fff;
		    }
		    .panSpHeadHeaderSm{
			    font-size: 15px;
				margin-top: -5px;
		    }
			
		}
		
		
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
	
	
	
	
</style>






