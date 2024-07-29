import pokemonTypingColouring from "../api/pokemonTypingColour";
import React from "react";
type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "normal"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

  interface TypingBadgeProps {
    type: PokemonType; // Use the defined type
  }
  
  const TypingBadge: React.FC<TypingBadgeProps> = ({ type }) => {
    return (
      <span
        style={{
          backgroundColor: pokemonTypingColouring[type],
          padding: '0.5rem',
          borderRadius: '0.5rem',
          color: type === 'dark' ? 'white' : 'black',
        }}
      >
        {type}
      </span>
    );
  };
  
  export default TypingBadge;
