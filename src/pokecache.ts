export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(intervalMs: number) {
    this.#interval = intervalMs;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) {
      return undefined;
    }
    return entry.val as T;
  }

  #reap(): void {
    const limit = Date.now() - this.#interval;
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < limit) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop(): void {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}