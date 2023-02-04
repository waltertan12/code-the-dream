import PokefusionResult from './PokefusionResult';
import PokemonFusionForm from './PokemonFusionForm';
import { getPokemonImageUrl, getPokefusionImageUrl } from './util';

function App() {
  const pokemonHeadId = '1';
  const pokemonBodyId = '9';

  return (
    <div className="app">
      <h1>Pokéfusion</h1>
      <PokefusionResult
        pokemonHeadId={pokemonHeadId}
        pokemonBodyId={pokemonBodyId}
      />
      <PokemonFusionForm />
    </div>
  );
}

export default App;
