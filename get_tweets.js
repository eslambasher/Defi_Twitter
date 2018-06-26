const PORT = process.env.PORT || 8080;
var  app = require('http').createServer(handler)
var  io = require('socket.io').listen(app)
var  fs = require('fs')
var  sys = require('sys')
var  twitter = require('twitter')

app.listen(port);

var twit = new twitter({
  consumer_key: 'Write here your consumer key',
  consumer_secret: 'Write here your consumer secret key',
  access_token_key: 'Write here your token key',
  access_token_secret: 'Write here your secret key'
});

function handler (req, res) {
  fs.readFile('interface.html',
  function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading interface.html')
    }
    res.writeHead(200)
    res.end(data)
  });
}

var twee = io.of('tweet')


twit.stream('statuses/filter', { track: 'Paris' }, function (stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text)
  })
  console.log('You can open you browser: http://localhost:' + port)
});
