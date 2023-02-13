import http from "http";

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    req.body = null
  }


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
