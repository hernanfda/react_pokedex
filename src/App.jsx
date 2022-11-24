import "./App.css";
import { useState, useEffect } from "react";
import { pokeRequest, pokeDetails } from "./api/apiRequest";

function App() {
    const [unKokemon, setUnKokemon] = useState([]);
    const [pageOffset, setPageOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(1);
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
        pokeRequest(pageOffset).then((data) => setUnKokemon(data));
    }, [pageOffset]);

    useEffect(() => {
        pokeDetails(selectedPokemon)
            .then((data) => {
                setPokemonDetails(data);
                console.log(`El koke es ${data.name}`);
            })
            .catch((error) => console.log(error));
    }, [selectedPokemon]);

    const nextPageHandler = () => {
        setPageOffset(pageOffset + 10);
    };

    const previousPageHandler = () => {
        if (pageOffset === 0) return;
        setPageOffset(pageOffset - 10);
    };

    const pokemonSelectHandler = (url) => {
        const id = Number(url.split("/").slice(-2)[0]);
        setSelectedPokemon(id);
    };

    return (
        <div className="App">
            {!unKokemon[0] && <h1>No tenes kokemones</h1>}
            {unKokemon.length > 0 && (
                <>
                    <h1>Aca tenes {unKokemon.length} kokemones</h1>
                    <input type="text" placeholder="search your pokemon" />
                    <ul>
                        {unKokemon.map((unKoke) => (
                            <li key={unKoke.url} onClick={() => pokemonSelectHandler(unKoke.url)}>
                                {/* //ejecutar la funcion del onClick como una arrow si le tengo q pasar una prop */}
                                {Number(unKoke.url.split("/").slice(-2)[0])} - {unKoke.name}
                            </li>
                        ))}
                    </ul>
                    <button onClick={nextPageHandler}>Next</button>
                    <button onClick={previousPageHandler}>Previous</button>
                </>
            )}
            <div>
                <h2>Para el peter</h2>
                <p>{pokemonDetails.name}</p>
                {!pokemonDetails.sprites && <h4>Loading image...</h4>}
                {pokemonDetails.sprites && <img src={pokemonDetails.sprites.other.dream_world.front_default} alt="" />}
            </div>
        </div>
    );
}

export default App;
