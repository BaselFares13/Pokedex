# Pokedex REPL CLI

An interactive, type-safe Command Line Interface (CLI) Pokedex written in **TypeScript** and powered by **Node.js**. 

This application functions as a interactive REPL (Read-Eval-Print Loop) that integrates with the live [PokeAPI](https://pokeapi.co/) to let you explore location areas, encounter wild Pokémon, attempt to catch them using base-experience probability formulas, inspect their detailed stats, and manage your captured squad.

---

## 🚀 Features

* **Interactive REPL**: A persistent prompt environment designed with Node's native `readline` module.
* **Location Exploration**: Paginate through geographical location areas (`map` and `mapb` commands).
* **Area Encounters**: Inspect what Pokémon spawn in specific location areas (`explore <area_name>`).
* **Catching Mechanic**: Throw Pokéballs at wild Pokémon! Catch probabilities dynamically scale based on the target's `base_experience`.
* **Dynamic Command Registry**: Commands are managed using a central recursive `State` registry making it incredibly modular to extend.
* **High Performance Custom Cache**: Built-in memory cache system equipped with a automatic background "reap loop" interval to clean up stale network payloads.

---

## 🛠️ Architecture & File Structure

The project emphasizes separation of concerns by modularizing types, configurations, state, and specific commands into dedicated modules:

```text
├── src/
│   ├── command_catch.ts     # 'catch' command execution logic
│   ├── command_exit.ts      # Gracefully terminates the REPL and cleans up streams
│   ├── command_explore.ts   # Parses and lists Pokémon in a specific location
│   ├── command_help.ts      # Iterates over registered commands to print usage
│   ├── command_inspect.ts   # Renders details of caught Pokémon (no extra api calls)
│   ├── command_map.ts       # Forward & backward location area pagination
│   ├── command_pokedex.ts   # Lists currently captured Pokémon names
│   ├── commands.ts          # Orchestrates and maps commands to their definitions
│   ├── main.ts              # Entry point starting the REPL loop
│   ├── pokecache.ts         # Generic TTL Cache with background reaping
│   ├── pokecache.test.ts    # Cache verification test suite
│   ├── pokeapi.ts           # PokeAPI Client and strongly-typed payloads
│   ├── repl.ts              # Input sanitizer helpers
│   └── state.ts             # Global application State initialization & types
├── package.json
└── tsconfig.json
