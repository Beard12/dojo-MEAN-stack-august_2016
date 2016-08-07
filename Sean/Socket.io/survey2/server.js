
var express = require("express");
var path = require("path");

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
 res.render("index");
})

var server=app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket){

	socket.on("posting_form", function (data){
    	socket.emit('updated_message', {name: data.name, lang: data.lang, dojo: data.dojo, comment: data.comment})
    	var rand = Math.floor(Math.random()*(1000-1)+1)
    	socket.emit('random_number', {number: rand})
	});
})






