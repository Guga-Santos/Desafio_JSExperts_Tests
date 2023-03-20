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

  async getPokemonTeam() {
    const randomNums = [
      await this.getRandomNumber(), 
      await this.getRandomNumber(),
      await this.getRandomNumber() 
    ];

    const team = [];
    
    const promise = randomNums.map( async (num) => {
      let pokemon = await this.repository.getPokemon(num);
      team.push(pokemon)
    })

    await Promise.all(promise);

    return team;
  }
}

module.exports = PokemonService;