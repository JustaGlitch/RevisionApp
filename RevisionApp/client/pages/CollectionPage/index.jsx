import React, { useState, useEffect } from "react";

function index() {
  const [pokemonData, setPokemonData] = useState({});
  useEffect(() => {
    const getPokemonInfo = async (id) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const result = await response.json();
        setPokemonData((prevData) => ({
          ...prevData,
          [id]: result,
        }));
      } catch (error) {
        console.error(error);
      }
    }
    for (let id = 1; id <= 18; id++) {
      getPokemonInfo(id);
    }
  }, []);

  return (
    <div>
      <h1>My Collection (<span id='pokemonQuantity'>18</span>/510)</h1>
      <div className="d-flex flex-wrap">
      {Object.values(pokemonData).map((pokemon, index) => (
        <div className="px-4 mb-4 d-flex flex-column align-items-center" key={index}>
            <img src={pokemon.sprites.front_default}/>
            {pokemon.name}

            </div>
      ))}
      </div>
    </div>
  )
}

export default index;
