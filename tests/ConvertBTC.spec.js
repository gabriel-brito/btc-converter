const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const convertBTC = require('../src/ConvertBTC.js');

chai.use(sinonChai);

describe('convertBTC', () => {
  let consoleStub;

  const responseMock = {
    "time": "2017-07-02 18:51:29",
    "price": 2490.78,
    "success": true
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('should return USD as currency and 1 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    await convertBTC();
    expect(consoleStub).to.have.been
      .calledWith('1 BTC to USD = 2490.78');
  });

  it('should return an error message when gone wrong', async () => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .replyWithError('Error');

    await convertBTC();

    expect(consoleStub).to.have.been
      .calledWith('Something went wrong. Try again later.');
  });

});
