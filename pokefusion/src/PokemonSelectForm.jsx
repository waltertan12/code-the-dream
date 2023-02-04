import pokemonList from './data/pokemonList.json';

const PokemonSelectForm = (props) => {
  const onPokemonSelected = (event) => {
    props.onPokemonSelected(event.target.value);
  };

  return (
    <div className="pokemon-select-form">
      <img
        src={`https://images.alexonsager.net/pokemon/${props.pokemonId}.png`}
        alt="Blastoise"
        width="80"
        height="80"
      />
      <div className="pokemon-select-input">
        <select onChange={onPokemonSelected}>
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
