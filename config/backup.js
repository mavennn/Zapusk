module.exports = {
	
	main:{
		mongo: {
			use: true,
			//collections : [ ] если нужно только определенные таблицы
		},
		
		elastic: {
			use: false,
		},
		
		files:{
			use: false
		},
		gzip: {
			use: true,
			level: 2,
		},
		modified: false,
	},
	full:{
		mongo: {
			use: true,
		},
		elastic: {
			use: false,
		},
		files:{
			use: true,
			dirs:['resize', 'main'],
		},
		gzip: {
			use: true,
			level: 2,
		},
		modified: false,
	},
	images:{
		mongo: {
			use: false,
		},
		elastic: {
			use: false,
		},
		files:{
			use: true,
			dirs:['resize', 'main'],
		},
		gzip: {
			use: true,
			level: 2,
		},
		modified: false,
	},
	stocks:{
		mongo: {
			use: true,
			collections: ['m_stocks']
		},
		elastic: {
			use: false,
		},
		files:{
			use: false,
		},
		gzip: {
			use: true,
			level: 2,
		},
		modified: false,
	}
	
}