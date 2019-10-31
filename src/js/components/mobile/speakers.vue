<template>

	<div>
		<MainHeader :lang="lang" tab="speakers"/>
		<div class="speakers-content">
			<div class="sc-item" @click="goRoute('/speaker/'+sp._id)" :class="{'sci-current': key == current}" v-for="(sp,key) in speakers" v-bind:key="'speaker_'+key">	
				<div class="sci-img" style="background-size: cover;" :style="getImg(sp.photo)"></div>
				<div class="sci-desc">
					<div class="scid-name">{{sp.name}} {{sp.sname}}</div>
					<div class="scid-company">{{sp.organization.name}}{{sp.country ? ', ' + sp.country : ''}}</div>
				</div>
				<div class="sci-status" v-if="key == current">{{lang=='en'?'current':'текущий'}}<br>{{lang=='en'?'speaker':'спикер'}}</div>
			</div>
		</div>
		<div v-if="(permission == 'admin' || permission == 'user') && current" class="speakers-btn" @click="sendRequest()">{{lang=='en'?'make an appointment':'записаться на собеседование'}}</div>
		<SpeakerMessage />
	</div>



</template>

<script>
	import MainHeader from './main_header.vue'
	import SpeakerMessage from './smessage.vue'
	export default {
		data () {
			return {
				permission: 'user',
				current: null,
				events: [],
				lang: 'en',
				speakers: [
					// {
					// 	img: 'https://static.365info.kz/uploads/2019/03/a346a3729504594579883eeb12a38d80.jpg',
					// 	name: 'Anjali Joshi',
					// 	company: 'DS College, India',
					// 	current: true
					// },
				],
			}
		},
		props:{
		},
		computed: {
		},
		created(){
            this.lang = localStorageProxy.getItem('lang')
            this.permission = JSON.parse(localStorageProxy.getItem('user')).permission
			this.getSpeakers()
			
		},
		methods: {
			getSpeakers2(){
				this.speakers = []
				App.User.getSchedulle()
				.then(res=>{
					res.forEach(element => {
						if(element.type == 'speaker' && element.day == 2){
							this.speakers2.push(element)
						}
					});
				})	
			},
			getImg(url){
				if (url)
					return `background: url(${url}) center no-repeat;background-size:cover;`
				else
					return `background: url(http://dummyimage.com/100) center no-repeat;background-size:cover;`
			},
			getSpeakers() {
				Request.postJson('/api/user/getSpeakerListShort').then(data=>{
					this.speakers = data// .filter(v => v.)
					App.User.getSchedulle()
						.then(res=>{
							res.forEach(element => {
								if(element.type == 'speaker' && element.day == 2){
									this.events.push(element)
								}
							});
							this.speakers = this.speakers.map(s=>{
								s.timeday = '23:59'
								s.dateday = 3
								s.dt = '32359'
								this.events.forEach(ev=>{
									if(ev.speaker.name == s.name && ev.speaker.sname == s.sname){
										s.timeday = ev.time
										s.dateday = ev.day
										s.dt = `${ev.day}`+ev.time.replace(':','')
									}
								})
								return s
							})
							this.speakers.sort((a,b)=>{
								return Number(a.dt) - Number(b.dt)
							})
							let getit = true
							this.speakers.forEach((item,i)=>{
								if(item.recording_status.day2 == 2 && getit){
									console.log(i)
									this.current = i
									getit = false
								}
							})
							console.log('this.speakers',this.speakers)

/*
							this.speakers = this.speakers.filter(v => {
//								console.log(v)
//								return true
								return v.dateday == 3
							})
*/

						})
				}).catch(data=>{
					swal('Error',data,'error');
				})
			},
			smessage(){
				this.$root.$emit('smessage',false)
			},
            sendRequest() {
				if(this.current){
					Request.postJson('/api/user/appointment/make', { speakerId: this.speakers[this.current]._id }).then(data => {
	                    swal('Success', 'Request sent successfully', 'success')
	                }).catch(err => {
						if (err == 'feedback'){
							this.smessage()
						} else {
							swal('Info', err, 'info')	
						}
	                })
				}
                
            }
		},
		beforeDestroy(){

		},
		watch: {
	
		},
		components:{
			MainHeader,
			SpeakerMessage
		}
	}
	
</script>


<style lang="scss">
.speakers-content{
	padding-top: 60px;
	padding-bottom: 60px;
	.sc-item{
		padding: 10px 16px;
		display: flex;
		font-size: 12px;
		.sci-img{
			width: 42px;
			height: 42px;
			background-size: cover!important;
		}
		.sci-desc{
			flex: 1;
			padding: 0 12px;
			line-height: 19px;
			.scid-name{
				color: #17479e;
			}
			.scid-company{
				color: #003b5c;
				font-weight: 600px;
			}
		}
		.sci-status{
			color: white;
			font-size: 10px;
			text-transform: uppercase;
			padding: 7px 0;
		}
		&.sci-current{
			background: #62b5e5;
		}
	}
}
.speakers-btn{
	position: fixed;
	bottom: 0;
	width: 100vw;
	background: #62b5e5;
	color: white;
	text-transform: uppercase;
	text-align: center;
	font-size: 14px;
	padding: 11px 0;
}
</style>