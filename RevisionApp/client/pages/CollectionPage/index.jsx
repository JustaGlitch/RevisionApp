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
              authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const collectionData = await response.json();
        if (collectionData) {
        setIsLoading(true);
        setCollection(collectionData);
      } else {
        console.error("Collection data is empty or not in the expected format");
      }
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
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
