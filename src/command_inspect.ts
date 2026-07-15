import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a Pokemon name to inspect.");
    return;
  }

  const pokemonName = args[0].toLowerCase();
  const pokemon = state.pokedex[pokemonName];

  // Check if they've caught it first
  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  // Print Pokemon details
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  
  console.log("Stats:");
  for (const s of pokemon.stats) {
    console.log(`  -${s.stat.name}: ${s.base_stat}`);
  }

  console.log("Types:");
  for (const t of pokemon.types) {
    console.log(`  - ${t.type.name}`);
  }
}