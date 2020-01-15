var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');

var savedGames = []; //TODO store these outside ram

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Drawing Game' });
});


router.post('/save', function (req, res, next) {
  console.log('post /save');
  //TODO check integrity of req.body
  let gameId = uuidv4();
  var savedGame = {
    gameId: gameId,
    strokes: req.body.strokes
  };
  savedGames.push(savedGame);
  console.log('New drawing saved: ', savedGame.gameId);
  res.json(
    {
      success: true,
      gameId: gameId
    }
  );
});

router.get('/replay', function (req, res, next){
  console.log('get /replay', req.query);
  var savedDrawing = savedGames.filter(game => {return game.gameId === req.query.gameId;});
  if(savedDrawing.length !== 1){
    console.log('Game not found.');
    console.log(savedGames.map((game) => {return game.gameId;}));
    res.json(
      {
        success: false
      }
    );
    return;
  }
  res.json(
    {
      success: true,
      strokes: savedDrawing[0].strokes
    }
  );
});

module.exports = router;
