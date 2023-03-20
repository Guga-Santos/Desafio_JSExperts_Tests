const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const API = require('../../src/api');
const PokemonRepository = require('../../src/repository/pokemonRepository');
const PokemonService = require('../../src/service/pokemonService');

const mocks = {
  dataLength: require('./../mocks/data-count.json')
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

  it('Ensure its possible to return a random number', async () => {
    sandbox.stub(
      repository,
      repository.getRawData.name
      ).returns(mocks.dataLength)

      const data = await service.getRandomNumber();
      expect(data).to.be.lte(mocks.dataLength.count).and.gte(1)
  })

})