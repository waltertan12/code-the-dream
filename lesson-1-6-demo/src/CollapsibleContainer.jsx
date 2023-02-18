import { useState } from "react";

const CollapsibleContainer = () => {};

const characters = [
  {
    name: "Shrek",
    info: "Shrek, is the titular main protagonist of the book of the same name, and the film series by DreamWorks Animation, as well as a musical.",
  },
  {
    name: "Donkey",
    info: "Donkey is the deuteragonist of the Shrek franchise. He is the talkative, euphoric, happy-go-lucky, and flighty donkey, who is the sidekick and the best friend of Shrek, Dragon's husband, and the Dronkeys' father.",
  },
  {
    name: "Fiona",
    info: "Princess Fiona is the wife of Shrek, the daughter of Queen Lillian and King Harold, a close friend of Donkey, and the mother of the Ogre triplets in the Shrek franchise.",
  },
];

const CollapsibleContainerApp = () => {
  const [isCollapsedMap, setIsCollapsedMap] = useState(
    characters.reduce((isCollapsedMap, { name }) => {
      isCollapsedMap[name] = false;
      return isCollapsedMap;
    }, {})
  );

  return (
    <div>
      <div></div>
      {characters.map(({ name, info }) => {
        const isCollapsed = isCollapsedMap[name] || false;
        return (
          <div className="collapsible-container" key={name}>
            <div className="collapsible-label">
              <div>
                <h2>{name}</h2>
              </div>
              <button
                onClick={() =>
                  setIsCollapsedMap({ ...isCollapsedMap, [name]: !isCollapsed })
                }
              >
                {isCollapsed ? <>🔽</> : <>🔼</>}
              </button>
            </div>
            {isCollapsed ? null : (
              <div className="collapsible-body">
                <p>{info}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CollapsibleContainerApp;
