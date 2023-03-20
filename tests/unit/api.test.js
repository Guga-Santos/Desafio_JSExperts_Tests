const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const API = require('../../src/api');
const https = require('https');
const { expect } = require('chai');

const mocks = {
  validRaw: require('./../mocks/valid-raw-data.json')
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


  it('Ensure it return raw data on getRawData function', async () => {
    const rawData = '{ "name": "Pikachu", "id": 25 }'
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

    expect(data).to.be.deep.equal(expected)
    
  })
})