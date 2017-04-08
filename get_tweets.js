
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

app.listen(3000);

var twit = new twitter({
  consumer_key: 'h2qbUnjbO7YIGZDwoPWPBGPUC',
  consumer_secret: 'Ey7pO7Pr61GJbXbewTjWOu7GtnWXJAhSBAz9VSeQ3uneqI3YMq',
  access_token_key: '453406916-DqDVnNnB5kytFhNuvHlXzfn9Y4aFt61MyJPAiRdt',
  access_token_secret: 'eeliWOFoabMmMrPuWQiPDbQgtznb4MlpdPCzrkt2NDn8z'
});

function handler (req, res) {
  fs.readFile('interface.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading interface.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var twee = io.of('tweet');


twit.stream('statuses/filter', { track: 'Paris' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text);
    console.log(data.text);
  });
});
