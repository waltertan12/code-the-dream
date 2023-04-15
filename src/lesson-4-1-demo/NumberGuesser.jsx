import { useState } from "react";

const getRandomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min));

const getClue = (number, target) => {
  if (number === target) {
    return <>☺️</>;
  }

  if (number > target) {
    return <>Too high</>;
  }

  return <>Too low</>;
};

const Guess = ({ guess, targetNumber }) => {
  return (
    <li>
      {guess}: {getClue(guess, targetNumber)}
    </li>
  );
};

const GuessList = ({ guesses, targetNumber }) => {
  return (
    <>
      <h3>Guesses</h3>
      <ul>
        {guesses.map((guess, index) => (
          <Guess
            guess={guess}
            targetNumber={targetNumber}
            key={`${guess}:${index}`}
          />
        ))}
      </ul>
    </>
  );
};

const NumberGuesser = ({ min = 1, max = 100 }) => {
  const [hasWon, setHasWon] = useState(false);
  const [targetNumber, setTargetNumber] = useState(getRandomNumber(min, max));
  const [currentGuess, setCurrentGuess] = useState(getRandomNumber(min, max));
  const [guesses, setGuesses] = useState([]);

  const handleGuessChange = (event) => {
    event.preventDefault();
    setCurrentGuess(Number(event.target.value));
  };
  const handleGuess = (event) => {
    event.preventDefault();
    setGuesses(guesses.concat(currentGuess));
    setHasWon(targetNumber === currentGuess);
  };
  const handleReset = (event) => {
    event.preventDefault();
    setHasWon(false);
    setTargetNumber(getRandomNumber(min, max));
    setCurrentGuess(getRandomNumber(min, max));
    setGuesses([]);
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
      <GuessList guesses={guesses} targetNumber={targetNumber} />
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
