
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , csv = require('ya-csv');

require('./lib/extras');

var app = module.exports = express.createServer();

app.use(express.cookieParser());
app.use(express.session({ secret: "nyan nyan nyan nyan" }));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Load sites

websites = [];
cardsPlayed = [];
score = 0;

var reader = csv.createCsvFileReader('data/sites.csv', { columnsFromHeader: true });
reader.addListener('data', function(data) {
    costs = parseInt(data['Strategy and planning costs']) + parseInt(data['Design and build costs']) + parseInt(data['Hosting and infrastructure costs']) + parseInt(data['Content provision costs']) + parseInt(data['Testing and evaluation costs']);

    websites.push( {
      'url': data['Website address'].replace(/www\./,''),
      'title': data['Organisation'],
      'cost': costs,
      'formatted_cost': format_number(costs)
    });
});

// Routes

app.get('/', routes.index);

app.post('/higher', function(req, res){
  if (req.session.cardsPlayed) {
    baseCard = req.session.cardsPlayed[req.session.cardsPlayed.length-2];
    lastCard = req.session.cardsPlayed[req.session.cardsPlayed.length-1];

    if (baseCard.cost <= lastCard.cost) {
      showCorrectAnswer(req);
    } else {
      showIncorrectAnswer(req);
    }

    newCard(req);
  }
  res.redirect('/');
});

app.post('/lower', function(req, res){

  baseCard = req.session.cardsPlayed[req.session.cardsPlayed.length-2];
  lastCard = req.session.cardsPlayed[req.session.cardsPlayed.length-1];

  if (baseCard.cost >= lastCard.cost) {
    showCorrectAnswer(req);
  } else {
    showIncorrectAnswer(req);
  }

  newCard(req);
  res.redirect('/');
});

app.post('/restart', function(req, res) {
  req.session.cardsPlayed = [];
  req.session.score = 0;
  res.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
