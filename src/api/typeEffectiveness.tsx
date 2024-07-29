const typeEffectiveness = {
  normal: { weak: ["fighting"], resist: [], immune: ["ghost"] },
  fire: {
    weak: ["water", "rock", "ground"],
    resist: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    immune: [],
  },
  water: {
    weak: ["electric", "grass"],
    resist: ["fire", "water", "ice", "steel"],
    immune: [],
  },
  electric: {
    weak: ["ground"],
    resist: ["electric", "flying", "steel"],
    immune: [],
  },
  grass: {
    weak: ["fire", "ice", "poison", "flying", "bug"],
    resist: ["water", "electric", "grass", "ground"],
    immune: [],
  },
  fighting: {
    weak: ["flying", "psychic", "fairy"],
    resist: ["rock", "bug", "dark"],
    immune: [],
  },
  flying: {
    weak: ["rock", "electric", "ice"],
    resist: ["fighting", "bug", "grass"],
    immune: [],
  },
  poison: {
    weak: ["ground", "psychic"],
    resist: ["fighting", "bug", "poison", "grass", "fairy"],
    immune: [],
  },
  ground: {
    weak: ["water", "grass", "ice"],
    resist: ["rock", "poison"],
    immune: ["electric"],
  },
  rock: {
    weak: ["fighting", "ground", "steel", "water", "grass"],
    resist: ["normal", "flying", "poison", "fire"],
    immune: [],
  },
  bug: {
    weak: ["flying", "rock", "fire"],
    resist: ["fighting", "ground", "grass"],
    immune: [],
  },
  ghost: {
    weak: ["ghost", "dark"],
    resist: ["poison", "bug"],
    immune: ["normal", "fighting"],
  },
  steel: {
    weak: ["fighting", "ground", "fire"],
    resist: ["normal", "bug", "flying", "rock", "steel", "grass", "psychic", "ice", "dragon", "fairy"],
    immune: ["poison"],
  },
  psychic: {
    weak: ["bug", "ghost", "dark"],
    resist: ["fighting", "psychic"],
    immune: [],
  },
  ice: {
    weak: ["fighting", "rock", "steel", "fire"],
    resist: ["ice"],
    immune: [],
  },
  dragon: {
    weak: ["ice", "dragon", "fairy"],
    resist: ["fire", "water", "grass", "electric"],
    immune: [],
  },
  dark: {
    weak: ["fighting", "bug", "fairy"],
    resist: ["ghost", "dark"],
    immune: ["psychic"],
  },
  fairy: {
    weak: ["poison", "steel"],
    resist: ["fighting", "bug", "dark"],
    immune: ["dragon"],
  }
};

export default typeEffectiveness;