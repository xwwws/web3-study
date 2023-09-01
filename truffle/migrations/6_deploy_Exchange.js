const Exchange = artifacts.require("Exchange");

module.exports = function (deployer) {
  deployer.deploy(Exchange, `0xde1A85db11327f4F9A4Fcc98096c4e27632Ba6Aa`, 6);
};
