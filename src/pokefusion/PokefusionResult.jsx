import { getPokefusionImageUrl, getPokefusionName, getPokemon } from './util';

const PokefusionResult = (props) => {
  const pokemonHead = getPokemon(props.pokemonHeadId);
  const pokemonBody = getPokemon(props.pokemonBodyId);
  return (
    <div className="pokefusion-result">
      <div>
        <h2>{getPokefusionName(pokemonHead, pokemonBody)}</h2>
        <img
          src={getPokefusionImageUrl(props.pokemonHeadId, props.pokemonBodyId)}
          alt={getPokefusionName(pokemonHead, pokemonBody)}
        />
      </div>
    </div>
  );
};

export default PokefusionResult;
