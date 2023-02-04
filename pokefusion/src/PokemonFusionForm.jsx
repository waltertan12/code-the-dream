import PokemonSelectForm from './PokemonSelectForm';

const PokemonFusionForm = (props) => {
  return (
    <div className="pokemon-fusion-form">
      <PokemonSelectForm
        pokemonId={props.pokemonHeadId}
        onSelectPokemon={props.onSelectHead}
      />
      <button onClick={props.onSwapPokemon}>🔁</button>
      <PokemonSelectForm
        pokemonId={props.pokemonBodyId}
        onSelectPokemon={props.onSelectBody}
      />
    </div>
  );
};

export default PokemonFusionForm;
