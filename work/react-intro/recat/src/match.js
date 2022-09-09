const ANSWER = 'recat';
const Regex=/^[a-zA-Z]+$/;

function match(word) {
  const wordLowerCase = word.toLowerCase();
  if (word.length !== 5 || !Regex.test(wordLowerCase)) {
    return {
      success: false,
      reason: word + ' was not a valid word',
    };
  }

  if (wordLowerCase !== ANSWER) {
    let count = 0;
    for (const c of ANSWER) {
      if (wordLowerCase.includes(c)) {
        count++;
      }
    }
    return {
      success: false,
      reason: word + ' had ' + count + ' letters in common'
    };
  }

  return {
    success: true
  };
}

export default match;