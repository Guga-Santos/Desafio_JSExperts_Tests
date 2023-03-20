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

  async getDataLength() {
    const data = await this.getRawData()

    return data.count;
  }
}

module.exports = API

