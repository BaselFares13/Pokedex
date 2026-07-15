import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js"; // <-- Import it

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Display the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Display the previous 20 location areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore <area_name>",
      description: "Explore a location area to find Pokemon",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon_name>",
      description: "Attempt to catch a Pokemon and add it to your Pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon_name>",
      description: "Inspect details of a caught Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List all the Pokemon you have caught",
      callback: commandPokedex,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}