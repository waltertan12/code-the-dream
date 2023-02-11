import { useState } from "react";

const getRandomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min));

const getClue = (number, target) => {
  if (number === target) {
    return "☺️";
  }

  if (number > target) {
    return "Too high";
  }

  return "Too low";
};

const NumberGuesser = ({ min = 1, max = 100 }) => {
  const [hasWon, setHasWon] = useState(false);
  const [targetNumber, setTargetNumber] = useState(getRandomNumber(min, max));
  const [currentGuess, setCurrentGuess] = useState(getRandomNumber(min, max));
  const [guesses, setGuesses] = useState([]);

  const handleGuessChange = (event) => {
    event.preventDefault();
    console.log("TODO: Implement guess change");
    setCurrentGuess(Number(event.target.value));
  };
  const handleGuess = (event) => {
    event.preventDefault();
    console.log("TODO: Implement guessing");
    setGuesses(guesses.concat(currentGuess));
    setHasWon(currentGuess === targetNumber);
  };
  const handleReset = (event) => {
    event.preventDefault();
    console.log("TODO: Implement reset");
    setGuesses([]);
    setCurrentGuess(getRandomNumber(min, max));
    setTargetNumber(getRandomNumber(min, max));
    setHasWon(false);
  };

  return (
    <div>
      <h2>
        Can you guess the number between {min} and {max}?
      </h2>
      <div>
        <input
          type="number"
          min={min}
          max={max}
          onChange={handleGuessChange}
          value={currentGuess}
          disabled={hasWon}
        />
        <button onClick={handleGuess} disabled={hasWon}>
          Guess!
        </button>
      </div>
      <div>
        <h3>Guesses</h3>
        <ul>
          {guesses.map((guess, index) => (
            <li key={`${guess}:${index}`}>
              {guess}: {getClue(guess, targetNumber)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {hasWon ? (
          <>
            <h3>You win!</h3>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default NumberGuesser;
