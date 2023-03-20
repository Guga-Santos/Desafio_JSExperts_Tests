class PokemonService {
  constructor({ repository }) {
    this.repository = repository;
  }

  async getDataLength() {
    const data = await this.repository.getRawData();
    return data.count;
  }

  async getRandomNumber() {
    const length = await this.getDataLength();
    const randomNumber = Math.floor(Math.random() * length);
    return randomNumber;
  }
}

module.exports = PokemonService;