class PokemonService {
  constructor({ repository }) {
    this.repository = repository;
  }

  async getDataLength() {
    const data = await this.repository.getRawData();
    return data.count;
  }
}

module.exports = PokemonService;