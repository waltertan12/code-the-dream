import pokemonList from './data/pokemonList.json';

/**
 *
 * @param {String} pokemonId
 * @returns The image url of the pokemon
 */
export const getPokemonImageUrl = (pokemonId) =>
  `https://images.alexonsager.net/pokemon/${pokemonId}.png`;

/**
 *
 * @param {String} headId The pokemon id used for the head of the fused pokemon
 * @param {String} bodyId The pokemon id used for the body of the fused pokemon
 * @returns {string} The image url of the fused pokemon
 */
export const getPokefusionImageUrl = (headId, bodyId) =>
  `https://images.alexonsager.net/pokemon/fused/${bodyId}/${bodyId}.${headId}.png`;

/**
 *
 * @param {Object} pokemonHead
 * @param {Object} pokemonBody
 * @returns The fused pokemon name
 */
export const getPokefusionName = (pokemonHead, pokemonBody) =>
  pokemonHead.prefix + pokemonBody.suffix;

/**
 *
 * @param {String} pokemonId
 * @returns
 */
export const getPokemon = (pokemonId) => {
  const pokemon = pokemonList.find((pokemon) => pokemon.id === pokemonId);
  if (!pokemon) {
    throw new Error(`Unable to find pokemon with id ${pokemonId}`);
  }

  return pokemon;
};

export const getRandomPokemon = () =>
  pokemonList[Math.floor(Math.random() * pokemonList.length)];
