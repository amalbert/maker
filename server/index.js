var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static('public/dist'));

var mongoose = require('mongoose');
var NDR = require('./model/ndr');
var Objects = require('./model/objects');

var uuid = require('node-uuid');
var moment = require('moment');

mongoose.connect('mongodb://localhost/ndr', function (error) {
    if (error) {
        console.log(error);
    }
});

app.post('/api/ndr', function (req, res) {
	var ndr = new NDR({ value:req.body.value, unit:req.body.unit, objectUuid: req.body.objectUuid });

  if (!ndr.value || !ndr.unit || !ndr.objectUuid) {
    res.send(400);
    return;
  }

	ndr.uuid = uuid.v4();
	ndr.created_at = new Date();

  Objects.find({}).where('uuid').equals(ndr.objectUuid).exec(function(err, object) {
    if (err) throw err;

    object.lastValue = ndr.value;
    object.save(function(err) { if (err) throw err; });
  });

	ndr.save(function(err) {
	  if (err) throw err;

	  console.log('NDR saved successfully!');
    res.send(ndr);
	});
});

app.get('/api/ndr', function (req, res) {
	var startDate = moment().add(-1, 'days');

	NDR.find({}).where('created_at').gt(startDate.toDate()).exec(function(err, ndrs) {
	  if (err) throw err;

	  res.send(ndrs);
	});
});

app.post('/api/objects', function (req, res) {
  var obj = new Objects({name:req.body.name, unit:req.body.unit, uuid:req.body.uuid});

  if (!obj.name || !obj.unit || !obj.uuid) {
    res.send(400);
    return;
  }

  obj.save(function(err) {
    if (err) throw err;

    console.log('Object saved successfully!');
    res.send(obj);
  });
});

app.get('/api/objects', function (req, res) {
  Objects.find({}, function(err, objects) {
    if (err) throw err;

    res.send(objects);
  });
});

app.delete('/api/objects/:id', function (req, res) {
  Objects.find({}).where('uuid').equals(req.params.id).remove(function(err, object) {
    if (err) throw err;

    res.sendStatus(200);
  });
});

app.listen(3000, function () {
  console.log('Domo server listening on port 3000');
});

/*
var mosca = require('mosca');

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',        
  url: 'mongodb://localhost:27017/maker',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/maker'
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', () => { console.log('Mosca server is up and running'); });

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);     
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});
*/