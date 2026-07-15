import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a Pokemon name to catch.");
    return;
  }

  const pokemonName = args[0].toLowerCase();
  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    const baseExp = pokemon.base_experience;
    const catchChance = Math.max(0.05, 1 - (baseExp / 400)); 
    const roll = Math.random();

    if (roll <= catchChance) {
      console.log(`${pokemonName} was caught!`);
      state.pokedex[pokemonName] = pokemon;
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (error) {
    console.log(`Could not find Pokemon: ${pokemonName}. Make sure you spelled it right!`);
  }
}