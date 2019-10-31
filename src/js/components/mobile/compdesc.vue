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
                <div class="smc-info"></div>
                <div class="smc-close" @click="opened = false"></div>
            </div>
            <div class="smc-title" v-if="!comp.img">{{comp.title}}</div>
            <div class="smc-img" :style="getImg(comp.img)"></div>
            <div class="smc-text" v-html="comp.text"></div>
            <div class="smc-btns">
                <div class="smc-btn" :class="{'smcb-grey':!selected}" @click="selected?select():opened = false">{{lang=='en'?'Not insterested in':'Не интересуюсь практикой'}}</div>
                <div class="smc-btn" :class="{'smcb-grey':selected}" @click="!selected?select():opened = false">{{lang=='en'?'Insterested in':'Интересуюсь практикой'}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
	export default {
		data () {
			return {
                opened: false,
                comps: [
                    {
                        id: 3,
                        title: 'SkillsPassport',
                        img: '',
                        text: `SkillsPassport is a digital document confirming the level of professional competence 
<ul><li>based on practical performance</li>
<li>verified in competitions or standardized practical exams</li>
<li>in accordance with the WorldSkills standards</li>
<li>acknowledged by industry partners, trade unions and companies across nations</li></ul>
`
                    },
                    {
                        id: 4,
                        title: 'FutureSkills',
                        img: '',
                        text: `Development of emerging skills for the new technological, social and economic era 
<ul><li>Research
<ul>
<li>a coordinated group of experts determines the emerging high-tech and digital skills with growing demand;</li>
</ul></li>
<li>Design of competitions in new formats on national and international level
<ul>
<li>the new skills are designed according to the international WorldSkills standards;</li>
<li>experts are identified and trained</li>
</ul>
</li>
<li>Development of educational programmes
<ul>
<li>the technologies of competitor training verified in championships are transformed into educational programs for nationwide roll-out
</li>
</ul>
</li>
<li>International recognition of qualifications
<ul>
<li>the skills of qualified individuals are registered in objective form and are accepted across nations and industries</li>
</ul>
</li></ul>
`
                    },
                    {
                        id: 2,
                        title: 'WorldSkills Academy',
                        img: '',
                        text: `Comprehensive training of experts, lecturers and TVET managers 

ADVANCED TRAINING FOR TVET MASTERS
and college teachers at best educational institutions in Russia

TRAINING OF EXPERTS
to hold the competitions and demonstrational examination 
according to WorldSkills Standards

MANAGEMENT TRAINING PROGRAMMES 
for directors of vocational educational institutions 

DEVELOPMENT OF CUSTOMIZED PROGRAMMES
on request for colleges, universities, businesses and government

PROJECT, ANALYTICAL AND METHODOLOGICAL SUPPORT
in using WorldSkills Standards in vocational education

Benefits:
<ul>
<li>most up-to-date approaches and technologies in technical and vocational education and training;</li>
<li>full compliance with WorldSkills international standards; </li>
<li>essential support for fast roll-out of regional and national skills development systems; </li>
<li>development of expert communities.</li>
</ul>
`
                    },
                    {
                        id: 5,
                        title: 'WorldSkills Juniors',
                        img: '',
                        text: `Skills competitions for schoolchildren and students under the age of 16
<ul>
<li>development of competition standards for juniors</li>
<li>development and organization of competitions on national and international level</li>
<li>in accordance with the WorldSkills standards and methodology</li>
<li>customized Test Projects for youngsters</li>
</ul>
 `
                    },
                    {
                        id: 1,
                        title: 'SkillsCamp',
                        img: '',
                        text: `SkillsCamp is a joint training of several countries in one or several skills. 

SkillsCamps involve medal-winning competitors, experts and trainers of the past WorldSkills competitions.
SkillsCamp structure:
<ul>
<li>preparation and instructions</li>
<li>open competition</li>
<li>expert analysis of trainee’s actions</li>
<li>result-oriented honing of key skills</li>
</ul>
`
                    },
                    {
                        id: 7,
                        title: 'WorldSkills Hi-Tech',
                        img: '',
                        text: `WorldSkills Hi-Tech is an annual skills competition in cross-industry skills for high-tech companies. 
Every year the best employees from different corporations showcase their professional excellence to become a major benchmark for their colleagues, other companies and industries.

`
                    },
                    {
                        id: 6,
                        title: 'DigitalSkills',
                        img: '',
                        text: `DigitalSkills is an open industrial competition in IT sector skills

Competitors are:
<ul>
<li>employees of small and medium enterprises, large corporations;</li>
<li>students of leading colleges and universities; </li>
<li>individuals willing to benchmark their skills at the national level.</li>
</ul>
DigitalSkills has an open participation scheme for 17+:
<ul>
<li>Open call for participation</li>
<li>Online selection of candidates</li>
<li>Selected top competitors come for the DigitalSkills competition</li>
</ul>
Children under the age of 17 are going through school-based selection:
<ul>
<li>DigitalSkills assessment at IT lessons in schools</li>
<li>The Top-100 in every skill nation-wide goes through additional selection</li>
<li>Selected top competitors come for the DigitalSkills competition</li>
</ul>
`
                    }
                ],
                comp: {},
                selected: false
			}
		},
		props:{
            lang:{
                type: String,
                default: 'en'
            }
		},
		computed: {
		},
		created(){
			this.$root.$on('compdesc',(obj)=>{
                this.opened = true
                this.selected = obj.selected
                this.comps.forEach(item=>{
                    if(item.id == obj.id){
                        this.comp = item;
                    }
                })
            })
		},
		methods: {
            getImg(url){
                if(url != ''){
                    return `background: url(${url}) center no-repeat`
                }else{
                    return `display: none;`
                }
            },
            select(){
                this.$root.$emit('selectcomp', {id: this.comp.id})
                this.opened = false
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
        .smc-title{
            color: #132d75;
            font-size: 20px;
            font-weight: 600;
            text-align: center;
        }
        .smc-text{
            font-size: 14px;
            color: #132d75;
            padding: 32px 0;
            max-height: 300px;
            overflow: auto;
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
        .smc-btns{
            display: flex;
            .smc-btn{
                background-color: transparent;
                border: solid 1px #17479e;
                color: #17479e;
                text-transform: uppercase;
                font-size: 10px;
                text-align: center;
                padding: 6px 8px;
                margin: 27px auto;
                &.smcb-grey{
                    border: solid 1px #a8a8a8;
                    color: #a8a8a8;
                }
            }
        }
    }
}
</style>