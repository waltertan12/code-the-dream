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

export const getPokefusionName = (pokemonHead, pokemonBody) => {
  return pokemonHead.prefix + pokemonBody.suffix;
};
