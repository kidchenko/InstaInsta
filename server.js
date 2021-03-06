var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3000);
var urlSite = "http://instainsta1.herokuapp.com/";
var io = require('socket.io').listen(app.listen(port));
var Instagram = require('instagram-node-lib');
var http = require('http');
var request = ('request');
var intervalID;

/**
* Diretorios para as pastas raizes
*/
var pub = __dirname + '/content',
    view = __dirname + '/views';

/**
* 'client ID' e o 'client secret' para usar o Instagram
*/
var clientID = '',
    clientSecret = '';

/**
* Configuracoes
*/
Instagram.set('client_id', clientID);
Instagram.set('client_secret', clientSecret);
Instagram.set('callback_url', urlSite +'callback');
Instagram.set('redirect_uri', urlSite);
Instagram.set('maxSockets', 10);

/**
* Usando a biblioteca "instagram-node-lib" para usar o Instagram em Real Time
* com a hashtag (#) macbook
*/

Instagram.subscriptions.subscribe({
    object: 'tag',
    object_id: 'beach',
    aspect: 'media',
    callback_url: urlSite +'callback',
    type: 'subscription',
    id: '#'
});


// Se precisar para de vizualizar uma hashtag
// voce apenas precisa passar o Id que o Instagram ira mandar a resposta
// Instagram.subscriptions.unsubscribe({ id: '3668016' });

// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function () {
   io.set("transports", [
     'websocket'
     , 'xhr-polling'
     , 'flashsocket'
     , 'htmlfile'
     , 'jsonp-polling'
   ]);
   io.set("polling duration", 10);
});

/**
* App main Configuracao
*/
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(pub));
    app.use(express.static(view));
    app.use(express.errorHandler());
});

/**
* Renderizar a pagina principal, nao usando jade
*/
app.get("/views", function(req, res){
    res.render("index");
});

// visualizar inscricoes
// https://api.instagram.com/v1/subscriptions?client_secret=YOUR_CLIENT_ID&client_id=YOUR_CLIENT_SECRET

/**
* Com o socket.io conectado, nos pegamos os posts mais recents
* e enviamos para o cliente por meio do socket.emit
*/
io.sockets.on('connection', function (socket) {
  Instagram.tags.recent({
      name: 'boobs',
      complete: function(data) {
        socket.emit('firstShow', { firstShow: data });
      }
  });
});

/**
* Precisamos primeiramente do Handshake
*/
app.get('/callback', function(req, res){
    var handshake = Instagram.subscriptions.handshake(req, res);
});

/**
* Para cada novo post no Instagram, ele vai nos enviar a resposta
*/
app.post('/callback', function(req, res) {
    var data = req.body;
    // Pegamos a hashtag "tag.object_id"
    // concatenamos com a url e enviamos como argumento para o cliente
    data.forEach(function(tag) {
      var url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?client_id=' + clientID;
      sendMessage(url);

    });
    res.end();
});

/**
* Manda a url com a Hashtah para o cliente
* para fazer o ajax chamar a url
* @param {[string]} url [a string url com a hashtah]
* @param {[string]} url [a string url com a hashtah]
*/
function sendMessage(url) {
  io.sockets.emit('show', { show: url });
}

console.log("the Magic Happens on Port " + port);
