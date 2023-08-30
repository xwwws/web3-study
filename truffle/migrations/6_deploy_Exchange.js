const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {
  deployer.deploy(Exchange, `0x6e2EF1583f9F347eF77dD1D0367Ce52DdEAEf9Dc`, 6);
};
