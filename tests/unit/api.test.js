const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const API = require('../../src/api');
const https = require('https');
const { expect } = require('chai');

const mocks = {
  validRaw: require('./../mocks/valid-raw-data.json'),
  validPokemon: require('./../mocks/valid-pokemon.json')
}


describe('API Suite Tests', () => {
  let api = {};
  let sandbox = {};

  before(() => {
    api = new API();
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore()
  })


  it('Ensure it returns raw data on getRawData function', async () => {
    sandbox.stub(
      https,
      'request'
    ).callsFake((options, callback) => {
      const res = {
        on: (event, handler) => {
          if (event === 'data') {
            handler(JSON.stringify(mocks.validRaw));
          }
          if (event === 'end') {
            handler();
          }
        }
      };
      callback(res);
      return {
        on: () => {},
        end: () => {}
      };
    });

    
    const data = await api.getRawData();
    const expected = mocks.validRaw;

    expect(data).to.be.deep.equal(expected); 
  })

  it('Ensure it returns one pokemon data on getPokemon function', async () => {
    sandbox.stub(
      https,
      'request'
    ).callsFake((options, callback) => {
      const res = {
        on: (event, handler) => {
          if (event === 'data') {
            handler(JSON.stringify(mocks.validPokemon));
          }
          if (event === 'end') {
            handler();
          }
        }
      };
      callback(res);
      return {
        on: () => {},
        end: () => {}
      };
    });

    const data = await api.getPokemon(5);
    const expected = mocks.validPokemon;
  
    expect(data).to.be.deep.equal(expected); 
  })

})