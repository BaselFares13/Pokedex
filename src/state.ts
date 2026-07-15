import { type Interface, createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "pokedex > ",
  });

  const state: State = {
    rl,
    commands: {},
    pokeAPI: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };

  state.commands = getCommands();

  return state;
}