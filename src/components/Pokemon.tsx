import { useRef, useState, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import api from "../api/api.tsx";
import pokemonTypingColouring from "../api/pokemonTypingColour.tsx";
import "../styling/shinySlider.css";
import "../styling/tableStyling.css";
import { pokemonAtom } from "../atom.tsx";
import { useAtom } from "jotai";
import typeEffectiveness from "../api/typeEffectiveness.tsx";
import ScrollToTopButton from "./ScrollToTopButton.tsx";

//add a navigation option at the top to search for a pokemon by category (legendary, mythical, by name, by pokedex, gigantimax, etc.)

export default function Pokemon() {
  const inputRef = useRef();
  const audioRef = useRef();
  const [pokemonData, setPokemonData] = useAtom(pokemonAtom); // global variable for when pages change
  const [isShiny, setIsShiny] = useState(false);
  const [isLegacyCry, setLegacyCry] = useState(false);
  const [isLegacyToggled, setIsLegacyToggled] = useState(false);
  const [weakness, setWeaknesses] = useState({
    weaknesses: {},
    resistances: {},
    immunities: {},
  });

  useEffect(() => {
    if (pokemonData !== null) {
      console.log(pokemonData); // shows current state on page load in the console output
      if (pokemonData?.cries.legacy !== null) {
        const types = pokemonData?.types.map((type) => type.type.name);
        setWeaknesses(calculateWeaknesses(types));
        // set state to true if pokemon has a legacy cry
        setLegacyCry(true);
      } else {
        setLegacyCry(false);
        setIsLegacyToggled(false); // set checkbox to unchecked if another pokemon is loaded in and doesn't have a legacy cry
      }
    }
  }, [pokemonData]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // reload audio element
    }
  }, [pokemonData, isLegacyToggled]);

  function errorModal() {
    // handle error modal
    alert("Invalid or no name was entered.");
  }

  function calculateWeaknesses(types) {
    const typeMultipliers = {};

    //initialize the effectiveness multipliers
    types.forEach((type) => {
      const typeData = typeEffectiveness[type.toLowerCase()];

      //apply immunities first to ensure they override other multipliers
      if (typeData && typeData.immune) {
        typeData.immune.forEach((immunity) => {
          typeMultipliers[immunity] = 0;
        });
      }

      //apply weaknesses
      if (typeData && typeData.weak) {
        typeData.weak.forEach((weakness) => {
          // Only apply if not immune
          if (typeMultipliers[weakness] !== 0) {
            typeMultipliers[weakness] = (typeMultipliers[weakness] || 1) * 2;
          }
        });
      }

      //apply resistances
      if (typeData && typeData.resist) {
        typeData.resist.forEach((resistance) => {
          //only apply if not immune
          if (typeMultipliers[resistance] !== 0) {
            typeMultipliers[resistance] =
              (typeMultipliers[resistance] || 1) * 0.5;
          }
        });
      }
    });

    // Finalize weaknesses, resistances, immunities, and normal damage
    const weaknesses = {};
    const resistances = {};
    const immunities = {};
    const normalDamage = {};

    Object.entries(typeMultipliers).forEach(([type, multiplier]) => {
      if (multiplier === 0) {
        immunities[type] = multiplier;
      } else if (multiplier > 1) {
        weaknesses[type] = multiplier;
      } else if (multiplier < 1) {
        resistances[type] = multiplier;
      } else {
        normalDamage[type] = multiplier;
      }
    });

    return { weaknesses, resistances, immunities, normalDamage };
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
    const inputValue = inputRef.current.value
      .toLowerCase()
      .trim()
      .replace(/ +/g, ""); // use .trim() here to get rid of whitespace and convert to lowercase and whitespace in between letters

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
    // event handler for enter key for search bar
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

  function statTotal(arr) {
    // get total value of pokemon stats
    return arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }

  function handleToggleShiny() {
    setIsShiny(!isShiny);
  }

  function handleToggleLegacyCry() {
    setIsLegacyToggled(!isLegacyToggled);
  }

  function formatLearningMethod(method) {
    switch (method) {
      case "level-up":
        return "Level Up";
      case "tutor":
        return "Tutor";
      case "machine":
        return "TM/HM";
      case "egg":
        return "Egg Move";
      case "transfer":
        return "Transfer";
      case "sketch":
        return "Sketch";
      default:
        return method;
    }
  }

  return (
    <>
      <div>
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
                <div
                  className="col-sm p-4 w-100 w-lg-50"
                  style={{
                    border: "1px solid black",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <img
                        src={
                          isShiny
                            ? pokemonData?.sprites.other["official-artwork"]
                                .front_shiny
                            : pokemonData?.sprites.other["official-artwork"]
                                .front_default
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
                      <div className="col ms-auto">
                        <h4 className="mb-0">Cry:</h4>
                        {isLegacyCry && (
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              checked={isLegacyToggled}
                              onChange={handleToggleLegacyCry}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Toggle legacy cry
                            </label>
                          </div>
                        )}
                        <audio controls ref={audioRef}>
                          <source
                            src={
                              isLegacyToggled
                                ? pokemonData?.cries.legacy
                                : pokemonData?.cries.latest
                            }
                            type="audio/ogg"
                          />
                          Your browser does not support the audio element.
                        </audio>
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
              <div className="col-sm table-alignment">
                <h1 className="text-center">Stats</h1>
                <div className="tbl-container bdr">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Stat</th>
                        <th scope="col">Base</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">HP</td>
                        <td>{pokemonData?.stats["0"]["base_stat"]}</td>
                      </tr>
                      <tr>
                        <td scope="row">Attack</td>
                        <td>{pokemonData?.stats["1"]["base_stat"]}</td>
                      </tr>
                      <tr>
                        <td scope="row">Defense</td>
                        <td>{pokemonData?.stats["2"]["base_stat"]}</td>
                      </tr>
                      <tr>
                        <td scope="row">SP. Attack</td>
                        <td>{pokemonData?.stats["3"]["base_stat"]}</td>
                      </tr>
                      <tr>
                        <td scope="row">SP. Defense</td>
                        <td>{pokemonData?.stats["4"]["base_stat"]}</td>
                      </tr>
                      <tr>
                        <td scope="row">Speed</td>
                        <td>{pokemonData?.stats["5"]["base_stat"]}</td>
                      </tr>
                      <tr>
                        <td scope="row">Total</td>
                        <td>
                          {statTotal([
                            pokemonData?.stats["0"]["base_stat"],
                            pokemonData?.stats["1"]["base_stat"],
                            pokemonData?.stats["2"]["base_stat"],
                            pokemonData?.stats["3"]["base_stat"],
                            pokemonData?.stats["4"]["base_stat"],
                            pokemonData?.stats["5"]["base_stat"],
                          ])}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-sm table-alignment">
                <h1 className="text-center">Type Effectiveness</h1>
                <div className="tbl-container bdr">
                  <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Effectiveness</th>
                        <th scope="col">Types</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Weak to</td>
                        <td className="text-capitalize">
                          {weakness &&
                          weakness.weaknesses &&
                          Object.entries(weakness.weaknesses).length > 0
                            ? Object.entries(weakness.weaknesses).map(
                                ([type, multiplier]) => (
                                  <div
                                    key={type}
                                    style={{
                                      backgroundColor:
                                        pokemonTypingColouring[
                                          type.toLowerCase()
                                        ],
                                      color:
                                        type.toLowerCase() === "dark"
                                          ? "white"
                                          : "black",
                                      padding: "0.5rem",
                                      borderRadius: "0.5rem",
                                      display: "inline-block",
                                      margin: "5px",
                                      border: "1px solid black",
                                    }}
                                  >
                                    {type} (*{multiplier})
                                  </div>
                                )
                              )
                            : "None"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Resistant to</td>
                        <td className="text-capitalize">
                          {weakness &&
                          weakness.resistances &&
                          Object.entries(weakness.resistances).length > 0
                            ? Object.entries(weakness.resistances).map(
                                ([type, multiplier]) => (
                                  <div
                                    key={type}
                                    style={{
                                      backgroundColor:
                                        pokemonTypingColouring[
                                          type.toLowerCase()
                                        ],
                                      color:
                                        type.toLowerCase() === "dark"
                                          ? "white"
                                          : "black",
                                      padding: "0.5rem",
                                      borderRadius: "0.5rem",
                                      display: "inline-block",
                                      margin: "5px",
                                      border: "1px solid black",
                                    }}
                                  >
                                    {type} (*{multiplier})
                                  </div>
                                )
                              )
                            : "None"}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Immune to</td>
                        <td className="text-capitalize">
                          {weakness &&
                          weakness.immunities &&
                          Object.keys(weakness.immunities).length > 0
                            ? Object.keys(weakness.immunities).map((type) => (
                                <div
                                  key={type}
                                  style={{
                                    backgroundColor:
                                      pokemonTypingColouring[
                                        type.toLowerCase()
                                      ],
                                    color:
                                      type.toLowerCase() === "dark"
                                        ? "white"
                                        : "black",
                                    padding: "0.5rem",
                                    borderRadius: "0.5rem",
                                    display: "inline-block",
                                    margin: "5px",
                                    border: "1px solid black",
                                  }}
                                >
                                  {type}
                                </div>
                              ))
                            : "None"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row table-alignment">
                <h1 className="text-center">Learnable Moves</h1>
                <div id="learnMovesTbl" className="tbl-container bdr">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Move Name</th>
                        <th scope="col">Level Learned At</th>
                        <th scope="col">Learning Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pokemonData?.moves.map((move, index) => (
                        <tr key={index}>
                          <td className="text-capitalize">
                            {move.move.name.replace(/-/g, " ")}
                          </td>
                          <td>
                            {move.version_group_details[0].level_learned_at ===
                            0
                              ? ""
                              : move.version_group_details[0].level_learned_at}
                          </td>
                          <td className="text-capitalize">
                            {move.version_group_details[0].move_learn_method
                              .name === "machine"
                              ? "TM/HM"
                              : move.version_group_details[0].move_learn_method
                                  .name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </HStack>
      </div>
      <div>
        <ScrollToTopButton />
      </div>
    </>
  );
}
