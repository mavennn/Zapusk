<template>
	<div>
		<section id="wrapper" class="login-register">
		  <div class="login-box">
		    <div class="white-box">
		      <form class="form-horizontal form-material" id="loginform">
		        <h3 class="box-title m-b-20">Восстановить пароль</h3>
		        <div class="form-group ">
		          <div class="col-xs-12">
		            <input class="form-control" type="email" required="" v-model="email" placeholder="Введите Email">
		          </div>
		        </div>
		        <div class="form-group text-right m-t-20">
		          <div class="col-xs-12">
		            <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="button" @click="send">Отправить</button>
		          </div>
		        </div>
		      </form>
		    </div>
		  </div>
		</section>

	</div>
</template>

<script>
	
	export default {
		
		data(){
			return {
				email: "",
			}
		},
		components:{
			
		},
		methods:{
			send(){
				User.forgot(this.email);
			},
			goAuth(){
				this.$parent.$emit('goTab',"auth");
			}
		},
		computed:{
			
		}
		
	}
	
</script>

<style lang="scss">
	
	
	
</style>