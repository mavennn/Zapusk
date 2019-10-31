<template>
<div v-if="opened" style="position: fixed;
    top: 0px;
    left: 0;
    width: 100vw;
    height: 100vh;">
    <div class="speaker-message">
        <div class="sm-backdrop"></div>
        <div class="sm-card">
            <div class="smc-head">
                <div class="smc-close" @click="opened = false"></div>
            </div>
            <div class="smc-text">
                {{lang=='en'?'Sorry, currently all slots for speaker are taken. Please write down below your message to the speaker and we will deliver it. Thank you!':
                'Извините, все слоты спикера заняты. Пожалуйста, запишите ниже ваше сообщение докладчику, и мы доставим его. Спасибо!'}}
            </div>
            <div class="smc-label">{{lang=='en'?'Type your message':'Напишите Ваше сообщение'}}:</div>
            <textarea v-model="feedback" class="smc-message"></textarea>
            <div class="smc-btn" @click="opened = false">{{lang=='en'?'send':'отправить'}}</div>
        </div>
    </div>
</div>
</template>

<script>
	export default {
		data () {
			return {
                opened: false,
                lang: 'en',
                feedback: '',
			}
		},
		props:{
            
		},
		computed: {
		},
		created(){
            this.lang = localStorageProxy.getItem('lang')
			this.$root.$on('smessage',()=>{
                this.opened = true
            })
		},
		methods: {
			sendRequest() {
                Request.postJson('/api/user/appointment/make', { speakerId: this.user._id, feedback: this.feedback}).then(data => {
                    swal('Success', 'Thanks!', 'success')
                }).catch(err => {
					swal('Info', err, 'info')	
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


<style lang="scss" scoped>
.speaker-message{
    position: relative;
    padding-top: 1px;
    height: 100vh;
    .sm-backdrop{
        opacity: 0.72;
        background-color: #d8d8d8;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .sm-card{
        margin: 78px 16px 0;
        padding: 10px;
        position: absolute;
        background: #f5f5f5;
        width: calc(100vw - 32px);
        .smc-head{
            height: 16px;
            .smc-close{
                float: right;
                background: url(/src/build/img/cancel_grey.png) center no-repeat;
                background-size: contain;
                width: 16px;
                height: 16px;
            }
        }
        .smc-text{
            font-size: 14px;
            color: #132d75;
            padding: 32px 0;
        }
        .smc-label{
            font-size: 12px;
            color: black;
            margin-bottom: 6px;
        }
        .smc-message{
            width: 100%;
            border: solid 1px #62b5e5;
            background-color: #ffffff;
            height: 74px;
            font-size: 12px;
            padding: 6px 10px;
        }
        .smc-btn{
            background-color: #62b5e5;
            width: 120px;
            color: white;
            text-transform: uppercase;
            font-size: 10px;
            text-align: center;
            padding: 6px 0;
            margin: 27px auto;
        }
    }
}
</style>