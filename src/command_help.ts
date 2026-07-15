import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  const commands = state.commands;
  for (const key in commands) {
    const cmd = commands[key];
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}