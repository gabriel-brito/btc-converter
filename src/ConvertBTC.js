const request = require('request-promise-native');

function convertBTC(currency = 'USD', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  return request(url)
    .then(body => body)
    .then(body => {
      const apiResponse = JSON.parse(body);
      console.info(`${amount} BTC to ${currency} = ${apiResponse}`);
    })
    .catch(error => {
      console.info('Something went wrong. Try again later.');
      return error;
    })
}

module.exports = convertBTC;
