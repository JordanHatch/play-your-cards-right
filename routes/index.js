
/*
 * GET home page.
 */

exports.index = function(req, res){
  if (!req.session.cardsPlayed) { req.session.cardsPlayed = []; }
  if (!req.session.score) { req.session.score = 0; }

  correctAnswer = false;
  incorrectAnswer = false;

  if (req.session.correctAnswer && req.session.correctAnswer == true) { correctAnswer = true; }
  if (req.session.incorrectAnswer && req.session.incorrectAnswer == true) { incorrectAnswer = true; }

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