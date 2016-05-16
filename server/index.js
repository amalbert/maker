var express = require('express');
var app = express();

var ndrs = [];

app.post('/ndr', function (req, res) {
	ndrs.push(request.body);
	res.send(request.body);
});

app.listen(3000, function () {
  console.log('Domo server listening on port 3000');
});