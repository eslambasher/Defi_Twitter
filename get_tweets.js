
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

app.listen(3000);

var twit = new twitter({
  consumer_key: 'Z0jz4btfOYMcnB4ududxrdT4s',
  consumer_secret: 'LE2NSmShRInl6TjBXHsR5HzxUTxGYGW2eoNg4I5A00WDDKFlPU',
  access_token_key: '453406916-AzyUBm8LeDNiD5BupGgdOxBaoYYzVLVO0YR86ejm',
  access_token_secret: 'qfQkCCtlpWgvXtPgo16Dh2MOFlO4nvm077iwUt5qSojbn'
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
