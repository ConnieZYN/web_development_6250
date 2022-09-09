const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const PORT = 3000;

const userModel = require('./user'); // user data model
const gameModel = require('./game'); // game
const loginWeb = require('./login-web');
const gameWeb = require('./game-web');

app.use(express.static('./public'));

app.get('/', (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  const errorMessage = req.query.errorMessage;
  if (uuidSessionId === undefined) {
    res.send(loginWeb.loginPage(errorMessage));
  } else {
    const username = userModel.getUsername(uuidSessionId);
    if (username == null || username == undefined) {
      res.send(loginWeb.loginPage(errorMessage));
    } else {
      const progress = gameModel.getProgress(username);
      res.send(gameWeb(progress));
    }
  }
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  const trimedUsername = username.trim();
  if (username == '') {
    res.redirect('/?errorMessage=username can not be empty!');
  } else if (username === 'dog') {
    res.redirect('/?errorMessage=dog is not allowed as username!');
  } else {
    const uuidSessionId = userModel.registerSessionId(trimedUsername);
    res.cookie('uuidSessionId',uuidSessionId, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  }
});

app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  const username = userModel.getUsername(uuidSessionId);
  if (username == null || username == undefined) {
    res.redirect('/');
    return;
  }
  const { guess } = req.body;
  gameModel.guessWord(username, guess);
  res.redirect('/');
});

app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  userModel.sessionIds[uuidSessionId] = undefined;
  res.clearCookie('uuidSessionId');
  res.redirect('/');
});


app.post('/new-game', express.urlencoded({ extended: false }), (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  const username = userModel.getUsername(uuidSessionId);
  delete gameModel.progress[username];
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
