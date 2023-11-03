import React, { useState, useEffect } from "react";
import Preloader from '../../assets/img/preloader3.gif'
function index() {
  const [pokemonData, setPokemonData] = useState({});
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://studydex.onrender.com/student/pokemon/collection",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const collectionData = await response.json();
        setIsLoading(true)
        setCollection(collectionData);
        console.log(collectionData);
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();

    // const getPokemonInfo = async (id) => {
    //   try {
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    //     const result = await response.json();
    //     setPokemonData((prevData) => ({
    //       ...prevData,
    //       [id]: result,
    //     }));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // for (let id = 1; id <= 18; id++) {
    //   getPokemonInfo(id);
    // }
  }, []);

  return (
    <div>
      <h1>
        My Collection (<span id="pokemonQuantity">{collection.length}</span>
        /151)
      </h1>
      <div className="d-flex flex-wrap">
        {isLoading ?
        collection.map((pokemon) => (
            <div
              className="px-4 mb-4 d-flex flex-column align-items-center"
              key={pokemon.collection_id}
            >
              <img src={pokemon.sprite_url} alt={pokemon.name} />
              <span>{pokemon.name}</span>
            </div>
             
             
             ))
             :
             <img src={Preloader}/>
      
      }
      </div>
    </div>
  );
}

export default index;
