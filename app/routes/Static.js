if (config.dev()){
	 let webpack = require('webpack');
	 let webpackDevMiddleware = require('webpack-dev-middleware');
	 let wconfig = require(`${rootPath}/webpack.config.js`);
	 let compiler = webpack(wconfig);
	 app.use(webpackDevMiddleware(compiler, {
	 	publicPath: '/src/build/js/',
	 	noInfo: true,
	 }));
 app.use(require("webpack-hot-middleware")(compiler));	
}

app.use('/favicon.png', express.static(`${rootPath}/public/favicon.png`));
app.use('/src/', express.static(`${rootPath}/public`));
app.use('/file/', express.static(`${rootPath}/file`));
app.use('/robots.txt', (req, res) => res.send("User-Agent: *\nDisallow: /"));

app.get('/src/*', (req,res)=>{
	res.status(404).send('Not Found');
})
app.get('/peak/*', (req,res)=>{
	res.status(404).send('Not Found');
})
