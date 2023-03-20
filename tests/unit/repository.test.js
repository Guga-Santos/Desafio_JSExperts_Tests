const { describe, it, before, beforeEach, afterEach } = require('mocha');
const API = require('../../src/api');
const PokemonRepository = require('../../src/repository/pokemonRepository');
const sinon = require('sinon');
const { expect } = require('chai');

const mocks = {
  validRaw: require('./../mocks/valid-raw-data.json'),
  validPokemon: require('./../mocks/valid-pokemon.json')
}

describe('Repository Suite Tests', () => {
  let api = {};
  let repository = {};
  let sandbox = {};

  before(() => {
    api = new API();
    repository = new PokemonRepository({ api });
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('Ensure getRawData returns the right data', async () => {
    sandbox.stub(
      api,
      api.getRawData.name
    ).returns(mocks.validRaw)

    const data = await repository.getRawData();
    expect(data).to.be.deep.equal(mocks.validRaw)
  })
})