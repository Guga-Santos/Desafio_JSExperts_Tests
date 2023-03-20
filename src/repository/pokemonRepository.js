class PokemonRepository {
  constructor({ api }) {
    this.api = api;
  }

  async getRawData() {
    const data = await  this.api.getRawData();
    return data;
  }
}

module.exports = PokemonRepository