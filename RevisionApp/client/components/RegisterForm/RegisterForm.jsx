import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [fieldsValidated, setFieldsValidated] = useState(false);
  const [addPokemon, setAddPokemon] = useState({});
  const [selected, setSelected] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [classname, setClassname] = useState("Class 1");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handlePokemonClick = (selectedPokemon) => {
    setSelected(selectedPokemon);
  };
  useEffect(() => {
    if (selected) {
      setAddPokemon(selected);
    }
  }, [selected]);
  useEffect(() => {
    setFieldsValidated(
      username !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
    );
  }, [username, password, confirmPassword]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "https://studydex.onrender.com/student/register",
        {
          username,
          password,
          classname,
        }
      );
      login(response.data.token);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
    }
  };
  const handleSubmitPokemon = async (e) => {
    e.preventDefault();
    addChosenPokemon(addPokemon.id);
    console.log(addPokemon);
    window.location.href = "/";
  };
  const fetchPokemons = async () => {
    const pokemonNames = [3, 6, 9];
    const pokemonData = [];

    for (const id of pokemonNames) {
      const resp = await fetch(
        `https://studydex.onrender.com/student/pokemon/${id}`
      );
      const result = await resp.json();
      const pokemon = {
        name: result.name,
        sprite_url: result.sprite_url,
        id: result.pokemon_id,
      };
      pokemonData.push(pokemon);
    }
    setPokemons(pokemonData);
  };
  const addChosenPokemon = async (id) => {
    const resp = await fetch(
      `https://studydex.onrender.com/student/pokemon/new/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const result = await resp.json();
    return result;
  };
  const getAllCategories = async () => {
    const resp = await fetch("https://studydex.onrender.com/class");
    const result = await resp.json();
    setIsLoading(true)
    setCategories(result);
  };

  useEffect(() => {
    fetchPokemons();
    getAllCategories();
  }, []);


  
  return (
    <>
      <form
        className="w-75 p-4 bg-body-secondary shadow rounded"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center">Register Page</h3>
        <div className="form-group">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Choose a Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="classname" className="form-label">
              Class Name
            </label>
            {/* <input
              type="text"
              className="form-control"
              id="classname"
              placeholder="Enter your class name"
              value={classname}
              onChange={(e) => setClassname(e.target.value)}
              required
            /> */}
              <select
              id="classname"
                className="form-select"
                onChange={(e) => setClassname(e.target.value)}
                
              >
                {categories.map((el) => (
                  <option key={el.classname} value={el.classname} >
                    {isLoading ? el.classname : 'Loading...'}
                  </option>
                ))}
              </select>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-info offset-3 col-6 text-white"
            data-bs-target={fieldsValidated ? "#chooseYourPokemon" : ""}
            data-bs-toggle="modal"
          >
            Next Step
          </button>
        </div>
      </form>
      <div
        className="modal fade"
        id="chooseYourPokemon"
        aria-hidden="true"
        aria-labelledby="chooseYourPokemonLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="chooseYourPokemonLabel">
                Choose your fighter!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmitPokemon}>
              <div className="modal-body">
                <p>You have to choose one of starting pokemon.</p>
                <div className="row">
                  {pokemons.map((pokemon) => (
                    <div className="col" key={pokemon.id}>
                      <div
                        id={pokemon.id}
                        className={`${
                          selected && selected.id === pokemon.id
                            ? "selected"
                            : ""
                        } d-flex align-items-center flex-column`}
                        onClick={() => handlePokemonClick(pokemon)}
                      >
                        <img src={pokemon.sprite_url} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-info text-white" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
