import pokemonList from './data/pokemonList.json';

const PokemonSelectForm = () => {
  return (
    <div className="pokemon-select-form">
      <img
        src="https://images.alexonsager.net/pokemon/1.png"
        alt="Blastoise"
        width="80"
        height="80"
      />
      <div className="pokemon-select-input">
        <select>
          {pokemonList.map((pokemon) => {
            return <option value={pokemon.id}>{pokemon.name}</option>;
          })}
        </select>
        <button>🔀</button>
      </div>
    </div>
  );
};

export default PokemonSelectForm;
