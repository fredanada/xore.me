
// todo list

// error handing middleware
// what to put in gitignore

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');
var morgan = require('morgan');
var models = require('./models');
var routes = require('./routes');

//logging middleware
app.use(morgan('combined'))

//serve public files
app.use(express.static('public'));
// app.use('/static', express.static(__dirname + '/public'));

//body parser
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

//view engine
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true} );

//sync db
models.Playlist.sync({})
.then(function(){
	return models.Track.sync({});
})
.then(function() {
	app.listen(3001, function(){
		console.log('server listening on port 3001');
	})
})
.catch(console.error);

//routing
app.use('/', routes);

//error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});


module.exports = app;