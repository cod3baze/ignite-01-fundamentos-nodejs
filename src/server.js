import http from "http";
import { json } from "./middlewares/json.js";

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === "GET" && url === "/users") {
    // Early return
    return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users));
  }


  if (method === "POST" && url === "/users") {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email,
    })

    return res.writeHead(202).end()
  }

  return res.end("Hello world");
});

server.listen(3333, () => {
  console.log("server is running");
});
