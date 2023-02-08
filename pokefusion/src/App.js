import PokefusionResult from './PokefusionResult';
import PokemonFusionForm from './PokemonFusionForm';
import { getPokemonImageUrl, getPokefusionImageUrl } from './util';
import { useState } from 'react';

function App() {
  const [pokemonHeadId, setPokemonHeadId] = useState('1');
  const [pokemonBodyId, setPokemonBodyId] = useState('9');
  const swapPokemonHandler = () => {
    console.log('TODO: Swap head and body id');
  };

  return (
    <div className="app">
      <h1>Pokéfusion</h1>
      <PokefusionResult
        pokemonHeadId={pokemonHeadId}
        pokemonBodyId={pokemonBodyId}
      />
      <PokemonFusionForm
        pokemonHeadId={pokemonHeadId}
        onSelectHead={setPokemonHeadId}
        pokemonBodyId={pokemonBodyId}
        onSelectBody={setPokemonBodyId}
        onSwapPokemon={swapPokemonHandler}
      />
    </div>
  );
}

export default App;
