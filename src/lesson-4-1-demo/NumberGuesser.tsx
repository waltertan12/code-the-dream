import React, { ChangeEvent, useState } from "react";

const getRandomNumber = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min));

const getClue = (number: number, target: number) => {
  if (number === target) {
    return <>☺️</>;
  }

  if (number > target) {
    return <>Too high</>;
  }

  return <>Too low</>;
};

interface GuessProps {
  guess: number;
  targetNumber: number;
}

const Guess = ({ guess, targetNumber }: GuessProps) => {
  return (
    <li>
      {guess}: {getClue(guess, targetNumber)}
    </li>
  );
};

interface GuessListProps {
  guesses: number[];
  targetNumber: number;
}

const GuessList = ({ guesses, targetNumber }: GuessListProps) => {
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

interface NumberGuesserProps {
  min: number;
  max: number;
}

const NumberGuesser = ({ min = 1, max = 100 }: NumberGuesserProps) => {
  const [hasWon, setHasWon] = useState(false);
  const [targetNumber, setTargetNumber] = useState(getRandomNumber(min, max));
  const [currentGuess, setCurrentGuess] = useState(getRandomNumber(min, max));
  const [guesses, setGuesses] = useState<number[]>([]);

  const handleGuessChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentGuess(Number(event.target.value));
  };
  const handleGuess = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setGuesses(guesses.concat(currentGuess));
    setHasWon(targetNumber === currentGuess);
  };
  const handleReset = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
