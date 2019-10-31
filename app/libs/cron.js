global.CronJob = require('cron').CronJob;

/*		Задаются в регионах			*/

/*

new CronJob('0 1 0 * * *', ()=>{
	backup.create();
}, null, true);
*/



/*		Выгрузка остатков		*/
/*
new CronJob('0 0 12 * * *', async ()=>{
	
	await foreachSync( MetroStocks.arStocks, Stock => Stock.cronImport());
	await foreachSync( MetroStocks.arStocks, Stock => Stock.Sales.cronCreateFutureSale());
	await foreachSync( MetroStocks.arStocks, Stock => Stock.Sales.updateFromRemnants());
	
}, null, true);


new CronJob('0 0 1 * * *', ()=>{
	
	MetroProdExport.exportAll()
	
}, null, true);



*/