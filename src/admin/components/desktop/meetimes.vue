<template>
	<div  >
		
		<h3>Редактирование митингов</h3>
		<div v-for="sp in speakers" class="int">
			<div v-for="tt in sp" class="row">
				{{tt.time}}
			</div>
		</div>
<!--
		<table>
			<tr>
				<td v-for="tt in times">{{tt}}</td>
			</tr>
			<tr v-for="">
				
			</tr>
		</table>
-->
		
		
	</div>
</template>

<script>
	
	export default{
		props: ['data'],
		data(){
			return {
				meetings: {},
				users: {},
				times: ['12:07','12:17','12:27','12:37','12:47','13:02','13:12','13:22','13:32','13:42'],
				speakers: {},
			}
		},
		created(){
			this.getMeetings()
		},
		methods:{
			getMeetings() {
				Request.post('/meetings/list').then(data => {
					this.meetings = data.meetings
					this.users = data.users
					this.speakers = {}
					this.meetings.map(val => {
						if(!this.speakers[val.speaker])
							this.speakers[val.speaker] = []
						this.speakers[val.speaker].push(val)
					})
				})
			},
			// проходим по всем записавшимся к спикеру по очереди
			// проверить имеет ли чувак дубли - проходим по всем спикерам и смотрим кто на это время, если есть он, то его убираем обратно
			// если чувак имеет дубли, тогда его переносим на следующее время и запускаем сначала
/*
			var abc = this.speakers;
			this.speakers[0].forEach((val,key) => {
				if (this.speakers[1][0].user == val.user){
					let paras = this.speakers[0][key]
					this.speakers[0][key] = this.speakers[0][key + 1]
					this.speakers[0][key + 1] = paras
				}
			})
*/
			
			
			
			
			
		},
		computed:{
		}
		
	}
	
</script>

<style lang="scss">

</style>