const routes = {
  '/:get': (request, response) => {
    response.write('Bem-vindo à Página Inicial');
    return response.end();
  },
  '/team:get': (request, response) => {
    response.write('Página onde será montado um time');
    return response.end();
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('Bad Request: Page Not Found!');
  }
}

module.exports = routes