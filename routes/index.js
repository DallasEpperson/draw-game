var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

var savedGames = []; //TODO store these outside ram

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Drawing Game' });
});


router.post('/save', function(req, res, next){
  console.log('post /save');
  console.log(req.body);
  var savedGame = {
    gameId: uuidv4(),
    strokes: req.body.strokes
  };
  savedGames.push(savedGame);
});

module.exports = router;
