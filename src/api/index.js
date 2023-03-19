const https = require('node:https');

const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
class API {
  async getRawData() {
    https.request(DEFAULT_URL, (res) => {
      res.on('data', (data) => {
        process.stdout.write(data);
      })
    })

    .on('error', (error) => {
      console.log(error);
    })
    
    .end();
  }
}

const api = new API();
console.log(api.getRawData())

