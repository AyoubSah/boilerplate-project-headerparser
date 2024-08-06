// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
const useragent = require('express-useragent');
const requestIp = require('request-ip');


var app = express();

app.use(useragent.express());
app.use(requestIp.mw());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.get('/api/whoami', (req, res) => {
  const userInfo = {
      ipaddress: req.clientIp,
      language: req.headers['accept-language'],
      software: req.useragent.source
  };

  res.send(userInfo);
});