var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var routes = require('./routes/routes');

var app = express();

var PORT = process.env.PORT || 8000;

var URI = process.env.callbackURL ? process.env.MONGODB_URI : 'mongodb://localhost/tangent';
mongoose.connect(URI);

app.use(express.static(__dirname + '../../client'));
app.use(morgan('tiny'));
app.use(parser.urlencoded({ extended: true}));
app.use(parser.json());

app.listen(PORT, function() {
  console.log('Express server running on port ' + PORT);
});

routes(app, express);

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});


//fb color #3b5998
//google color #d14836