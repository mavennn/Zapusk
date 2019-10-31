<template>
	<div>
		<section id="wrapper" class="login-register">
		  <div class="login-box">
		    <div class="white-box">
		      <form class="form-horizontal form-material" id="loginform">
		        <h3 class="box-title m-b-20">Восстановление пароля</h3>
		        <div class="form-group ">
		          <div class="col-xs-12">
		            <input class="form-control" type="text" required="" v-model="token" placeholder="token" disabled>
		          </div>
		        </div>
		        <div class="form-group">
		          <div class="col-xs-12">
		            <input class="form-control" type="password" v-model="password" required="" placeholder="Пароль">
		          </div>
		        </div>
		        <div class="form-group">
		          <div class="col-xs-12">
		            <input class="form-control" type="password" v-model="re_password" required="" placeholder="Повторите пароль">
		          </div>
		        </div>
		        <div class="form-group text-right m-t-20">
		          <div class="col-xs-12">
		            <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="button" @click="send">Подтвердить</button>
		          </div>
		        </div>
		      </form>
		    </div>
		  </div>
		</section>

	</div>
</template>

<script>
	
	export default{
		props:["token"],
		data(){
			return {
				password: '',
				re_password: '',
			}
		},
		components:{
			
		},
		methods:{
			send(){
				if(this.password.length < 6)
					return swal("Ой..", 'Длина пароля должна быть больше 6 символов', 'error');

				if(this.password != this.re_password)
					return swal("Ой..", 'Пароли не совпадают', 'error');
				
				User.changePass(this.token,this.password);
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