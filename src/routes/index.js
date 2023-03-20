const PokemonRepository = require('../repository/pokemonRepository');
const PokemonService = require('../service/pokemonService');
const API = require('./../api')
const api = new API();
const repository = new PokemonRepository({ api });
const service = new PokemonService({ repository });

const routes = {
  '/:get': (request, response) => {
    response.write('Bem-vindo à Página Inicial');
    return response.end();
  },
  '/team:get': async (request, response) => {
    const data = await service.getRandomTeam()
    response.write(JSON.stringify(data));
    return response.end();
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('Bad Request: Page Not Found!');
  }
}

module.exports = routes