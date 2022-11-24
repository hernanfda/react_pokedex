import "./styles.css";
import { useState, useEffect } from "react";
import { pokeRequest, pokeDetails } from "./apiRequest";

export default function App() {
  const [unKokemon, setUnKokemon] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    pokeRequest(pageOffset).then((data) => setUnKokemon(data));
  }, [pageOffset]);

  useEffect(() => {
    pokeDetails(selectedPokemon).then((data) => setPokemonDetails(data));
    console.log(`El koke es ${pokemonDetails.forms[0].name}`);
  }, [selectedPokemon]);

  const nextPageHandler = () => {
    setPageOffset(pageOffset + 10);
  };

  const previousPageHandler = () => {
    if (pageOffset === 0) return;
    setPageOffset(pageOffset - 10);
  };

  return (
    <div className="App">
      {!unKokemon[0] && <h1>No tenes kokemones</h1>}
      {unKokemon.length > 0 && (
        <>
          <h1>Aca tenes {unKokemon.length} kokemones</h1>
          <ul>
            {unKokemon.map((unKoke) => (
              <li key={unKoke.url}>
                {Number(unKoke.url.split("/").slice(-2)[0])} - {unKoke.name}
              </li>
            ))}
          </ul>
          <button onClick={nextPageHandler}>Next</button>
          <button onClick={previousPageHandler}>Previous</button>
        </>
      )}
      <h2>Habilidades para el peter</h2>
      <h4>
        {pokemonDetails.id} - {pokemonDetails.name}
      </h4>
    </div>
  );
}
