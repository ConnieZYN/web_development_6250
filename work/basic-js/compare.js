"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

class WordCount {
  constructor(word) {
    this.count = []
    if (typeof word === 'string') {
      const wordLower = word.toUpperCase();
      for (let i = 0; i < 26; i++) {
        const c = String.fromCharCode(65 + i);
        this.count[i] = (wordLower.match(c) || []).length;
      }
    }
  }

  compareCount(other) {
    let res = 0;
    for (let i = 0; i < 26; i++) {
      res += Math.min(this.count[i], other.count[i]);
    }
    return res;
  }
}

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  let wordCount = new WordCount(word);
  let guessCount = new WordCount(guess);

  return wordCount.compareCount(guessCount);
}
