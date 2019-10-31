global.Xedit = class xedit{
	
	/*
		xedit.push = {
			*prop: путь до свойства
			code: код свойства, если не задан берется из prop
			*type: text/select/textarea/multiselect/boolean
			*name: Название свойства,
			save: своя функция сохранения, должна возвращать промис с suJson/erJson
			values: Список занчений для списка [{key: 'one', val:'В работе'}]
			validate: Функция валидации, должна возвращать erJson или suJson
			after_show: Фукция, которая вызывается после вывода пользователю, можно всякие плагины повесить
			print: Функиця, которая изменяет формат возвращаемых значений
			save_params: Параметры, которые передаются вместе с сохранением
			select_add: Возможность добавлять свои значения
			select_add_url: Куда отправлять новое значение, ответ должен быть suJson/erJson, и в suJson новый список тегов
			select_add_params: Какие параметры передавать при отправке на создание
			is_number: Если число тогда ставить true
			is_price: Если цена тогда ставить true
			placeholder: хз что
			print_empry: что пишется когда значение пустое
		}
	*/
	
	constructor(){
		
		this.props = {};
		this.url = '/test-save/';
		this.id = 5;
		this.pop;
		this.eventCheckClick;
		this.eventCancelClick;
	}
	
	push(arProp){
		if(Array.isArray(arProp))
			arProp.forEach(val=>this.push(val))
		else
			this.props[arProp.prop] = arProp;
	}
	
	static getButtons(){
		return `
			<button type="button" class="btn btn-pure btn-success waves-effect waves-circle waves-classic" id="xedit_check" ><i class="fa fa-check" ></i></button>
			<button type="button" class="btn btn-pure btn-danger waves-effect waves-circle waves-classic" id="xedit_cancel" ><i class="fa fa-remove" ></i></button>`;
	}
	
	static valivatePlace(){
		return `
			<div id="xedit_validate_place" ></div>`;
	}
	
	
	edit(prop, current, event, exdata = {}){
		
		if(this.props[prop] == undefined || this['type' + this.props[prop].type] == undefined){
			return Promise.reject('Неверные параметры');
		}
		let coords = { top: event.clientY, left: event.clientX};

			
		if(current == undefined)
			current="";
		prop = this.props[prop];
		let val;
		return this['type' + prop.type](prop, current, coords).then(data=>{
			val = data;
			return this.save(prop, data, exdata)
		}).then(data=>{
			val.ans = data;
			return val;
		})
	}
	
	save(prop, val, exdata){
		this.close();
		if(prop.save!=undefined)
			return prop.save(prop, val, exdata);
		let code = (prop.code || prop.prop);
		let arPost = {code, val: val.val, id: this.id};
		if(prop.save_params)
			arPost = Object.assign(arPost, prop.save_params);
		
		return Request.postJson(this.url, arPost);
	}
	
	openPop(title,content,coords){
		content += xedit.valivatePlace();
		this.pop = $('<div class="xedit_place" ><div id="xedit_back" ></div></div>').appendTo('body').css(coords).webuiPopover({title, content, dismissible: false});
		this.pop.webuiPopover('show');
		this.pop.children('#xedit_back').click(()=>{
			this.close();
		})
		
		$("#body").addClass('noscroll');
		$(".slidePanel-scrollable .scrollable-container").addClass('noscroll');
		
		
	}
	
	eventCheck(prop, current, fval){
		return new Promise((res, rej)=>{
			$('#xedit_check').click(()=>{
				let val = this[fval](prop);
				
				if(prop.is_price)
					val.val = val.val.replace(/\s+/g,'');
				
				if((prop.is_number || prop.is_price) && !isNumber(val.val))
					return $('#xedit_validate_place').html(`<b>Ошибка:</b> Значение должно быть числом с разделителем .`);
				
				if(prop.validate){
					let valid = prop.validate(val.val);

					if(!isJson(valid))
						return $('#xedit_validate_place').html(`<b>Ошибка:</b> ${ans(valid)}`);
				}
				res(val);
			})
			$('#xedit_cancel').click(()=>{ this.close(); rej('closed'); });
		})
	}
	
	
	close(){
		this.pop.webuiPopover('destroy');
		this.pop.remove();
		$("body").removeClass('noscroll');
		$(".slidePanel-scrollable .scrollable-container").removeClass('noscroll');
	}
	
	
	print(prop, val){
		
		if(!this.props[prop] || !this.props[prop].type)
			return 'свойство не задано';
		
		if((val == undefined || val == '') && typeof val != 'boolean')
			return (this.props[prop].print_empry || 'Нет данных');
		let valRet = this['type' + this.props[prop].type + 'print'](this.props[prop], val);
		return String(valRet);
	}
	
	
	
	
	/*		Типы свойств		*/
	
	
	typetext(prop, current, coords){
		let content = `<input id="xedit_inp_val" class="form-control xedit_input" value="${current}" >`;
		content+=xedit.getButtons();
		this.openPop(prop.name,content, coords);
		if(prop.after_show)
			prop.after_show('#xedit_inp_val');
		return this.eventCheck(prop, current, 'typetextGetVal');	
	}
	
	typetextGetVal(prop){
		let val = $('#xedit_inp_val').val();
		return { val, print: this.typetextprint(prop, val)};
	}
	typetextprint(prop, val){
		if(prop.print)
			val = prop.print(val);
		else if(val && prop.is_price)
			return String(val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
		return val;
	}

	
	
	
	
	
	typetextarea(prop, current, coords){
		let content = `<textarea id="xedit_inp_val" rows="4" class="form-control xedit_input">${current}</textarea>`;
		content+=xedit.getButtons();
		this.openPop(prop.name,content, coords);
		if(prop.after_show)
			prop.after_show('#xedit_inp_val');
		return this.eventCheck(prop, current, 'typetextGetVal');	
	}
	
	typetextareaGetVal(prop){
		let val = $('#xedit_inp_val').val();
		return { val, print: this.typetextprint(prop, val)};
	}
	typetextareaprint(prop, val){
		if(prop.print)
			val = prop.print(val);
		return val;
	}
	
	
	
	
	typeselect(prop, current, coords){
		let content = `<div class="xedit_select_block" ><select class="form-control xedit_select" id="xedit_select_val">`
		content+='</select></div>'
		content+='<div class="xedit_select_btns" >' + xedit.getButtons() + '</div>';
		
		let arTags = this.getSelectVals(prop).map(val=>{return {id: val.key, text: val.val}});
		if(prop.select_add)
			arTags.push({id:'add_new_select', text: 'Добавить новое'});	
		
		this.openPop(prop.name, content, coords);
		let select2 = $("#xedit_select_val").select2({data: arTags});
		select2.val(current).trigger("change");
		if(prop.select_add)
			select2.on('select2:select', ()=>{  if(select2.val() == 'add_new_select') this.typeSelectAdd(prop, select2)});
		
		
		
		if(prop.after_show)
			prop.after_show('#xedit_select_val');
		return this.eventCheck(prop, current, 'typeselectGetVal');	
	}
	
	typeSelectAdd(prop, select2){
		
		return swal({
			title: 'Новое значение',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Создать',
			cancelmButtonText: 'Отменить',
			showLoaderOnConfirm: true,
			preConfirm: val => {
				if(empty(val))
					return Promise.reject('Поле не модет быть пустым');
				let arPost = {val, code: prop.code };
				if(prop.select_add_params)
					arPost = Object.assign(prop.select_add_params, arPost)
				return postJson(prop.select_add_url, arPost);
			},
			allowOutsideClick: false
		}).then(function (data){
			let arTags = data.map(val=>{return {id: val.key, text: val.val}});
			let val = arTags[arTags.length - 1];
			let currTag = arTags[arTags.length - 1];
			prop.values.push({key: currTag.id, val: currTag.text});
			select2.select2({data: arTags}).val(val.id).trigger('change');
		})
		
		
		
	}
	
	getSelectVals(prop){
		return (typeof prop.values == 'function') ? prop.values() : prop.values;
	}
	
	typeselectprint(prop, val){
		return (this.getSelectVals(prop).find(el=> el.key==val) || {val:'Не выбрано'}).val;
	}
	
	typeselectGetVal(prop){
		let val = $('#xedit_select_val').val();
		val = (this.getSelectVals(prop).find(el=> el.key==val) || {key:0, val:'Не выбрано'})
		return { val: val.key, print: val.val};
	}



	
	typeboolean(prop, current, coords){
		let content = `<div class="xedit_select_block" ><select class="form-control xedit_select" id="xedit_select_val">`
		content+='</select></div>'
		content+='<div class="xedit_select_btns" >' + xedit.getButtons() + '</div>';
		
		let arTags = [{id: 0, text: 'Нет'}, {id: 1, text: 'Да'}];
		
		this.openPop(prop.name, content, coords);
		let select2 = $("#xedit_select_val").select2({data: arTags});
		
		if(prop.after_show)
			prop.after_show('#xedit_select_val');
		return this.eventCheck(prop, current, 'typebooleanGetVal');	
	}
	
	
	typebooleanprint(prop, val){
		return (val ? 'Да': 'Нет');
	}
	
	typebooleanGetVal(prop){
		let val = $('#xedit_select_val').val();
		val = isNanDef(val, 0);
		return { val: Boolean(val), print: (val ? 'Да': 'Нет')};
	}
	
	
	
	
	
	
	
	
	
	typemultiselect(prop, current, coords){
		let content = `<div class="xedit_select_block" ><select class="form-control xedit_select" multiple="multiple" id="xedit_select_val">`
		content+='</select></div>'
		content+='<div class="xedit_select_btns" >' + xedit.getButtons() + '</div>';
		
		console.log('prop',prop);
		console.log('this.getSelectVals(prop)',this.getSelectVals(prop));
		let arTags = this.getSelectVals(prop).map(val=>{return {id: val.key, text: val.val}});
		if(prop.select_add)
			arTags.push({id:'add_new_select', text: 'Добавить новое'});	
		
		
		this.openPop(prop.name, content, coords);
		let select2 = $("#xedit_select_val").select2({data: arTags});
		select2.val(current).trigger("change");
		
		if(prop.select_add)
			select2.on('select2:select', ()=>{ if(select2.val().indexOf('add_new_select') > -1) this.typeMultiselectAdd(prop, select2)});
				
		if(prop.after_show)
			prop.after_show('#xedit_select_val');
		return this.eventCheck(prop, current, 'typesmultiselectGetVal');	
	}
	
	typeMultiselectAdd(prop, select2){
		
		return swal({
			title: 'Новое значение',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Создать',
			cancelmButtonText: 'Отменить',
			showLoaderOnConfirm: true,
			preConfirm: val => {
				if(empty(val))
					return Promise.reject('Поле не модет быть пустым');
				let arPost = {val, code: prop.code };
				if(prop.select_add_params)
					arPost = Object.assign(prop.select_add_params, arPost)
				return postJson(prop.select_add_url, arPost);
			},
			allowOutsideClick: false
		}).then(function (data){
			let arTags = data.map(val=>{return {id: val.key, text: val.val}});
			let val = arTags[arTags.length - 1];
			let arVals = select2.val().filter(val=> val!= 'add_new_select');
			arVals.push(val.id);
			let currTag = arTags[arTags.length - 1];
			prop.values.push({key: currTag.id, val: currTag.text});
			select2.select2({data: arTags}).val(arVals).trigger('change');
		})
		
		
		
	}
	
	
	typemultiselectprint(prop, val){
		if(!Array.isArray(val))
			return 'Не выбрано';
		
		val = val.map(id => {
			return (this.getSelectVals(prop).find(enet => enet.key == id) || {}).val;
		})
		return empty(val) ? 'Не выбрано' : val.join(', ');
	}
	
	typesmultiselectGetVal(prop){
		let val = $('#xedit_select_val').val() || [];
		let arVal = [];
		let arPrint = [];
		val.forEach(id => {
			let item = this.getSelectVals(prop).find(enet => enet.key == id);
			arVal.push(id);
			arPrint.push(item.val);
		})
		return { val: arVal, print: arPrint.join(', ')};
	}
		
	
	
	
	
	
	
	
	
	
}