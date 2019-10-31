<template>
    <div id="am-dropdown" class="am-dropdown" ref="dropdownMenu">
        <button class="btn btn-block" :class="styleClasses" @click="open">
        	<span >{{getVal()}}</span>
        	<span class="caret"></span>
        </button>
        <div id="ad-options" class="ad-options" v-show="opened">
            <div
				v-for="(option, key) in options"
				@click="select(key)"
				class="ado-option"
				:class="{adoo_disabled: option.disabled}">
                {{option.val}}
                <span v-if="selected.includes(key)" class="glyphicon glyphicon-ok ado-check"></span>
            </div>
        </div>
    </div>
</template>

<script>
	
export default {
    props: {
        options: {
            type: Array,
            default: []
        },
        name: {
	        type: String,
	        default: 'Выберите значение'
	    },
	    multiple: {
		    type: Boolean,
		    default: false
	    },
		value: {
			type:  [String, Number, Array],
		},
		amstyle: {
			type: Object,
			default: () => ({
				color: 'info',
				outline: false,
				size: '',
			})
		}
    },
    data(){
        return {
	        selected: [],
            opened: false,
        }
    },
	created() {
		this.selected = this.options.filter(data => this.multiple ? this.value.includes(data.key) : data.key == this.value);
    },
    computed: {
	    empty_select() {
			return this.selected.length == 0;
		},
		styleClasses(){
			let arStyles = [`btn-${this.amstyle.color}`];
			if (this.amstyle.outline)
				arStyles.push('btn-outline');
			if (this.amstyle.size)
				arStyles.push(`btn-${this.amstyle.size}`);
			return arStyles;
		}
    },
    destroyed() {
		document.removeEventListener('click', this.hide)
	},
    methods:{
	    open() {
		    this.opened = !this.opened;
		    document.addEventListener('click', this.hide)
	    },
	    hide(e) {
			let el = this.$refs.dropdownMenu;
			if ((el !== e.target) && !el.contains(e.target))
				this.opened = false  
	    },
	    getVal() {
		    if(empty(this.value))
		    	return this.name;
		    if(this.multiple)
		    	return this.options.filter(val => this.value.includes(val.key)).map(val => val.val).join(', ');
		    return this.options.find(val => val.key == this.value).val;
	    },
        select(key) {
			if (this.options[key].disabled) return;
				
            if (!this.selected.includes(key)) {
	            if (!this.multiple)
	            	this.selected = [];
            	this.selected.push(key);
            }
            else
		        this.selected = this.selected.filter(item => item !== key)
		        				
			let	value = this.selected.map(data => this.options[data].key)
			
			if (!this.multiple) {
				value = value[0];
				this.opened = !this.opened;
			}
			
            this.$emit('input', value);
        }
    }
}
</script>

<style lang="scss" scoped>
    .am-dropdown{
        position: relative;
        display: inline-block;
        cursor: pointer;
        padding: 0 0 15px;
        max-width: 100%;
        width: 100%;
		display: inline-block;
		font-size: 14px;
		.btn{
			position: relative;
			text-align: left;
			overflow: hidden;
            text-overflow: ellipsis;
			.caret {
				position: absolute;
			    top: 50%;
			    right: 12px;
			    margin-top: -2px;
			    vertical-align: middle;
			}
		}
        .ad-selected{
            transition: all 300ms linear 0s;
            position: relative;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            text-align: left;
			.caret {
				position: absolute;
			    top: 50%;
			    right: 12px;
			    margin-top: -2px;
			    vertical-align: middle;
			}
        }
        .ad-options{
            position: absolute;
            top: 38px;
            left: 0;
            z-index: 500;
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
            border-radius: 0px;
            -webkit-box-shadow: 0 6px 12px rgba(0,0,0,0.175);
            box-shadow: 0 6px 12px rgba(0,0,0,0.175);
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            width: 100%;
            &.ado-show{
                display: block;
            }
            .ado-option{
                padding: 9px 15px;
                cursor: pointer;
                width: 100%;
                position: relative;
                text-transform: initial;
                &:hover{
                    background: #52b1f4;
                    color: white;
                }
                &.adoo_selected{
                    background: #00CD55;
                    color: white;
                }
                &.adoo_disabled{
                    background: #f2f2f2;
                    color: #525252;
                    cursor: default;
                }
            }
            .ado-check {
	            position: absolute;
			    display: inline-block;
			    right: 15px;
			    top: 10px;
            }
        }
    }
</style>