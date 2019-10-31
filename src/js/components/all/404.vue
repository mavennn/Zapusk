<template>
	<div>
		<div class="not_found_block" >
			<div class="text-center error404">404</div>
			<div class="text-center error404text">Увы, такой страницы не существует(</div>
			<div class="text-center" style="margin-top: 10px;">
				<a @click="toMain" class="btn btn-primary">На главную</a>
			</div>
		</div>
		
	</div>
</template>

<script>
	
	export default{
		
		data(){
			return {}
		},
		methods: {
			toMain(){
				App.Router.push('/')
			}
		}
		
	}
	
</script>

<style lang="scss">
	
	
	
</style>