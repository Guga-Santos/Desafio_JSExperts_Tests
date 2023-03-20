const API = require('./../api')
const api = new API();

const routes = {
  '/:get': (request, response) => {
    response.write('Bem-vindo à Página Inicial');
    return response.end();
  },
  '/team:get': async (request, response) => {
    const rawData = await api.getPokemon(125)
    response.write('Página onde será montado um time');
    console.log(rawData);
    return response.end();
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('Bad Request: Page Not Found!');
  }
}

module.exports = routes