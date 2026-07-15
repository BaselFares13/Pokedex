import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a location area name to explore.");
    return;
  }

  const areaName = args[0];
  console.log(`Exploring ${areaName}...`);

  try {
    const details = await state.pokeAPI.fetchLocationArea(areaName);
    
    console.log("Found Pokemon:");
    if (details.pokemon_encounters.length === 0) {
      console.log(" (None found in this area)");
      return;
    }

    for (const encounter of details.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  } catch (error) {
    console.log(`Error exploring location area: ${areaName}`);
  }
}