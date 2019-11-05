<template>
	<div>
		<section id="wrapper" class="login-register">
		  <div class="login-box">
		    <div class="white-box">
		      <form class="form-horizontal form-material" id="loginform">
		        <h3 class="box-title m-b-20">Войти</h3>
		        <div class="form-group ">
		          <div class="col-xs-12">
		            <input class="form-control" type="text" required="" v-model="user.email" placeholder="E-Mail">
		          </div>
		        </div>
		        <div class="form-group">
		          <div class="col-xs-12">
		            <input class="form-control" type="password" v-model="user.password" required="" placeholder="Пароль">
		          </div>
		        </div>
		        <div class="form-group text-right m-t-20">
		          <div class="col-xs-12" style="display: flex;">
		            <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="button" @click="send">Войти</button>
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
		props:['page'],
		data(){
			return {
				user: {
					email: '',
					password: '',
				}
			}
		},
		components:{
			
		},
		methods:{
			send(){
				
				User.login(this.user.email,this.user.password);
				
			},
			goForgot(){
				this.$parent.$emit('goTab',"forgot");
			},
		},
		computed:{
			
		}
		
	}
	
</script>

<style lang="scss">
	
	#regBtn {
		cursor: pointer;
	    width: 100%;
	    line-height: 45px;
	}
	.forgot-btn{
		cursor: pointer;
	}
	
</style>
