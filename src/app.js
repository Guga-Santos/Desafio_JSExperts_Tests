const http = require('http');
const routes = require('./routes');
const DEFAULT_PORT = 3000;

function handler(request, response) {
  const { url, method } = request;
  let routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http.createServer(handler);

app.listen(DEFAULT_PORT, () => console.log(`Listening at port: ${DEFAULT_PORT}`));

module.exports = app;