import { expect } from 'chai';
import { exec } from 'child_process';

const btcConverter = './src/main.js';
const pkg = require('../package.json');

describe('Main CLI', () => {
  it('should return version of btc-converter', (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    })
  });

  it('should return the description message', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      const text = 'Convert Bitcoin to any currency defined.';
      expect(stdout.includes(text)).to.be.true;
      done();
    })
  });
});
