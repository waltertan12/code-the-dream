import PokemonSelectForm from './PokemonSelectForm';

const PokemonFusionForm = () => {
  return (
    <div className="pokemon-fusion-form">
      <PokemonSelectForm />
      <button>🔁</button>
      <PokemonSelectForm />
    </div>
  );
};

export default PokemonFusionForm;
