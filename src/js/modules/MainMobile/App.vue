<template>
	<div id="main_app">
		<Meetings v-if="page == 'meetings'"/>
		<MeetingHall v-if="page == 'hall'"/>
		<AdminAgenda v-if="page == 'adminagenda'"/>
		<Agenda v-if="page == 'agenda'" />
		<Speakers v-if="page == 'speakers'" />
		<Schedulled v-if="page == 'schedulled'" />
		<Sign v-if="page == 'sign'" />
		<mpage ref="mpage"></mpage>
		<HalfMenu v-if="page !== 'sign'"/>
		<spage ref="spage"></spage>
	</div>

</template>


<script>

	import Mpage from '@Components/mobile/Mpage.vue'
	import Spage from '@Components/mobile/Spage.vue'

	import Agenda from '@Components/mobile/agenda.vue'
	import Speakers from '@Components/mobile/speakers.vue'
	import Schedulled from '@Components/mobile/schedulled.vue'
	import HalfMenu from '@Components/mobile/halfmenu.vue'
	import Sign from '@Components/mobile/sign.vue'

	import Meetings from '@Components/desktop/meetings.vue'
	import MeetingHall from '@Components/desktop/meetinghall.vue'
	import AdminAgenda from '@Components/desktop/adminagenda.vue'
	
	Vue.mixin({
		methods: {
			goRoute(link) {
				App.Router.push(link);
			},
			
		}
	})
	
	export default {
		data () {
			return {
				page: 'main',
				active_menu: false,
			}
		},
		components: {
			'not-found': () => App.Load.ComponentLoading('all/404'),
			Mpage,
			Spage,
			Agenda,
			Speakers,
			Schedulled,
			HalfMenu,
			Sign,
			Meetings,
			MeetingHall,
			AdminAgenda
		},
		created(){
 			App.Router.Emitter.on('main', data => {this.page = 'main'; data.next()} )
 			App.Router.Emitter.on('agenda', data => {this.page = 'agenda'; data.next()} )
 			App.Router.Emitter.on('speakers', data => {this.page = 'speakers'; data.next()} )
 			App.Router.Emitter.on('schedulled', data => {this.page = 'schedulled'; data.next()} )
 			App.Router.Emitter.on('sign', data => {this.page = 'sign'; data.next()} )
 			App.Router.Emitter.on('meetings', data => {this.page = 'meetings'; data.next()} )
 			App.Router.Emitter.on('hall', data => {this.page = 'hall'; data.next()} )
 			App.Router.Emitter.on('adminagenda', data => {this.page = 'adminagenda'; data.next()} )
		},
		methods:{
		},
		mounted(){
			App.Router.push(window.location.pathname + window.location.search);
			document.querySelector('body').style.overflow = '';
		}
	}
	
</script>

<style lang="scss">
body{
	margin: 0;
}
</style>