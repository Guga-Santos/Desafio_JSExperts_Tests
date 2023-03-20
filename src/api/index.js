const https = require('node:https');

const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
class API {
  async getRawData() {
    const promise = new Promise((resolve, reject) => {
      https.request(DEFAULT_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        })

        res.on('end', () => {
          resolve(JSON.parse(data));
        })
    
      })
      .on('error', (error) => {
        reject(error);
      })
      .end();
    })

    return await promise;
  }

  async getPokemon(offset) {
    const URL = `${DEFAULT_URL}/?offset=${offset}&limit=1`
    const promise = new Promise((resolve, reject) => {
      https.request(URL, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        })

        res.on('end', () => {
          resolve(JSON.parse(data));
        })
      })
      .on('error', (err) => {
        console.log(err);
      })
      .end();
    })

    return await promise;
  }
}

module.exports = API

