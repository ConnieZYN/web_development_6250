const wordList = require('./words');

function gameWeb(progress) {
  const lastGuess = progress.lastGuess == null ? "" : progress.lastGuess;
  return `
    <!doctype html>
    <html>
    <link rel='stylesheet' href='/game.css' />
      <head>
        <title>Guess Game</title>
      </head>
      <body>
        <div id="guess-game-app" class="guess-game-app">
          ${logoutForm}
          ${newGameForm}
          <br>
          <br>
          <br>
          ${displayHasWonHeader(progress)}
          <h2>List of words</h2>
          ${displayWordList(progress)}
          <HR style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="80%" color=#987cb9 SIZE=3>
          ${displayGuessForm(progress)}
          <h2>You've guessed ${progress.count} times</h2>
          Your last guess is <strong>${lastGuess}</strong>
          <br>
          ${displayGuessList(progress)}
        </div>
        <script src="validation.js"></script>
      </body>
      </html>
  `;
}

function displayWordList(progress) {
  return `<div class="word-list">` +
    wordList.map(
      (word, index) => displayOneWord(word, index, progress.guessedWords, progress.answer, progress.hasWon)
    ).join('') +
    `</div>`;
}

function displayOneWord(word, index, guessedWords, answer, hasWon) {
  let wordClass = '';
  if (word == answer && hasWon) {
    wordClass = "answer";
  } else if (word in guessedWords) {
    wordClass = "guessed";
  } else {
    wordClass = "not-guessed";
  }
  let displayContent = `<span id="${word}" class="${wordClass}">${word}</span> `;
  if ((index+1) % 10 == 0) {
    displayContent += `<br>`;
  }
  return displayContent;
}

function displayGuessForm(progress) {
  if (progress.hasWon) {
    return ``;
  }
  return `
  <form name="guessForm" action="/guess" method="post" onsubmit="return validateWord()">
    <label>guess word: </label>
    <input id="guess-input" class="guess-input" type="text" id="guess" name="guess">
    <input type="submit" value="guess">
  </form>
  `;
}

function displayGuessList(progress) {
  return `<ol class="guess-list">`
  + Object.keys(progress.guessedWords).map(
    word => `<li>${word}: ${progress.guessedWords[word]}</li>`
  ).join('')
  + `</ol>`;
}

const logoutForm = `
  <form class="top-right" action="/logout" method="post">
    <input type="submit" value="Logout">
  </form>
  `;

const newGameForm = `
  <form class="top-right" action="/new-game" method="post">
    <input type="submit" value="Start a new game">
  </form>
`;

function displayHasWonHeader(progress) {
  if (progress.hasWon) {
    return `<h1 class="won"> You have won the game!</h1>`;
  } else {
    return ``;
  }
}

module.exports = gameWeb;