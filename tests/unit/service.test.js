const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const API = require('../../src/api');
const PokemonRepository = require('../../src/repository/pokemonRepository');
const PokemonService = require('../../src/service/pokemonService');

const mocks = {
  dataLength: require('./../mocks/data-count.json'),
  pokemonTeam: require('./../mocks/valid-pokemon-team.json'),
  rawTeam: require('./../mocks/valid-raw-team.json')
}


describe('Service Suite Tests', () => {
  let api = {};
  let repository = {};
  let service = {};
  let sandbox = {}

  before(() => {
    api = new API();
    repository = new PokemonRepository({ api });
    service = new PokemonService({ repository });
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('Ensure its possible to get pokemon list length', async () => {
    sandbox.stub(
      repository,
      repository.getRawData.name
      ).returns(mocks.dataLength)
      
      const data = await service.getDataLength();
      expect(data).to.be.equal(1000)
  })

  it('Ensure its possible to return an Array of random number', async () => {
    sandbox.stub(
      repository,
      repository.getRawData.name
      ).returns(mocks.dataLength)

      const data = await service.getRandomNumber();
      for(const number of data) {
        expect(number).to.be.lte(mocks.dataLength.count).and.gte(1)
      }
      expect(data).to.have.length(3);
  })

  it('Ensure its possible to random a pokemon team', async () => {
    sandbox.stub(
      repository,
      repository.getPokemon.name
    )
    .onCall(0).returns(mocks.pokemonTeam[0])
    .onCall(1).returns(mocks.pokemonTeam[1])
    .onCall(2).returns(mocks.pokemonTeam[2])


    const data = await service.getPokemonTeamRaw();
    expect(data).to.be.deep.equal(mocks.pokemonTeam);
  })

  it('Ensure its possible to random a pokemon team stats', async () => {
    sandbox.stub(
      service,
      service.getPokemonTeamRaw.name
    ).returns(mocks.rawTeam)
  


    const data = await service.getRandomTeam();
    expect(data).to.be.deep.equal(mocks.pokemonTeam);
  })


})