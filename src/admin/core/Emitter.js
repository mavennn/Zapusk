global.Emitter = class{
	
	constructor(){
		this.events = {};
	}
	
	emit(event, data = {}) {
		if(!this.events[event] || !this.events[event].queue.length)
			return;
		this.events[event].queue.forEach(cb => cb(data));
	}
	
	on(event, cb) {
		if (!this.events[event])
			this.events[event] = { queue: [] };
		let index = this.events[event].queue.push(cb) -1;
		return {remove: () => {
			delete this.events[event].queue[index];
		}}
	}
	
}