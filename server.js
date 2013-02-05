var express = require('express'),
    path = require('path'),
    http = require('http'),
    taxdata = require('./routes/taxdata');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/', taxdata.findAll);
app.get('/:startdate', taxdata.findByStartDate);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

