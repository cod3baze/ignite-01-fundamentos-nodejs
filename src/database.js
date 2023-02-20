import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  async #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  async select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }

  async delete(table, identifier) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table] = this.#database[table].filter(
        (item) => item.id !== identifier
      );
    }

    await this.#persist();
    return identifier;
  }

  async insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    await this.#persist();

    return data;
  }
}
