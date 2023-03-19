const http = require('http');

function handler(request, response) {
  const { url, method } = request;
}

const app = http.createServer(handler);
const DEFAULT_PORT = 3000;

app.listen(DEFAULT_PORT, () => console.log(`Listening at port: ${DEFAULT_PORT}`));