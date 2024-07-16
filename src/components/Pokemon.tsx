import { useRef, useState, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import api from "../api/api.tsx";
import pokemonTypingColouring from "../api/pokemonTypingColour.tsx";
import "../styling/shinySlider.css";

export default function Pokemon() {
  const inputRef = useRef();
  const [pokemonData, setPokemonData] = useState(null);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    async function pageLoad() {
      // load this right when the page is loaded or refreshed
      try {
        setPokemonData(null);
        const response = await api.get("pokemon?limit=100000&offset=0");
        const loadPokemon = await getPokemon(
          response.data.results[Math.floor(Math.random() * response.data.count)]
            .name // get "random" pokemon with Math.random as the index
        );
        setPokemonData(loadPokemon);
      } catch (error) {
        console.error("Error loading Pokémon data:", error);
        errorModal();
      }
    }

    pageLoad();
  }, []);

  useEffect(() => {
    if (pokemonData !== null) {
      console.log(pokemonData); // shows current state on page load in the console output
    }
  }, [pokemonData]);

  function errorModal() {
    alert("Error: Invalid or no name was entered");
  }

  async function getPokemon(name) {
    try {
      const response = await api.get("pokemon/" + name);
      return response.data;
    } catch (error) {
      console.error("Error fetching the Pokémon data:", error);
      errorModal();
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }

  async function urlChange() {
    const inputValue = inputRef.current.value;

    if (inputValue !== undefined && inputValue !== "") {
      const data = await getPokemon(inputValue);
      if (data) {
        setPokemonData(data);
      }
      inputRef.current.value = "";
    } else {
      errorModal();
      console.log("Input is undefined or empty");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      urlChange();
    }
  }

  // Function to convert meters to feet-inches format
  function metersToFeetInches(meters) {
    const totalInches = meters * 39.37; // Convert meters to total inches
    var feet = Math.floor(totalInches / 12); // Calculate feet
    const inches = Math.round(totalInches % 12); // Calculate remaining inches
    if (feet === 0) {
      // Don't display 0 feet if a pokemon is under a foot tall
      return `${inches} inches`;
    } else {
      return `${feet}'${inches}"`;
    }
  }

  function handleToggleShiny() {
    setIsShiny(!isShiny);
  }

  return (
    <>
      <HStack my="10" id="pokemonPage">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="row w-lg-50">
                <form className="form-inline">
                  <div className="form-group mx-sm-3 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      ref={inputRef}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter Pokemon name here"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mb-2"
                      onClick={urlChange}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="row"></div>
              <div className="col-sm border rounded border-primary p-4 w-100 w-lg-50">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <img
                      src={
                        isShiny
                          ? pokemonData?.sprites.other.home.front_shiny
                          : pokemonData?.sprites.other.home.front_default
                      }
                      alt="Pokemon"
                      className="img-fluid"
                      style={{
                        backgroundColor:
                          pokemonTypingColouring[
                            pokemonData?.types[0].type.name.toLowerCase()
                          ],
                        border: "1px solid black",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="me-3">
                      <h2 className="text-capitalize mb-0">
                        {pokemonData?.name.replace(/-/g, " ")}
                      </h2>
                    </div>
                    <div>
                      <h4 className="mb-0">#{pokemonData?.id}</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col ms-auto">
                      <h4 className="mb-0">Type:</h4>
                      <p
                        className="mb-0 text-capitalize"
                        style={{
                          backgroundColor:
                            pokemonTypingColouring[
                              pokemonData?.types[0].type.name.toLowerCase()
                            ],
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          color:
                            pokemonData?.types[0].type.name.toLowerCase() ===
                            "dark"
                              ? "white"
                              : "black",
                          display: "inline-block",
                          margin: "5px",
                          border: "1px solid black",
                        }}
                      >
                        {pokemonData?.types[0].type.name}
                      </p>
                      {pokemonData?.types[1] && (
                        <>
                          {" "}
                          <span style={{ marginRight: "0.5rem" }}></span>{" "}
                          <p
                            className="mb-0 text-capitalize"
                            style={{
                              backgroundColor:
                                pokemonTypingColouring[
                                  pokemonData?.types[1].type.name.toLowerCase()
                                ],
                              padding: "0.5rem",
                              borderRadius: "0.5rem",
                              color:
                                pokemonData?.types[1].type.name.toLowerCase() ===
                                "dark"
                                  ? "white"
                                  : "black",
                              display: "inline-block",
                              margin: "5px",
                              border: "1px solid black",
                            }}
                          >
                            {pokemonData?.types[1].type.name}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="col ms-auto">
                      <h4 className="mb-0">
                        {pokemonData?.abilities.length > 1
                          ? "Abilities:"
                          : "Ability:"}
                      </h4>
                      {pokemonData?.abilities.map((ability, index) => (
                        <p key={index} className="mb-0 text-capitalize">
                          {ability.ability.name.replace(/-/g, " ")}
                          {ability.is_hidden && " (hidden)"}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col ms-auto">
                      <h4 className="mb-0">Height:</h4>
                      <p>{pokemonData?.height / 10}m</p>
                      <p>{metersToFeetInches(pokemonData?.height / 10)}</p>
                    </div>
                    <div className="col ms-auto">
                      <h4 className="mb-0">Weight:</h4>
                      <p>{pokemonData?.weight / 10} kg</p>
                      <p></p>
                    </div>
                    <div className="col ms-auto">
                      <h4 className="mb-0">Shiny Toggle:</h4>
                      <div className="switch-container">
                        <label className="switch">
                          <input
                            type="checkbox"
                            onChange={handleToggleShiny}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">test</div>
            <div className="row">
              <div id="errorAlert"></div>
            </div>
          </div>
        </div>
      </HStack>
    </>
  );
}
