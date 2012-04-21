
/*
 * GET home page.
 */

exports.index = function(req, res){
  if (!req.session.cardsPlayed) { req.session.cardsPlayed = []; }
  if (!req.session.score) { req.session.score = 0; }

  if (req.session.message) {
    message = req.session.message;
    req.session.message = null;
  } else {
    message = false;
  }

  score = req.session.score;
  cardsPlayed = req.session.cardsPlayed;

  if (cardsPlayed.length == 0) {
    newCard(req);
    newCard(req);
  }

  lastCard = req.session.cardsPlayed[req.session.cardsPlayed.length-1];

  res.render('index', { title: 'Play Your Cards Right' });

  req.session.correctAnswer = false;
  req.session.incorrectAnswer = false;
};