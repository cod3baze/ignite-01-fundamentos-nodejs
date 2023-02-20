import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: async (req, res) => {
      // Early return
      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(await database.select("users")));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: async (req, res) => {
      const { name, email } = req.body;

      await database.insert("users", {
        id: randomUUID(),
        name,
        email,
      });

      return res.writeHead(202).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;

      await database.delete("users", id);

      return res.writeHead(202).end();
    },
  },
];
