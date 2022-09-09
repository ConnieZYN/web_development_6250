import GameMessage from './GameMessage'; 
import GameInput from './GameInput';
import match from './match.js';
import { useState } from 'react';

export default function Game() {

  const [message, setMessage] = useState();

  function handleGuess(word) {
    const result = match(word);
    console.log(result);
    if (result.success) {
      setMessage(word + ' is the secret word!');
    } else {
      setMessage(result.reason);
    }
  }

  return (
    <div class='game'>
      <h1> Guess Word Game </h1>
      <GameMessage message={message} />
      <GameInput onGuess={(word) => handleGuess(word)} />
    </div>
  );
}