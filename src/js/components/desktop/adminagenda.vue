<template>

	<div class="skittles-meetings">
        <div class="sm-day" v-for="(d,key) in days" v-bind:key="'d'+key">
					<div class="smd-content">
						<div class="smdc-block" v-for="(b,key) in d.blocks" v-bind:key="'b'+key">
							<div class="smdcb-title">
								{{b.title}}<br/>
								<span>{{b.place}}</span>
							</div>
							<div class="smdcb-events">
								<div class="smdcbe-item" v-for="(ev,key) in b.events" v-bind:key="'ev'+key">
									<div class="smdcbei-event">
										<div class="smdcbeie-title">{{ev.title}}</div>
										<div class="smdcbeie-divider">
											<div class="smdcbeied-border"></div>
										</div>
										<div class="smdcbeie-time">{{ev.time}}</div>
									</div>
									<div class="smdcbei-person">
										<div class="smdcbeip-name">{{ev.speaker.name}} {{ev.speaker.sname}}</div>
										<div class="smdcbeip-company" v-if="ev.speaker.organization">&nbsp;| {{ev.speaker.organization}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="smd-date">{{d.date}}</div>
				</div>
				<div class="sm-logo"></div>
	</div>

</template>

<script>

	export default {
		data () {
			return {
				days: [
					{
						day: 1,
						date: 'august 24',
						blocks: [
							{
								title: 'Introductory',
								place: 'Conference Hall',
								events: []
							},
							{
								title: 'Presentations',
								place: 'Conference Hall',
								events: []
							},
						]
					},
					{
						day: 2,
						date: 'august 25',
						blocks: [
							{
								title: 'Introductory',
								place: 'Conference Hall',
								events: []
							},
							{
								title: 'Presentations',
								place: 'Conference Hall',
								events: []
							},
						]
					}
				]
			}
		},
		props:{
		},
		computed: {
		},
		created(){
			App.User.getSchedulle()
				.then(res=>{
					res.sort((a,b) => {
		                return a.time.split(':').join('') - b.time.split(':').join('')
	                })
					res.forEach(element => {
						if(element.type == 'introductory'){
							this.days[element.day - 1].blocks[0].events.push(element)
						}else if(element.type == 'speaker'){
							this.days[element.day - 1].blocks[1].events.push(element)
						}
					});
				})
		},
		methods: {
		},
		beforeDestroy(){

		},
		watch: {
	
		},
		components:{
		}
	}
	
</script>


<style lang="scss">
body {
	padding-bottom: 0!important;
}
.skittles-meetings{
    min-width: 1440px;
    min-height: 100vh;
    padding: 23px 75px;
		background: #132d75;
		color: white;
		.sm-day{
			display: flex;
			border-top: solid 1px #a8a8a8;
			padding-top: 14px;
			.smd-content{
				width: 70%;
				flex: 1;
				.smdc-block{
					border-top: 1px solid #a8a8a8;
					&:first-child{
						border: none;
					}
					display: flex;
					.smdcb-title{
						width: 36%;
						font-size: 20px;
						color: #c5c3c5;
						text-transform: uppercase;
						span{
							text-transform: initial;
							font-size: 16px;
						}
					}
					.smdcb-events{
						width: 64%;
						.smdcbe-item{
							width: 100%;
							margin-bottom: 13px;
							padding: 8px;
							.smdcbei-event{
								width: 100%;
								display: flex;
								.smdcbeie-title{
									font-size: 20px;
									text-transform: uppercase;
								}
								.smdcbeie-divider{
									flex: 1;
									padding: 14px;
									.smdcbeied-border{
										border-bottom: dashed 1px white;
										width: 100%
									}
								}
								.smdcbeie-time{
									font-size: 20px;
  								font-weight: 600;
								}
							}
							.smdcbei-person{
								display: flex;
								font-size: 16px;
								.smdcbeip-name{
									font-weight: 600;
								}
								.smdcbeip-company{
  								font-weight: 300;
								}
								.smdcbeip-current{
									color: #17479e;
									font-size: 16px;
									font-weight: 600;
									text-align: right;
									flex: 1;
									text-transform: uppercase;
								}
							}
							&.smdcbei-current{
								background: white;
								color: #132d75;
								.smdcbeie-divider{
									.smdcbeied-border{
										border-color: #132d75;
									}
								}
							}
						}
					}
				}
			}
			.smd-date{
				width: 30%;
				font-size: 32px;
				font-weight: bold;
				text-align: right;
				text-transform: uppercase;
			}
		}
		.sm-logo{
			background: url(/src/build/img/wsrlogo-01.png) center no-repeat;
			background-size: contain;
			position: fixed;
			width: 273px;
			height: 300px;
			right: 75px;
			bottom: 24px;
		}
}
</style>