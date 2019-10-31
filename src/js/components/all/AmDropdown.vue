<template lang="html">
    <div id="am-dropdown" class="am-dropdown">
        <button class="ad-selected" @click="open">{{selected}}</button>
        <div v-if="type == 'String'" id="ad-options" class="ad-options">
            <div @click="select(key)" class="ado-option" v-for="(option, key) in options" :class="{'adoo-selected':(selected == option)}">
                {{option}}
            </div>
        </div>
        <div v-else-if="type == 'Date'" id="ad-options" class="ad-options">
            <div @click="select(key)" class="ado-option" v-for="(option, key) in options" :class="{'adoo-selected':(selected == option.dateName)}">
                {{option.dateName}}
            </div>
        </div>
        <div v-else-if="type == 'Object'" id="ad-options" class="ad-options">
            <div @click="select(key)" class="ado-option" v-for="(option, key) in options" :class="{'adoo-selected':(selected == option.name)}">
                {{option.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        options:{
            type: [Array, Object],
            default: []
        },
        defSelected:{
            type: String,
            default: "f"
        },
        type:{
            type: String,
            default: "String"
        },
        'value': {
            type: [Array, Object, Number, String, Boolean],
        }
    },
    data(){
        return{
            selected: "Нет элементов",
            opened: false,
        }
    },
	created() {
        if (this.type == "String"){
            if(this.defSelected != "f")
                this.selected = this.defSelected;
            else if(this.options != [])
                this.selected = this.options[0];

        } else if(this.type == "Date"){
            if(this.defSelected != "f"){
                this.selected = this.defSelected;
            }else if(this.options != [] ){
                this.selected = this.options[0].dateName;
            }
        } else if(this.type == "Object"){
            if(this.defSelected != "f"){
                this.selected = this.defSelected;
            }else if(this.options != [] ){
                this.selected = this.options[Object.keys(this.options)[0]].name;
            }
        }
		window.onclick = function(event) {
			if (!event.target.matches('.ad-options') && !event.target.matches('.ado-option') && !event.target.matches('.am-dropdown') && !event.target.matches('.ad-selected')) 			{
				var dropdowns = document.getElementsByClassName("ad-options");
				var i;
				for (i = 0; i < dropdowns.length; i++) {
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('ado-show')) {
						openDropdown.classList.remove('ado-show');
					}
				}
			}
		}
    },
    methods:{
        open(event){
            let dropdowns = document.getElementsByClassName("ad-options"),
				i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('ado-show')) {
                    openDropdown.classList.remove('ado-show');
                }
            }
            if (this.opened)
                event.target.nextElementSibling.classList.remove("ado-show")
            else
                event.target.nextElementSibling.classList.toggle("ado-show")
            this.opened = !this.opened;
        },
        select(id){
            let dropdowns = document.getElementsByClassName("ad-options"),
            	i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('ado-show'))
                    openDropdown.classList.remove('ado-show');
            }
            this.opened = !this.opened;
            let selected,
            	input;
            switch(this.type){
                case "Date":
                    input = this.options[id].date;
                    selected = this.options[id].dateName;
                    break;
                case "Object":
                    input = this.options[id].stype;
                    selected = input;
                    break;
                default:
                    input = id;
                    selected = this.options[id];
            }
            this.selected = selected;
            this.$emit('input', input);
        }
    },
    watch:{
        value(){
            if(this.type == "String"){
                for(let i=0;i<this.options.length;i++){
                    if(i == this.value)
                        this.selected = this.options[i];
                }
            }else if(this.type == "Date"){
                for(let i=0;i<this.options.length;i++){
                    if(this.options[i].date == this.value)
                        this.selected = this.options[i].dateName;
                }
            }else if(this.type == "Object"){
                for(let i=0;i<this.options.length;i++){
                    if(this.options[i].stype == this.value)
                        this.selected = this.options[i].name;
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .am-dropdown{
        position: relative;
        display: inline-block;
        cursor: pointer;
        padding: 15px 0;
        max-width: 100%;
        .ad-selected{
            padding: 7px 25px 7px 12px;
            background-color: #fff;
            border: 1px solid #e4e7ea;
            border-radius: 0;
            box-shadow: none;
            color: #565656;
            height: 38px;
            max-width: 100%;
            transition: all 300ms linear 0s;
            position: relative;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:after{
                content: ' ';
                position: absolute;
                width: 0;
                height: 0;
                border-top: 8px solid darkgray;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                top: 13px;
                right: 8px;
                cursor: pointer;
            }
        }
        .ad-options{
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            display: none;
            float: left;
            min-width: 160px;
            padding: 5px 0;
            margin: 2px 0 0;
            list-style: none;
            font-size: 14px;
            text-align: left;
            background-color: #fff;
            border: 1px solid #ccc;
            border: 1px solid rgba(0,0,0,0.15);
            border-radius: 4px;
            -webkit-box-shadow: 0 6px 12px rgba(0,0,0,0.175);
            box-shadow: 0 6px 12px rgba(0,0,0,0.175);
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            &.ado-show{
                display: block;
            }
            .ado-option{
                padding: 9px 20px;
                cursor: pointer;
                &:hover{
                    background: #52b1f4;
                    color: white;
                }
                &.adoo-selected{
                    background: #00c292;
                    color: white;
                }
            }
        }
    }
</style>
