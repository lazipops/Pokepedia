const typeEffectiveness = {
  normal: {
    weak: ['fighting'],
    resist: [],
    immune: ['ghost'],
    normal: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'dark', 'steel', 'fairy']
  },
  fire: {
    weak: ['water', 'rock', 'ground'],
    resist: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
    immune: [],
    normal: ['normal', 'electric', 'fighting', 'poison', 'flying', 'psychic', 'ghost', 'dragon', 'dark']
  },
  water: {
    weak: ['electric', 'grass'],
    resist: ['fire', 'water', 'ice', 'steel'],
    immune: [],
    normal: ['normal', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'fairy']
  },
  electric: {
    weak: ['ground'],
    resist: ['electric', 'flying', 'steel'],
    immune: [],
    normal: ['normal', 'fire', 'water', 'grass', 'ice', 'fighting', 'poison', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'fairy']
  },
  grass: {
    weak: ['fire', 'ice', 'poison', 'flying', 'bug'],
    resist: ['water', 'electric', 'grass', 'ground'],
    immune: [],
    normal: ['normal', 'fighting', 'psychic', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
  },
  ice: {
    weak: ['fire', 'fighting', 'rock', 'steel'],
    resist: ['ice'],
    immune: [],
    normal: ['normal', 'water', 'electric', 'grass', 'poison', 'ground', 'flying', 'psychic', 'bug', 'ghost', 'dragon', 'dark', 'fairy']
  },
  fighting: {
    weak: ['flying', 'psychic', 'fairy'],
    resist: ['bug', 'rock', 'dark'],
    immune: [],
    normal: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'poison', 'ground', 'ghost', 'dragon', 'steel']
  },
  poison: {
    weak: ['ground', 'psychic'],
    resist: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
    immune: [],
    normal: ['normal', 'fire', 'water', 'electric', 'ice', 'flying', 'psychic', 'rock', 'ghost', 'dragon', 'dark', 'steel']
  },
  ground: {
    weak: ['water', 'ice', 'grass'],
    resist: ['poison', 'rock'],
    immune: ['electric'],
    normal: ['normal', 'fire', 'fighting', 'ground', 'flying', 'psychic', 'bug', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
  },
  flying: {
    weak: ['electric', 'ice', 'rock'],
    resist: ['grass', 'fighting', 'bug'],
    immune: ['ground'],
    normal: ['normal', 'fire', 'water', 'electric', 'poison', 'flying', 'psychic', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
  },
  psychic: {
    weak: ['bug', 'ghost', 'dark'],
    resist: ['fighting', 'psychic'],
    immune: [],
    normal: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'poison', 'ground', 'flying', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
  },
  bug: {
    weak: ['fire', 'flying', 'rock'],
    resist: ['grass', 'fighting', 'ground'],
    immune: [],
    normal: ['normal', 'water', 'electric', 'ice', 'poison', 'bug', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
  },
  rock: {
    weak: ['water', 'grass', 'fighting', 'ground', 'steel'],
    resist: ['normal', 'fire', 'poison', 'flying'],
    immune: [],
    normal: ['electric', 'ice', 'psychic', 'bug', 'ghost', 'dragon', 'dark', 'fairy']
  },
  ghost: {
    weak: ['ghost', 'dark'],
    resist: ['poison', 'bug'],
    immune: ['normal', 'fighting'],
    normal: ['fire', 'water', 'electric', 'grass', 'ice', 'ground', 'flying', 'psychic', 'rock', 'dragon', 'steel', 'fairy']
  },
  dragon: {
    weak: ['ice', 'dragon', 'fairy'],
    resist: ['fire', 'water', 'electric', 'grass'],
    immune: [],
    normal: ['normal', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'steel', 'fairy']
  },
  dark: {
    weak: ['fighting', 'bug', 'fairy'],
    resist: ['ghost', 'dark'],
    immune: ['psychic'],
    normal: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'poison', 'ground', 'flying', 'rock', 'dragon', 'steel', 'fairy']
  },
  steel: {
    weak: ['fire', 'fighting', 'ground'],
    resist: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
    immune: ['poison'],
    normal: ['water', 'electric', 'ghost', 'dark']
  },
  fairy: {
    weak: ['poison', 'steel'],
    resist: ['fighting', 'bug', 'dark'],
    immune: ['dragon'],
    normal: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'ground', 'flying', 'psychic', 'rock', 'ghost', 'dragon', 'steel']
  }
};

export default typeEffectiveness;