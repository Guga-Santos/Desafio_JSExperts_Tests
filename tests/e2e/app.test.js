const { describe, it, before, after, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const supertest = require('supertest');
const API = require('../../src/api');
const PokemonRepository = require('../../src/repository/pokemonRepository');
const PokemonService = require('../../src/service/pokemonService');


const mocks = {
  validRandomTeam: require('./../mocks/valid-pokemon-team.json'),
}


describe('E2E', () => {
  let app;
  let api = {};
  let repository = {};
  let sandbox;
  
  before((done) => {
    app = require('./../../src/app');
    app.once('listening', done);

    api = new API();
    repository = new PokemonRepository({ api });
    service = new PokemonService({ repository });
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.spy(api);
  })

  afterEach(() => {
    sandbox.restore()
  })

  after((done) => {
    app.close(done);
  })


  describe('APP Suit Tests', () => {
    it('GET "/" returns status 200 and the right text', async () => {
      const response = await supertest(app)
        .get('/')
        .expect(200)

      expect(response.text).to.be.equal('Bem-vindo à Página Inicial');
    })

    it('GET "/*" returns status 404 and the right text', async () => {
      const response = await supertest(app)
        .get('/any_wrong_path')
        .expect(404)
      
      expect(response.text).to.be.equal('Bad Request: Page Not Found!')
    })

    it('GET "/team" returns status 200 and the right json', async () => {
      const response = await supertest(app)
        .get('/team')
        .expect(200)

        const parsed = JSON.parse(response.text)
        const keys = Object.keys(parsed);
        const keysToCompare = Object.keys(mocks.validRandomTeam);

        expect(parsed).to.have.length(3)
        expect(keys).to.be.deep.equal(keysToCompare)
        
    })
  })
})