const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cookieParser());
const PORT = 3000;

const userModel = require('./user'); // user data model
const users = userModel.users;
const storedWords = require('./stored_word');
const loginWeb = require('./login-web');
const dataWeb = require('./data-web');

app.use(express.static('./public'));

// log-in if no session id or show data page
app.get('/', (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  if (uuidSessionId === undefined) {
    const errorMessage = req.query.errorMessage;
    res.send(loginWeb.loginPage(errorMessage));
  } else {
    res.send(dataWeb.storedWordPage(getStoredWord(uuidSessionId)));
  }
});

// Below includes an example of pulling fields from a POST request body
app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
  const { username, password } = req.body;
  const trimedUsername = username.trim();
  if (username == '') {
    res.redirect('/?errorMessage=username can not be empty!');
  } else if (username === 'dog') {
    res.redirect('/?errorMessage=dog is not allowed as username!');
  } else if (!isUsernameValid(trimedUsername)) {
    res.redirect('/?errorMessage=username contains invalid character!');
  } else if (users[trimedUsername] == null || users[trimedUsername] == undefined) {
    res.redirect('/?errorMessage=username not exist!');
  } else if (password !== users[trimedUsername]) {
    res.redirect('/?errorMessage=password is incorrect!');
  } else {
    const uuidSessionId = registerSessionId(username);
    res.cookie('uuidSessionId',uuidSessionId, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  }
});

app.post('/data/update', express.urlencoded({ extended: false }), (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  if (uuidSessionId === undefined) {
    return;
  }
  const { word } = req.body;
  const username = getUsername(uuidSessionId);
  storedWords[username] = word;
  res.redirect('/');
});

app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
  const uuidSessionId = req.cookies.uuidSessionId;
  userModel.sessionIds[uuidSessionId] = undefined;
  res.clearCookie('uuidSessionId');
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


function registerSessionId(username) {
  const uuid = uuidv4();
  userModel.sessionIds[uuid] = username;
  return uuid
}

function getStoredWord(uuidSessionId) {
  const username = getUsername(uuidSessionId);
  return storedWords[username];
}

function getUsername(uuidSessionId) {
  return userModel.sessionIds.uuidSessionId;
}

function isUsernameValid(username) {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(username);
}