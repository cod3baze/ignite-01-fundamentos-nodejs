import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: async (req, res) => {
      // Early return
      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(await database.select("users")));
    },
  },
  {
    method: "POST",
    path: "/users",
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
];
