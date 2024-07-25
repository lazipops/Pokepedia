import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  Navigate,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Pokemon from "./components/Pokemon.tsx";
import About from "./components/About.tsx";
import Layout from "./Layout.tsx";
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { pokemonAtom } from '../src/atom.tsx';
import api from '../src/api/api.tsx';

function App() {
  const [pokemonData, setPokemonData] = useAtom(pokemonAtom);

  useEffect(() => {
    async function initializeData() {
      // check if Pokémon data is already present in the atom
      if (!pokemonData) {
        try {
          // fetch initial Pokémon data
          const response = await api.get('pokemon?limit=100000&offset=0');
          const randomPokemon = response.data.results[
            Math.floor(Math.random() * response.data.count)
          ].name;

          // fetch data for the selected Pokémon
          const pokemonResponse = await api.get('pokemon/' + randomPokemon);
          setPokemonData(pokemonResponse.data); // Extract and set the data
        } catch (error) {
          console.error('Error fetching initial Pokémon data:', error);
        }
      }
    }

    initializeData();
  }, [pokemonData, setPokemonData]);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Pokemon />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route> //catch all for any garbage url typed in
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
