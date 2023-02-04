import PokemonSelectForm from './PokemonSelectForm';

const PokemonFusionForm = (props) => {
  return (
    <div className="pokemon-fusion-form">
      <PokemonSelectForm
        pokemonId={props.pokemonHeadId}
        onPokemonSelected={props.onPokemonHeadChanged}
      />
      <button onClick={props.onSwapPokemon}>🔁</button>
      <PokemonSelectForm
        pokemonId={props.pokemonBodyId}
        onPokemonSelected={props.onPokemonBodyChanged}
      />
    </div>
  );
};

export default PokemonFusionForm;
