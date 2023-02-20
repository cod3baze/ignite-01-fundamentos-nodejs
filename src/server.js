import http from "http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    req.params = { ...routeParams.groups };

    await route.handler(req, res);
    return;
  }

  return res.end("Uncaught-exception");
});

server.listen(3333, () => {
  console.log("server is running");
});
