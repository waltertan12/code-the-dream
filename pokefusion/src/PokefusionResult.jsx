import pokemonList from './data/pokemonList.json';
import { getPokefusionImageUrl, getPokefusionName } from './util';

const PokefusionResult = (props) => {
  const pokemonHead = pokemonList.find(
    (pokemon) => pokemon.id === props.pokemonHeadId,
  );
  const pokemonBody = pokemonList.find(
    (pokemon) => pokemon.id === props.pokemonBodyId,
  );
  return (
    <div className="pokefusion-result">
      <div>
        <h2>{getPokefusionName(pokemonHead, pokemonBody)}</h2>
        <img
          src={getPokefusionImageUrl(props.pokemonHeadId, props.pokemonBodyId)}
          alt="Bulbtoise"
        />
      </div>
    </div>
  );
};

export default PokefusionResult;
