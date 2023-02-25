import { useState, useReducer } from "react";

const FRIENDSHIP_LEVELS = {
  CLOSE_FRIEND: { value: 0.95, label: "Close Friend ☺️" },
  FRIEND: { value: 0.75, label: "Friend 😀" },
  ACQUAINTANCE: { value: 0.5, label: "Acquaintance 🙂" },
  ENEMY: { value: 0.1, label: "Enemy 👿" },
};

let id = 0;
const attendDinnerParty = ({
  health = 0.8,
  friendshipLevel = FRIENDSHIP_LEVELS.FRIEND.value,
  timeout = 1_000,
}) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // if the number generated is greater than my health, then I got sick
      const isSick = Math.random() > health;
      // Even if I'm healthy, depending on the friendship level, I may flake and not attend
      // If the host is a close friend, I am less likely to flake
      // If the host is an enemy, I am more likely to flake
      const isFlaky = Math.random() > friendshipLevel;

      if (isSick && isFlaky) {
        reject({
          id: ++id,
          status: "🫣 + 🤢",
          attended: false,
          timestamp: new Date(),
        });
      } else if (isSick && !isFlaky) {
        reject({
          id: ++id,
          status: "🤢",
          attended: false,
          timestamp: new Date(),
        });
      } else if (!isSick && isFlaky) {
        reject({
          id: ++id,
          status: "🫣",
          attended: false,
          timestamp: new Date(),
        });
      } else {
        resolve({
          id: ++id,
          status: "🥳",
          attended: true,
          timeestamp: new Date(),
        });
      }
    }, timeout);
  });

const DinnerParty = () => {
  // TODO: Add state to manage form
  // TODO: Add state to store results dinner party attendance
  return (
    <div>
      <h3>Am I going to the Dinner Party?</h3>
      <h4>Status: Deciding...</h4>
      {/* TODO: display the results of attending the dinner party */}
      <div>
        {/* TODO: Add value / change handler to get healthiness */}
        <label>
          Health
          <br />
          <input type="number" min="0" max="1" step="0.01" />
        </label>
        <label>
          Friendship Level
          <br />
          {/* TODO: Add value / change handler to manage friendship level */}
          <select>
            {Object.values(FRIENDSHIP_LEVELS).map((friendshipLevel) => {
              return (
                <option
                  value={friendshipLevel.value}
                  key={friendshipLevel.value}
                >
                  {friendshipLevel.label}
                </option>
              );
            })}
          </select>
        </label>
        {/* TODO: Add click handler to make decision on the dinner party */}
        <button>Will I attend the dinner party?</button>
      </div>
      <div>
        <h4>Dinner Party Log</h4>
        <ul>
          {/* TODO: Show status of past dinner parties */}
          {/* Use format `Dinner Party ✅ #${id}: ${status}`*/}
          <li>❌ - Dinner Party #2 - Status 🤢</li>
          <li>✅ - Dinner Party #1 - Status 🥳</li>
        </ul>
      </div>
    </div>
  );
};

export default DinnerParty;
