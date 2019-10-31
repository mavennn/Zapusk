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
            <div v-if="sending" class="smc-text">
                {{lang=='en'?'If you have any question, please send a message to us. We will contact you shortly!':
                'Если у Вас есть вопросы, пожалуйста, напишите нам. Мы свяжемся с Вами в ближайшее время!'}}
            </div>
            <div v-if="sending" class="smc-label">{{lang=='en'?'Type your message':'Напишите Ваше сообщение'}}:</div>
            <textarea v-if="sending" class="smc-message"></textarea>
            <div v-else class="smc-text" style="text-align: center">
                {{lang=='en'?'Thank you':'Спасибо'}}
            </div>
            <div v-if="sending" class="smc-btn" @click="sending = false">{{lang=='en'?'send':'отправить'}}</div>
            <div v-else class="smc-btn" @click="opened = false">{{lang=='en'?'close':'закрыть'}}</div>
        </div>
    </div>
</div>
</template>

<script>
	export default {
		data () {
			return {
                sending: true,
                opened: false,
                lang: 'en',
			}
		},
		props:{
            
		},
		computed: {
		},
		created(){
            this.lang = localStorageProxy.getItem('lang')
			this.$root.$on('helpme',()=>{
                this.opened = true
                this.sending = true
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