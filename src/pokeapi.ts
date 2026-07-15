import {Cache} from "./pokecache.js"

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

// Represents the detailed view of a location area
export type LocationAreaDetails = {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheIntervalMs: number = 300000) {
    this.cache = new Cache(cacheIntervalMs);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cachedData = this.cache.get<ShallowLocations>(url);
    if (cachedData !== undefined) {
      return cachedData;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    const data = (await response.json()) as ShallowLocations;

    this.cache.add(url, data);
    return data;
  }

  async fetchLocationArea(areaName: string): Promise<LocationAreaDetails> {
    const url = `${PokeAPI.baseURL}/location-area/${areaName}`;

    // 1. Check cache first
    const cachedData = this.cache.get<LocationAreaDetails>(url);
    if (cachedData !== undefined) {
      return cachedData;
    }

    // 2. Fetch if missing
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location area: ${response.statusText}`);
    }
    const data = (await response.json()) as LocationAreaDetails;

    // 3. Cache it
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    // Use our beautiful cache!
    const cachedData = this.cache.get<Pokemon>(url);
    if (cachedData !== undefined) {
      return cachedData;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }
    const data = (await response.json()) as Pokemon;

    this.cache.add(url, data);
    return data;
  }
}