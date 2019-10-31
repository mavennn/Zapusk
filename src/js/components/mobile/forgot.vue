<template>

	<div class="skittles-login">
		<div class="sl-input">
            <div class="sli-label">EMAIL:</div>
            <input class="sli-val" type="email" v-model="email">
        </div>
        <div class="forgot" @click="forgot()"> {{lang == 'en'?"restore":"восстановить"}}</div>
	</div>



</template>

<script>
import swal from 'sweetalert2';
	export default {
		data () {
			return {
                intype: 'number',
                id: '',
                pin: '',
                email: '',
			}
		},
		props:{
            lang: {
                type: String,
                default: 'en'
            }
		},
		computed: {
		},
		created(){
		},
		methods: {
            forgot(){
                Request.postJson('api/forgot', {email: this.email}).then(val => {
                    swal('success','Password and pin sent to your email', 'success')
                }).catch(err => {
                    swal('error', err, 'error')
                })
            }
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
.forgot{
    border: solid 1px #62b5e5;
    transition: .1s;
    white-space: nowrap;
    color: white;
    text-transform: uppercase;
    padding: 7px 8px;
    margin: 0 7px;
    font-size: 14px;
    font-weight: 100;
    text-align: center;
}
.skittles-login{
    margin: 87px auto 0;
    width: 216px;
    .sl-input{
        display: flex;
        border-bottom: 2px solid white;
        color: white;
        font-family: 'Montserrat';
        font-size: 14px;
        font-weight: 100;
        margin-bottom: 17px;
        .sli-label{
            text-transform: uppercase;
            line-height: 40px;
            width: 28px;
        }
        .sli-val{
            background: transparent;
            border: none !important;
            outline: none !important;
            color: white;
            font-family: 'Montserrat';
            font-weight: 600;
            letter-spacing: 3px;
            text-align: right;
            font-size: 15px;
            width: 188px;
            padding-top: 2px;
        }
    }
    .sl-forgot{
        height: 12px;
        font-family: 'Akrobat';
        font-size: 10px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #838383;
        text-transform: uppercase;
        margin-top: 20px;
    }
}
</style>