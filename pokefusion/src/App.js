import PokefusionResult from './PokefusionResult';
import PokemonFusionForm from './PokemonFusionForm';
import { getPokemonImageUrl, getPokefusionImageUrl } from './util';

function App() {
  return (
    <div className="app">
      <h1>Pokéfusion</h1>
      <PokefusionResult />
      <PokemonFusionForm />
    </div>
  );
}

export default App;
