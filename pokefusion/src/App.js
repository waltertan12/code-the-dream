import PokefusionResult from './PokefusionResult';
import PokemonFusionForm from './PokemonFusionForm';
import pokemon from './data/pokemon.json';
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
