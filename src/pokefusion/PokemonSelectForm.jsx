import pokemonList from './data/pokemonList.json';
import { getPokemon, getPokemonImageUrl } from './util';

const PokemonSelectForm = (props) => {
  const onSelectPokemon = (event) => props.onSelectPokemon(event.target.value);

  return (
    <div className="pokemon-select-form">
      <img
        src={getPokemonImageUrl(props.pokemonId)}
        alt={getPokemon(props.pokemonId).name}
        width="80"
        height="80"
      />
      <div className="pokemon-select-input">
        <select onChange={onSelectPokemon} value={props.pokemonId}>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name}
            </option>
          ))}
        </select>
        <button onClick={props.onRandomizePokemon}>🔀</button>
      </div>
    </div>
  );
};

export default PokemonSelectForm;
