"use strict";
const wordList = `
about above after again among began begin
black bring build carry cause check class
clear close color could cover cross drive
early earth every field final first force
found front great green group heard horse
house large laugh learn leave light might
money music never night north often order
other paper piece place plain plane plant
point pound power press quick reach ready
right river round serve shape short since
sleep small sound south spell stand start
state still stood story study table teach
their there these thing think those three
under until usual voice vowel watch water
wheel where which while white whole world
would write young
`.split(/[\s\n]+/).filter( item => !!item );

const guessedWords = [];

function validateWord() {
  let word = document.forms["guessForm"]["guess"].value;
  word = word.trim();
  if (word == "") {
    alert("empty word!");
    return false;
  }
  word = word.toLowerCase();
  if (!wordList.includes(word)) {
    alert("the word is not in the list!");
    return false;
  }
  if (guessedWords.includes(word)) {
    alert("you have guessed this word already!");
    return false;
  }
  return true;
}

(function () {

  const wordListEl = document.querySelector('#guess-game-app .word-list');
  wordListEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('not-guessed')) {
      return;
    }
    document.getElementById('guess-input').value = e.target.id;
  });
  
  const guessedWordEls = document.querySelectorAll('#guess-game-app .word-list .guessed');
  guessedWordEls.forEach((e) => guessedWords.push(e.id));
})();
