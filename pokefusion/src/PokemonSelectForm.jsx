import pokemonList from './data/pokemonList.json';
import { useState } from 'react';

const PokemonSelectForm = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const handlePokemonSelect = (event) => {
    setPokemonId(Number(event.target.value));
  };

  return (
    <div className="pokemon-select-form">
      <img
        src={`https://images.alexonsager.net/pokemon/${pokemonId}.png`}
        alt="Blastoise"
        width="80"
        height="80"
      />
      <div className="pokemon-select-input">
        <select onChange={handlePokemonSelect}>
          {pokemonList.map((pokemon) => {
            return (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            );
          })}
        </select>
        <button>🔀</button>
      </div>
    </div>
  );
};

export default PokemonSelectForm;
