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

  async select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    console.log(search);

    return data;
  }

  async update(table, id, data = {}) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }
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
