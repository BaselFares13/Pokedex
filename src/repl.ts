import { createInterface } from "readline";
import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/)
}

export function startREPL() {
  console.log("Welcome to the Pokedex!");

  const state = initState();  
  
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", async (line) => {
    const inputs = cleanInput(line);
    const command = inputs[0].toLowerCase();
    const args = inputs.slice(1);

    if (command.length > 0) {
      if (command in state.commands) {
        try {
          await state.commands[command].callback(state, ...args);
        } catch (error) {
          console.error("An error occurred while executing the command:", error);
        }
        rl.prompt();
        return;
      } else {
        console.log("Unknown command");
      }
    }
    rl.prompt();
  });
}