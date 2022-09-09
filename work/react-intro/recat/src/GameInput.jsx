import { useState } from 'react';

export default function GameInput({ onGuess }) {
  
  const [word, setWord] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onGuess(word);
    setWord('');
  }

  function handleInputChange(event) {
    setWord(event.target.value);
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>
        Guess 5 Characters Word:
        <input 
          type="text" 
          name="word" 
          value={word} 
          onChange={(event) => handleInputChange(event)} 
        />
      </label>
      <input 
        type="submit" 
        value="submit" 
        disabled={word == null || word.length === 0} 
      />
    </form>
  );
}