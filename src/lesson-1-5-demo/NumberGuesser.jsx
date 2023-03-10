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
  // Using <form /> submissions
  const handleGuessSubmit = (event) => {
    event.preventDefault();
    const guess = Number(event.target.elements["guess"].value);
    setGuesses(guesses.concat(guess));
    setHasWon(targetNumber === guess);
  };
  const handleSubmitClick = (event) => {
    // Can also find guess information by accessing the form via event.target.form
    // event.preventDefault();
    // const guess = Number(event.target.form.elements["guess"].value);
    // setGuesses(guesses.concat(guess));
    // setHasWon(targetNumber === guess);
  };

  return (
    <div>
      <h2>
        Can you guess the number between {min} and {max}?
      </h2>
      <div>
        {/* This is a controlled component since the value is managed/controlled by state */}
        <input
          type="number"
          min={min}
          max={max}
          onChange={
            handleGuessChange /* this onChange handler updates component state */
          }
          value={
            currentGuess /* this value is is provided by component state */
          }
          disabled={hasWon}
        />
        <button onClick={handleGuess} disabled={hasWon}>
          Guess!
        </button>
        {/* Using <form /> */}
        {/* This is an uncontrolled component: state is managed by the form/DOM */}
        <form onSubmit={handleGuessSubmit}>
          {/* Notice there is no `value` or `onChange` prop on the input */}
          <input
            name="guess"
            type="number"
            min={min}
            max={max}
            disabled={hasWon}
            defaultValue={currentGuess}
          />
          <input
            type="submit"
            value="Guess with <form />"
            onClick={handleSubmitClick}
            disabled={hasWon}
          />
        </form>
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
