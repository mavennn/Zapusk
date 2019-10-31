<template>
	<div>
<!--
		<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">Panel with Tables</div>
                <div class="panel-wrapper collapse in">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center">1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <td align="center">2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <td align="center">3</td>
                                <td>Steave</td>
                                <td>Jobs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>		
-->
		<div class="row">
            <div class="col-sm-12">
                <div class="white-box">
                    <h3 class="box-title">Striped Table</h3>
                    <p class="text-muted">Всего проведено встреч: {{count_meetings}}</p>
                    <p class="text-muted">Всего участников: {{count_users}}</p>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Спикер</th>
                                    <th>Количество встреч</th>
                                    <th>Количество заявок на встречи</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="sp in speakers">
                                    <td>
	                                    <a @click.prevent="openDetail(sp._id)">{{sp.name}} {{sp.sname}}</a>
	                                </td>
                                    <td>
                                        {{sp.meetings ? sp.meetings.length : ''}}
                                    </td>
                                    <td>{{sp.requests ? sp.requests.length : ""}}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 class="box-title">Участники</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
	                                <th>Id</th>
                                    <th>ФИО</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>email</th>
                                    <th>Телефон</th>
                                    <th>Название организации</th>
                                    <th>Должность</th>
                                    <th>Роль</th>
									<th>Какие главные проблемы в Вашей организации/стране в развитии навыков?</th>
									<th>Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?</th>
									<th>Какие преграды Вы видите на пути к Вашим целям?</th>
									<th>ПРОДУКТЫ WSR</th>
									<th>Интересующие Страны</th>
									<th>Интересующие Виды сотрудничества</th>
									<th>Интересующие Отрасли</th>
									<th>Интересующие Лучшие практики</th>
									<th>Интересующие Роли</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="us in users">
									<th>{{us.ids}}</th>
                                    <th>{{us.name}} {{us.sname}}</th>
                                    <th><span v-if="us.country">{{tags[us.country].name}}</span></th>
                                    <th>{{us.city}}</th>
                                    <th>{{us.email}}</th>
                                    <th>{{us.phone}}</th>
                                    <th><span v-if="us.organization">{{us.organization.name}}</span></th>
                                    <th><span v-if="us.organization">{{us.organization.position}}</span></th>
                                    <th><span v-if="us.organization"><span v-if="us.organization.role">{{tags[us.organization.role].name}}</span></span></th>
									<th><span v-if="us.organization">{{us.organization.problems}}</span></th>
									<th><span v-if="us.organization">{{us.organization.perspectives}}</span></th>
									<th><span v-if="us.organization">{{us.organization.barriers}}</span></th>
									<th><span v-for="wsr in us.wsrProducts" v-if="us.wsrProducts">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.country">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.partnershipMode">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.industry">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.bestPractice">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership.role" v-for="wsr in us.partnership.role">{{tags[wsr].name + ', '}}</span></th>
                                </tr>
                                <tr>
	                                <th>Id</th>
                                    <th>ФИО</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>email</th>
                                    <th>Телефон</th>
                                    <th>Название организации</th>
                                    <th>Должность</th>
                                    <th>Роль</th>
									<th>Какие главные проблемы в Вашей организации/стране в развитии навыков?</th>
									<th>Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?</th>
									<th>Какие преграды Вы видите на пути к Вашим целям?</th>
									<th>ПРОДУКТЫ WSR</th>
									<th>Интересующие Страны</th>
									<th>Интересующие Виды сотрудничества</th>
									<th>Интересующие Отрасли</th>
									<th>Интересующие Лучшие практики</th>
									<th>Интересующие Роли</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 class="box-title">Спикеры</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
	                                <th>Id</th>
                                    <th>ФИО</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>email</th>
                                    <th>Телефон</th>
                                    <th>Название организации</th>
                                    <th>Должность</th>
                                    <th>Роль</th>
									<th>Какие главные проблемы в Вашей организации/стране в развитии навыков?</th>
									<th>Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?</th>
									<th>Какие преграды Вы видите на пути к Вашим целям?</th>
									<th>ПРОДУКТЫ WSR</th>
									<th>Интересующие Страны</th>
									<th>Интересующие Виды сотрудничества</th>
									<th>Интересующие Отрасли</th>
									<th>Интересующие Лучшие практики</th>
									<th>Интересующие Роли</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="us in speakerss">
									<th>{{us.ids}}</th>
                                    <th>{{us.name}} {{us.sname}}</th>
                                    <th><span v-if="us.country">{{tags[us.country].name}}</span></th>
                                    <th>{{us.city}}</th>
                                    <th>{{us.email}}</th>
                                    <th>{{us.phone}}</th>
                                    <th><span v-if="us.organization">{{us.organization.name}}</span></th>
                                    <th><span v-if="us.organization">{{us.organization.position}}</span></th>
                                    <th><span v-if="us.organization"><span v-if="us.organization.role"><span v-if="tags[us.organization.role]">{{tags[us.organization.role].name}}</span></span></span></th>
									<th><span v-if="us.organization">{{us.organization.problems}}</span></th>
									<th><span v-if="us.organization">{{us.organization.perspectives}}</span></th>
									<th><span v-if="us.organization">{{us.organization.barriers}}</span></th>
									<th><span v-for="wsr in us.wsrProducts" v-if="us.wsrProducts">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.country">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.partnershipMode">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.industry">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.bestPractice">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership.role" v-for="wsr in us.partnership.role">{{tags[wsr].name + ', '}}</span></th>
                                </tr>
                                <tr>
	                                <th>Id</th>
                                    <th>ФИО</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>email</th>
                                    <th>Телефон</th>
                                    <th>Название организации</th>
                                    <th>Должность</th>
                                    <th>Роль</th>
									<th>Какие главные проблемы в Вашей организации/стране в развитии навыков?</th>
									<th>Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?</th>
									<th>Какие преграды Вы видите на пути к Вашим целям?</th>
									<th>ПРОДУКТЫ WSR</th>
									<th>Интересующие Страны</th>
									<th>Интересующие Виды сотрудничества</th>
									<th>Интересующие Отрасли</th>
									<th>Интересующие Лучшие практики</th>
									<th>Интересующие Роли</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
					<h3 class="box-title">Не попали на собеседования</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
	                                <th>Id</th>
                                    <th>ФИО</th>
                                    <th>К спикеру</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>email</th>
                                    <th>Телефон</th>
                                    <th>Название организации</th>
                                    <th>Должность</th>
                                    <th>Роль</th>
									<th>Какие главные проблемы в Вашей организации/стране в развитии навыков?</th>
									<th>Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?</th>
									<th>Какие преграды Вы видите на пути к Вашим целям?</th>
									<th>ПРОДУКТЫ WSR</th>
									<th>Интересующие Страны</th>
									<th>Интересующие Виды сотрудничества</th>
									<th>Интересующие Отрасли</th>
									<th>Интересующие Лучшие практики</th>
									<th>Интересующие Роли</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="us in users_not_in">
									<th>{{us.ids}}</th>
                                    <th>{{us.name}} {{us.sname}}</th>
                                    <th>{{us.speaker}}</th>
                                    <th><span v-if="us.country">{{tags[us.country].name}}</span></th>
                                    <th>{{us.city}}</th>
                                    <th>{{us.email}}</th>
                                    <th>{{us.phone}}</th>
                                    <th><span v-if="us.organization">{{us.organization.name}}</span></th>
                                    <th><span v-if="us.organization">{{us.organization.position}}</span></th>
                                    <th><span v-if="us.organization"><span v-if="us.organization.role"><span v-if="tags[us.organization.role]">{{tags[us.organization.role].name}}</span></span></span></th>
									<th><span v-if="us.organization">{{us.organization.problems}}</span></th>
									<th><span v-if="us.organization">{{us.organization.perspectives}}</span></th>
									<th><span v-if="us.organization">{{us.organization.barriers}}</span></th>
									<th><span v-for="wsr in us.wsrProducts" v-if="us.wsrProducts">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.country">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.partnershipMode">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.industry">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership" v-for="wsr in us.partnership.bestPractice">{{tags[wsr].name + ', '}}</span></th>
									<th><span v-if="us.partnership.role" v-for="wsr in us.partnership.role">{{tags[wsr].name + ', '}}</span></th>
                                </tr>
                                <tr>
	                                <th>Id</th>
                                    <th>ФИО</th>
                                    <th>К спикеру</th>
                                    <th>Страна</th>
                                    <th>Город</th>
                                    <th>email</th>
                                    <th>Телефон</th>
                                    <th>Название организации</th>
                                    <th>Должность</th>
                                    <th>Роль</th>
									<th>Какие главные проблемы в Вашей организации/стране в развитии навыков?</th>
									<th>Какие перспективы/цели/возможности Вы видите для Вашей организации/страны?</th>
									<th>Какие преграды Вы видите на пути к Вашим целям?</th>
									<th>ПРОДУКТЫ WSR</th>
									<th>Интересующие Страны</th>
									<th>Интересующие Виды сотрудничества</th>
									<th>Интересующие Отрасли</th>
									<th>Интересующие Лучшие практики</th>
									<th>Интересующие Роли</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
	</div>
</template>

<script>
	
	export default{
		props: ['data'],
		data(){
			return {
				speakers: {},
				requests: {},
				count_users: {},
				count_meetings: {},
				users: {},
				tags: {},
				speakerss: {},
			}
		},
		created(){
			this.getStatic()
		},
		methods:{
			getStatic(){
				Request.postJson('/api/admin/static/get', {}).then(data => {
					this.speakers = data.speakersById
					this.speakerss = data.speakers
					this.requests = data.requests
					this.users = data.users
					this.count_users = data.count_users
					this.count_meetings = data.count_meetings
					this.tags = data.tags
					this.users_not_in = data.users_not_in
				}).catch(err => {
					swal('Ошибка', err, 'error');
				})
			},
			openDetail(id) {
                App.Mpage.open({component: 'speaker-detail-info', data: id})
			}
		},
		computed:{
		}
		
	}
	
</script>

<style lang="scss">

</style>