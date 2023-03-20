class PokemonRepository {
  constructor({ api }) {
    this.api = api;
  }

  async getRawData() {
    const data = await this.api.getRawData();
    return data;
  }

  async getPokemon(offset) {
    const data = await this.api.getPokemon(offset);
    return data;
  }
}

module.exports = PokemonRepository