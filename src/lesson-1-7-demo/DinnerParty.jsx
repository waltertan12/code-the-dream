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
          timestamp: new Date(),
        });
      } else if (isSick && !isFlaky) {
        reject({
          id: ++id,
          status: "🤢",
          timestamp: new Date(),
        });
      } else if (!isSick && isFlaky) {
        reject({
          id: ++id,
          status: "🫣",
          timestamp: new Date(),
        });
      } else {
        resolve({
          id: ++id,
          status: "🥳",
          timeestamp: new Date(),
        });
      }
    }, timeout);
  });

// DINNER_PARTY_INVITE_RECEIVED
// DINNER_PARTY_INVITE_ACCEPTED
// DINNER_PARTY_INVITE_REJECTED
// HEALTH_CHANGED
// FRIENDSHIP_LEVEL_CHANGED

const initialReducerState = {
  health: 0.5,
  friendshipLevel: FRIENDSHIP_LEVELS.FRIEND.value,
  isDeciding: false,
  dinnerPartyResults: [],
};

const DinnerParty = () => {
  // TODO: Add state to manage form
  const [health, setHealth] = useState(0.5);
  const [friendshipLevel, setFriendshipLevel] = useState(
    FRIENDSHIP_LEVELS.FRIEND.value
  );
  const [isDeciding, setIsDeciding] = useState(false);
  const [dinnerPartyResults, setDinnerPartyResults] = useState([]);
  const handleHealthChange = (event) => {
    setHealth(Number(event.target.value));
  };
  const handleFriendshipLevelChange = (event) => {
    setFriendshipLevel(Number(event.target.value));
  };

  const handleDinnerPartyInvite = () => {
    console.log("Handling dinner party invite");
    console.log({ health, friendshipLevel });
    setIsDeciding(true);
    // async request! how do we get access to the results?
    attendDinnerParty({
      health,
      friendshipLevel,
    })
      .then((dinnerPartyResult) => {
        setDinnerPartyResults([...dinnerPartyResults, dinnerPartyResult]);
        setIsDeciding(false);
      })
      .catch((dinnerPartyResult) => {
        setDinnerPartyResults([...dinnerPartyResults, dinnerPartyResult]);
        setIsDeciding(false);
      });
  };

  // TODO: Add state to store results dinner party attendance
  return (
    <div>
      <h3>Am I going to the Dinner Party?</h3>
      <h4>Status: {isDeciding ? <>Deciding...</> : <>Decision made!</>}</h4>
      {/* TODO: display the results of attending the dinner party */}
      <div>
        <label>
          Health
          <br />
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={health}
            onChange={handleHealthChange}
          />
        </label>
        <label>
          Friendship Level
          <br />
          {/* TODO: Add value / change handler to manage friendship level */}
          <select
            value={friendshipLevel}
            onChange={handleFriendshipLevelChange}
          >
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
        <button onClick={handleDinnerPartyInvite} disabled={isDeciding}>
          Will I attend the dinner party?
        </button>
      </div>
      <div>
        <h4>Dinner Party Log</h4>
        <ul>
          {dinnerPartyResults.map((dinnerPartyResult) => {
            return (
              <li>
                Dinner Party #{dinnerPartyResult.id}: {dinnerPartyResult.status}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DinnerParty;
