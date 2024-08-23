type PokemonMove = {
    move: {
      name: string;
      url: string;
    };
  }

export type PokemonData = {
    name: string;
    id: number;
    moves: PokemonMove[];
    types: { type: { name: string } }[];
    abilities: { ability: { name: string }; is_hidden: boolean }[];
    stats: { base_stat: number }[];
    height: number;
    weight: number;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
          front_shiny: string;
        };
      };
    };
    cries: {
      legacy?: string;
      latest: string;
    };
  }
  