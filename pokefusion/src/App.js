import PokefusionResult from './PokefusionResult';
import PokemonFusionForm from './PokemonFusionForm';
import { useState } from 'react';
import { getRandomPokemon } from './util';

function App() {
  const [pokemonHeadId, setPokemonHeadId] = useState(getRandomPokemon().id);
  const [pokemonBodyId, setPokemonBodyId] = useState(getRandomPokemon().id);
  const swapPokemonHandler = () => {
    setPokemonHeadId(pokemonBodyId);
    setPokemonBodyId(pokemonHeadId);
  };
  const randomizeHeadHandler = () => setPokemonHeadId(getRandomPokemon().id);
  const randomizeBodyHandler = () => setPokemonBodyId(getRandomPokemon().id);

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
        onRandomizeHead={randomizeHeadHandler}
        pokemonBodyId={pokemonBodyId}
        onSelectBody={setPokemonBodyId}
        onRandomizeBody={randomizeBodyHandler}
        onSwapPokemon={swapPokemonHandler}
      />
    </div>
  );
}

export default App;
