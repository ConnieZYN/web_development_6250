const wordList = require('./words');

const progress = {};

function getProgress(username) {
  if (username in progress === false) {
    startNewGame(username);
  }
  return progress[username]; 
}

function startNewGame(username) {
  const answer = pickWord(wordList);
  if (username in progress) {
    delete progress[username];
  }
  console.log("username: " + username + " answer: " + answer );
  progress[username] = {
    answer,
    hasWon: false,
    count: 0,
    guessedWords: {},
    lastGuess: null,
  };
}

function isCorrectWord(username, guessWord) {
  const userProgress = progress[username];
  const answer = userProgress.answer;
  return answer === guessWord.toLowerCase();
}

function pickWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function guessWord(username, guessWord) {
  const progress = getProgress(username); 
  const guessLower = guessWord.trim().toLowerCase();
  if (progress.hasWon) {
    return;
  }
  if (wordList.includes(guessLower) && !(guessLower in progress.guessedWords)) {
    progress.count += 1;
    progress.lastGuess = guessLower;
    progress.guessedWords[guessLower] = compareWord(progress.answer, guessLower);
  }
  progress.hasWon = isCorrectWord(username, guessWord);
}

function compareWord(word, other) {
  const count1 = countWord(word);
  const count2 = countWord(other);
  let res = 0;
  for (let i = 0; i < 26; i++) {
    res += Math.min(count1[i], count2[i]);
  }
  return res;
}

function countWord(word) {
  count = []
  if (typeof word === 'string') {
    const wordLower = word.toUpperCase();
    for (let i = 0; i < 26; i++) {
      const c = String.fromCharCode(65 + i);
      count[i] = (wordLower.match(c) || []).length;
    }
  }
  return count;
}

module.exports = {
  progress,
  getProgress,
  startNewGame,
  guessWord,
};